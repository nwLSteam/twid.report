import React, { ReactNode } from "react";

function TWABListEntry( props: {
	text: string | ReactNode,
	url: string
} ) {
	return <li>
		<a href={props.url}
		   target={"_blank"}
		   rel="noreferrer">
			{props.text}
		</a>
	</li>;
}

export default TWABListEntry;
