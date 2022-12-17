import React from "react";

function TWABList( props: React.PropsWithChildren<{}> ) {
	return <div className={"list"}>
		<h3 style={{ textAlign: "center" }}>Previous TWABs:</h3>
		{props.children}
	</div>;
}

export default TWABList;
