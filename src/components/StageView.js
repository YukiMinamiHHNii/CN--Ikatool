import React from "react";

export const StageView = props => {
	return (
		props.stage && (
			<article>
				<h2>{props.stage.name}</h2>
				<img className="col-sm-12"
					src="https://firebasestorage.googleapis.com/v0/b/cn-marina-f3119.appspot.com/o/ability%2F71f6faa1d05ef4f1c1e449d217d18a5d?alt=media&token=1f232d4f-d727-4cd4-967e-7480c9176263"
					alt="test"
				/>
			</article>
		)
	);
};
