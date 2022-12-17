import React from "react";

const MONTH_NAMES = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December",
];

function getFormattedDate( date: Date,
                           prefomattedDate: string | false = false,
                           hideYear: boolean               = false ) {
	const day = date.getDate();
	const month = MONTH_NAMES[date.getMonth()];
	const year = date.getFullYear();
	const hours = date.getHours();
	let minutes: number | string = date.getMinutes();

	if ( minutes < 10 ) {
		// Adding leading zero to minutes
		minutes = `0${minutes}`;
	}

	if ( prefomattedDate ) {
		// Today at 10:20
		// Yesterday at 10:20
		return `${prefomattedDate} at ${hours}:${minutes}`;
	}

	if ( hideYear ) {
		// 10. January at 10:20
		return `${day}. ${month} at ${hours}:${minutes}`;
	}

	// 10. January 2017. at 10:20
	return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
}


// --- Main function
function timeAgo( dateParam: Date | string ): string {
	if ( !dateParam ) {
		return "";
	}

	const date = typeof dateParam === "object" ? dateParam : new Date( dateParam );
	const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
	const today = new Date();
	// @ts-ignore
	const yesterday = new Date( today - DAY_IN_MS );
	// @ts-ignore
	const seconds = Math.round( ( today - date ) / 1000 );
	const minutes = Math.round( seconds / 60 );
	const isToday = today.toDateString() === date.toDateString();
	const isYesterday = yesterday.toDateString() === date.toDateString();
	const isThisYear = today.getFullYear() === date.getFullYear();


	if ( seconds < 5 ) {
		return "now";
	} else if ( seconds < 60 ) {
		return `${seconds} seconds ago`;
	} else if ( seconds < 90 ) {
		return "about a minute ago";
	} else if ( minutes < 60 ) {
		return `${minutes} minutes ago`;
	} else if ( isToday ) {
		return getFormattedDate( date, "Today" ); // Today at 10:20
	} else if ( isYesterday ) {
		return getFormattedDate( date, "Yesterday" ); // Yesterday at 10:20
	} else if ( isThisYear ) {
		return getFormattedDate( date, false, true ); // 10. January at 10:20
	}

	return getFormattedDate( date ); // 10. January 2017. at 10:20
}

export default class LatestTwab extends React.Component<{ list: any | null }> {

	componentDidUpdate( prevProps: Readonly<{ list: any }>, prevState: Readonly<{}>, snapshot?: any ) {
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

		let class_status = "";
		let class_twab = "";
		let status = "";

		let diff = Math.abs( now.getTime() - date.getTime() );

		if ( diff < day_in_ms ) {
			class_status = "twab__status--green";
			class_twab = "twab__link--active";
			status = timeAgo( date );
		} else if ( diff < ( 6 * day_in_ms ) ) {
			class_status = "twab__status--yellow";
			status = "posted " + timeAgo( date );
		} else {
			class_status = "twab__status--red";
			status = "Waiting for newest TWAB...";
		}

		return (
			<div className={"twab"}>
				<h1 style={{ marginBottom: "40px", marginTop: "40px" }}>TWAB Report</h1>
				<span>Latest TWAB:</span>
				<div className={"twab__link"}>
					<a className={class_twab}
					   href={"https://www.bungie.net/en/Explore/Detail/News/" + first.contentId}
					   target={"_blank"}
					   rel={"noreferrer"}>
						{first.properties.Title}
					</a>
				</div>
				<span className={"twab__status " + class_status}>{status}</span>
			</div>
		);
	}
}