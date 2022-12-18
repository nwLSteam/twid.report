import React from "react";
import { PostObject } from "../../res/ContentStackData";
import TWABList from "../parts/TWABList";
import TWABListEntry from "../parts/TWABListEntry";

function LegacyTWABList( props: {
	list: Array<PostObject> | undefined
} ) {
	if ( !props.list ) {
		return null;
	}

	let list: any[] = [];
	const url_root = "https://www.bungie.net/7/en/news/article";

	for ( let i = 1; i < 4; i++ ) {
		let article = props.list[i];

		const date = new Date( article.created_at );
		let date_string = "This Week at Bungie — "
			+ ( ( date.getUTCMonth() + 1 ) < 10 ? "0" + ( date.getUTCMonth() + 1 ) : ( date.getUTCMonth() + 1 ) )
			+ "/" + ( date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate() )
			+ "/" + date.getUTCFullYear();
		list.push(
			<TWABListEntry key={article.uid} text={date_string} url={url_root + article.url.hosted_url} />,
		);
	}

	return <TWABList>{list}</TWABList>;
}

export default LegacyTWABList;
