import React from "react";

export const GameModeViewer = props => {
	return (
		props.gameMode && (
			<article className="text-center">
				<h2 className="col-sm-12">{props.gameMode.name}</h2>
				<section className="d-flex justify-content-center">
					<img
						src={props.gameMode.thumbnail}
						alt={props.gameMode.name}
					/>
				</section>
			</article>
		)
	);
};
