import React from "react";
import { timeAgo } from "../../res/Time";
import LatestTWAB, { LatestTWABLinkColor, LatestTWABStatusColor } from "../parts/LatestTWAB";

export default class LegacyLatestTWAB extends React.Component<{ list: any | null }> {

	componentDidUpdate( prevProps: Readonly<{ list: any }>, _prevState: Readonly<{}>, _snapshot?: any ) {
		if ( this.props.list == null ) {
			return;
		}

		if ( prevProps.list == null ) {
			return;
		}

		let old = prevProps.list.Response.results[0];
		let old_date = new Date( old.creationDate );

		let newest = this.props.list.Response.results[0];
		let newest_date = new Date( newest.creationDate );

		if ( newest_date.getTime() !== old_date.getTime() ) {
			if ( Notification.permission === "granted" ) {
				const options = {
					body: newest.properties.Title,
				};
				new Notification( "TWAB dropped!", options );
			}
		}
	}

	render() {
		if ( this.props.list == null ) {
			return null;
		}

		let first = this.props.list.Response.results[0];
		let date = new Date( first.creationDate );

		let day_in_ms =
			    24 /* hours */
			    * 60 /* minutes */
			    * 60 /* seconds */
			    * 1000; /* milliseconds */

		let now = new Date();

		let class_status: LatestTWABStatusColor;
		let class_twab: LatestTWABLinkColor = LatestTWABLinkColor.DEFAULT;
		let status = "";

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

		return <LatestTWAB title={first.properties.Title}
		                   link={"https://www.bungie.net/en/Explore/Detail/News/" + first.contentId}
		                   status={status}
		                   link_color={class_twab}
		                   status_color={class_status} />;
	}
}
