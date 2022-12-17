import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import API from "./res/API";

const root = ReactDOM.createRoot(
	document.getElementById( "root" ) as HTMLElement,
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

if ( !process.env.NODE_ENV || process.env.NODE_ENV === "development" ) {
	API.set_key( "e63836d14e1849a29b205bb62ef41337" );
} else {
	API.set_key( "c2092d958beb44d593372559744ce7ab" );
}