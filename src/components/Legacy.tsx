import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import API from "../res/API";
import LegacyLatestTWAB from "./legacy/LegacyLatestTWAB";
import LegacyTWABList from "./legacy/LegacyTWABList";

type ListType = null | object;

function updateStateFromAPI( setList: Dispatch<SetStateAction<ListType>> ) {
	console.log( "Updating TWAB list..." );
	API.requests.Platform.Content.Search( "en", "news", "This Week at Bungie" )
	   .then( list => {
		   setList( JSON.parse( list ) );
		   console.log( "Updated." );
	   } );
}

function componentDidMount( setList: Dispatch<SetStateAction<ListType>> ) {
	updateStateFromAPI( setList );
	setInterval( () => updateStateFromAPI( setList ), 10000 );
}

function Legacy() {


	let [ list, setList ] = useState<ListType>( null );
	useEffect( () => componentDidMount( setList ), [] );

	if ( list === null ) {
		return <div>Loading...</div>;
	}

	return <>
		<LegacyLatestTWAB list={list} />
		<div style={{ color: "red" }}>
			TWAB Report will be back soon&trade;. I am currently updating to support Bungie's new system.
		</div>
		<LegacyTWABList list={list} />
	</>;
}

export default Legacy;
