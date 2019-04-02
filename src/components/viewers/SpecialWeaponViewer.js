import React from "react";

export const SpecialWeaponViewer = props => {
	return (
		props.specialWeapon && (
			<article className="text-center">
				<h2 className="col-sm-12">{props.specialWeapon.name}</h2>
				<section className="d-flex justify-content-center">
					<img src={props.specialWeapon.icon} alt={props.specialWeapon.name} />
					<img
						src={props.specialWeapon.altIcon}
						alt={`${props.specialWeapon.name} - alt`}
					/>
				</section>
			</article>
		)
	);
};
