import React, { useEffect, useRef } from "react";
import { PostObject } from "../../res/ContentStackData";
import { timeAgo } from "../../res/Time";
import LatestTWAB, { LatestTWABLinkColor, LatestTWABStatusColor } from "../parts/LatestTWAB";

function usePrevious( value: any ) {
	const ref = useRef();
	useEffect( () => {
		ref.current = value;
	}, [ value ] );
	return ref.current;
}

function componentDidUpdate( newList: Array<PostObject> | undefined, prevList: Array<PostObject> | undefined ) {
	if ( !newList || !prevList ) {
		return;
	}

	let old = prevList[0];
	let old_date = new Date( old.date );

	let newest = newList[0];
	let newest_date = new Date( newest.date );

	if ( newest_date.getTime() !== old_date.getTime() ) {
		if ( Notification.permission === "granted" ) {
			const options = {
				body: newest.title,
			};
			new Notification( "TWAB dropped!", options );
		}
	}
}

function ContentStackLatestTWAB( props: {
	list?: Array<PostObject>
} ) {

	const prevList = usePrevious( props.list );

	useEffect( () => componentDidUpdate( props.list, prevList ), [ prevList, props.list ] );

	if ( !props.list ) {
		return null;
	}

	let first : PostObject = props.list[0];
	let date = new Date( first.publish_details.time ?? first.date );

	const day_in_ms =
		      24 /* hours */
		      * 60 /* minutes */
		      * 60 /* seconds */
		      * 1000; /* milliseconds */

	let now = new Date();

	let class_status: LatestTWABStatusColor;
	let class_twab: LatestTWABLinkColor = LatestTWABLinkColor.DEFAULT;
	let status : string;

	let diff = Math.abs( now.getTime() - date.getTime() );

	if ( diff < day_in_ms ) {
		class_status = LatestTWABStatusColor.GREEN;
		class_twab = LatestTWABLinkColor.ACTIVE;
		status = timeAgo( date );
	} else if ( diff < ( 6 * day_in_ms ) ) {
		class_status = LatestTWABStatusColor.YELLOW;
		status = "posted " + timeAgo( date );
	} else {
		class_status = LatestTWABStatusColor.RED;
		status = "Waiting for newest TWAB...";
	}

	return <LatestTWAB title={first.title}
	                   link={"https://www.bungie.net/7/en/news/article" + first.url.hosted_url}
	                   status={status}
	                   data={first}
	                   link_color={class_twab}
	                   status_color={class_status} />;
}

export default ContentStackLatestTWAB;
