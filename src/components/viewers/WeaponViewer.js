import React from "react";

export const WeaponViewer = props => {
	return (
		props.weapon && (
			<article className="text-center">
				<h2 className="col-sm-12">{props.weapon.name}</h2>
				<section className="d-flex justify-content-center">
					<img src={props.weapon.image} alt={props.weapon.name} />
					<img
						src={props.weapon.thumbnail}
						alt={`${props.weapon.name} - thumb`}
					/>
				</section>
			</article>
		)
	);
};
