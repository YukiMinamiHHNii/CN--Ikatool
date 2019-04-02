import React from "react";

export const StageViewer = props => {
	return (
		props.stage && (
			<article className="text-center">
				<h2 className="col-sm-12">{props.stage.name}</h2>
				<img
					className="col-sm-12 col-md-6"
					src={props.stage.thumbnail}
					alt={props.stage.name}
				/>
			</article>
		)
	);
};
