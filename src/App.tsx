import React from "react";
import "./App.scss";
import ContentStackBlock from "./components/ContentStackBlock";

export default function App() {
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

	return (
		<div className="App">
			<header className="App-header">
				<ContentStackBlock />
				<div className={"credit"}>
					Created by <a target={"_blank"}
					              rel={"noreferrer"}
					              href={"https://nwl.ms"}>nwL</a>.
				</div>
			</header>
		</div>
	);
}
