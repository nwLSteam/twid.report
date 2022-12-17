import React from "react";

export enum LatestTWABLinkColor {
	DEFAULT,
	ACTIVE
}

export enum LatestTWABStatusColor {
	RED,
	YELLOW,
	GREEN,
}

function LatestTWAB( props: {
	title: string,
	link: string,
	status: string,
	link_color: LatestTWABLinkColor,
	status_color: LatestTWABStatusColor,
} ) {
	const twab_class = ( () => {
		switch ( props.link_color ) {
			case LatestTWABLinkColor.ACTIVE:
				return "";
			case LatestTWABLinkColor.DEFAULT:
			default:
				return "";
		}
	} )();

	const status_class = "twab__status " + ( () => {
		switch ( props.status_color ) {
			case LatestTWABStatusColor.RED:
				return "twab__status--red";
			case LatestTWABStatusColor.YELLOW:
				return "twab__status--yellow";
			case LatestTWABStatusColor.GREEN:
				return "twab__status--green";
			default:
				return "";
		}
	} )();

	return (
		<div className={"twab"}>
			<h1 style={{ marginBottom: "40px", marginTop: "40px" }}>TWAB Report</h1>
			<span>Latest TWAB:</span>
			<div className={"twab__link"}>
				<a className={twab_class}
				   href={props.link}
				   target={"_blank"}
				   rel={"noreferrer"}>
					{props.title}
				</a>
			</div>
			<span className={status_class}>{props.status}</span>
		</div>
	);
}

export default LatestTWAB;
