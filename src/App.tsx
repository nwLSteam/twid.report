import React from "react";
import "./App.scss";
import Legacy from "./components/Legacy";

interface AppState {
	list: any | null;
}

export default class App extends React.Component<{}, AppState> {
	render() {


		return (
			<div className="App">
				<header className="App-header">
					<Legacy />

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
