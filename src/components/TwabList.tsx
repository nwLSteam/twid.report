import React from "react";

export default class TwabList extends React.Component<{ list: any | null }> {
	render() {
		if ( this.props.list == null ) {
			return null;
		}

		let list: any[] = [];

		const articles = this.props.list.Response.results;
		const url_root = "https://www.bungie.net/en/Explore/Detail/News/";

		for ( let i = 1; i < 4; i++ ) {
			let article = articles[i];

			const id = article.contentId;

			const date = new Date( article.creationDate );
			let date_string = "This Week at Bungie — "
				+ ( ( date.getUTCMonth() + 1 ) < 10 ? "0" + ( date.getUTCMonth() + 1 ) : ( date.getUTCMonth() + 1 ) )
				+ "/" + ( date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate() )
				+ "/" + date.getUTCFullYear();
			list.push(
				<li>
					<a href={url_root + id}
					   target={"_blank"}
					   rel="noreferrer">
						{date_string}
					</a>
				</li>,
			);
		}

		return <div className={"list"}>
			<h3 style={{ textAlign: "center" }}>Previous TWABs:</h3>
			{list}
		</div>;
	}
}