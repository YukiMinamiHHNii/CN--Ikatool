import React from "react";

export const SubWeaponViewer = props => {
	return (
		props.subWeapon && (
			<article className="text-center">
				<h2 className="col-sm-12">{props.subWeapon.name}</h2>
				<section className="d-flex justify-content-center">
					<img src={props.subWeapon.icon} alt={props.subWeapon.name} />
					<img
						src={props.subWeapon.altIcon}
						alt={`${props.subWeapon.name} - alt`}
					/>
				</section>
			</article>
		)
	);
};
