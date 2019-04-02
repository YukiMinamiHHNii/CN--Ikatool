import React from "react";

export const GameModeViewer = props => {
	return (
		props.gameMode && (
			<article className="text-center">
				<h2 className="col-sm-12">{props.gameMode.name}</h2>
				<img
					className="col-sm-12 col-md-6"
					src={props.gameMode.thumbnail}
					alt={props.gameMode.name}
				/>
			</article>
		)
	);
};
