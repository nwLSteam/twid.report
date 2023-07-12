import React from "react";

function TWABList( props: React.PropsWithChildren<{}> ) {
	return <div className={"list"}>
		<h3 style={{ textAlign: "center" }}>Previous TWIDs:</h3>
		<ul className={"list__ul"}>
			{props.children}
		</ul>
	</div>;
}

export default TWABList;
