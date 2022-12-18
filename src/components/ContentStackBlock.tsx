import Contentstack from "contentstack";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import API from "../res/API";
import { ContentStackTokenReply, ContentStackTokens, PostObject } from "../res/ContentStackData";
import ContentStackLatestTWAB from "./content_stack/ContentStackLatestTWAB";
import ContentStackTWABList from "./content_stack/ContentStackTWABList";

type ContentStackQueryResults = Array<PostObject> | undefined
type ContentStackInstance = Contentstack.Stack | undefined;

function getTokensFromBungie( setTokens: Dispatch<SetStateAction<ContentStackTokens>> ) {
	API.requests.Platform.Settings()
	   .then( result => {
		   const tokens: ContentStackTokenReply = JSON.parse( result ).Response.systems.ContentStack.parameters;

		   const [ environment, token ] = tokens.EnvPlusDeliveryToken.match( /(?<=\{)[^}]+(?=})/g ) as Array<string>;

		   setTokens( {
			              ApiKey: tokens.ApiKey,
			              EnvPlusDeliveryToken: token,
			              Environment: environment,
		              } );
	   } )
	   .catch( console.log );
}

function createStack( tokens: ContentStackTokens, setQuery: Dispatch<SetStateAction<ContentStackInstance>> ) {
	if ( !tokens ) {
		return;
	}

	const Stack = Contentstack.Stack( tokens.ApiKey,
	                                  tokens.EnvPlusDeliveryToken,
	                                  tokens.Environment );
	setQuery( Stack );
}

function executeQuery( stack: ContentStackInstance, setList: Dispatch<SetStateAction<ContentStackQueryResults>> ) {
	if ( !stack ) {
		return;
	}

	// create query skeleton
	let query = stack.ContentType( "news_article" ).Query();

	// set filter parameters
	let executable = query.regex( "title", "^This Week at Bungie", "i" )
	                      .descending( "date" )
	                      .limit( 5 );

	// execute
	executable.toJSON().find()
	          .then( result => setList( result[0] ) )
	          .catch( console.log );
}

function ContentStackBlock() {
	let [ tokens, setTokens ] = useState<ContentStackTokens>( undefined );
	let [ stack, setStack ] = useState<ContentStackInstance>( undefined );
	let [ resultList, setResultList ] = useState<ContentStackQueryResults>( undefined );

	useEffect( () => getTokensFromBungie( setTokens ), [] );
	useEffect( () => createStack( tokens, setStack ), [ tokens ] );
	useEffect( () => executeQuery( stack, setResultList ), [ stack ] );

	if ( !resultList ) {
		return <div>Loading...</div>;
	}

	return <>
		<ContentStackLatestTWAB list={resultList} />
		<ContentStackTWABList list={resultList} />
	</>;
}

export default ContentStackBlock;
