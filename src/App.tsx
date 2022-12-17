import React from "react";
import "./App.scss";
import TwabList from "./components/TwabList";
import API from "./res/API";
import LatestTwab from "./components/LatestTwab";

interface AppState {
	list: any | null;
}

export default class App extends React.Component<{}, AppState> {
	constructor( props: any ) {
		super( props );

		this.updateStateFromAPI = this.updateStateFromAPI.bind( this );

		this.state = {
			list: null,
		};
	}

	updateStateFromAPI() {
		console.log( "Updating TWAB list..." );
		API.requests.Platform.Content.Search( "en", "news", "This Week at Bungie" )
		   .then( list => {
			   this.setState(
				   {
					   list: JSON.parse( list ),
				   } );
			   console.log( "Updated." );
		   } );
	}

	componentDidMount() {
		this.updateStateFromAPI();
		setInterval( this.updateStateFromAPI, 10000 );


		if ( !( "Notification" in window ) ) {
			console.log( "This browser does not support desktop notification" );

		} else {
			if ( Notification.permission !== "granted"
				&& Notification.permission !== "denied" ) {
				Notification.requestPermission().then( response => {
					console.log( response );
				} );
			}
		}

	}

	render() {
		let waiting;
		if ( this.state.list === null ) {
			waiting = <div>Loading...</div>;
		}

		let old_cms = null;
		old_cms =
			<div style={{ color: "red" }}>
				TWAB Report will be back soon&trade;. I am currently updating to support Bungie's new system.
			</div>;


		return (
			<div className="App">
				<header className="App-header">
					{waiting}

					<LatestTwab list={this.state.list} />
					{old_cms}
					<TwabList list={this.state.list} />
					<div style={{
						marginTop: "10px",
						fontSize: "0.8rem",
						color: "#777",
					}}>
						Created by <a target={"_blank"}
						              rel={"noreferrer"}
						              style={{ color: "#aaa" }}
						              href={"https://nwl.ms"}>nwL</a>.
					</div>
				</header>
			</div>
		);
	}
}
