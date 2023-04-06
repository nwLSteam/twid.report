import React from "react";
import { PostObject } from "../../res/ContentStackData";

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
	data?: PostObject,
	link_color: LatestTWABLinkColor,
	status_color: LatestTWABStatusColor,
} ) {

	const twab_class = ( () => {
		switch ( props.link_color ) {
			case LatestTWABLinkColor.ACTIVE:
				return "twab__wrapper--active";
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


	if ( props.data ) {
		return (
			<div className={"twab"}>
				<h1 className={"twab__heading"}>TWAB Report</h1>
				<span>Latest TWAB:</span>
				<a href={props.link}
				   target={"_blank"}
				   rel={"noreferrer"}
				   className={"twab__wrapper"}>
					<div className="twab__image" style={{
						backgroundImage: `url(${props.data.image.url})`
					}}>
						<div className={"twab__link " + twab_class}>
							<div className="twab__title">{props.title}</div>
							<div className="twab__subtitle">{props.data.subtitle}</div>
						</div>
					</div>
				</a>

				<span className={status_class}>{props.status}</span>
			</div>
		);
	}

	// fallback
	return (
		<div className={"twab"}>
			<h1 className={"twab__heading"}>TWAB Report</h1>
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
