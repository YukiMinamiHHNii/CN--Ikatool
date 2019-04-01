import React from "react";

export const StageView = props => {
	return (
		props.stage && (
			<article>
				<h2>{props.stage.name}</h2>
				<img
					className="col-sm-12"
					src={props.stage.thumbnail}
					alt={props.stage.name}
				/>
			</article>
		)
	);
};
