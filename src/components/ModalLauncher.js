import React from "react";
import { Button, Modal } from "reactstrap";
import AddStageForm from "./forms/AddStageForm";
import AddWeaponClassForm from "./forms/AddWeaponClassForm";
import AddGameModeForm from "./forms/AddGameModeForm";
import AddSpecialWeaponForm from "./forms/AddSpecialWeaponForm";
import AddSubWeaponForm from "./forms/AddSubWeaponForm";
import AddWeaponWeightForm from "./forms/AddWeaponWeightForm";
import AddWeaponForm from "./forms/AddWeaponForm";

class ModalLauncher extends React.Component {
	state = {
		isOpen: false
	};
	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};
	getForm = () => {
		let modal;
		switch (this.props.operation) {
			case "stage":
				modal = (
					<AddStageForm
						title={this.props.title}
						getResult={this.props.getResult}
						hide={this.toggle}
					/>
				);
				break;
			case "weaponClass":
				modal = (
					<AddWeaponClassForm
						title={this.props.title}
						getResult={this.props.getResult}
						hide={this.toggle}
					/>
				);
				break;
			case "gameMode":
				modal = (
					<AddGameModeForm
						title={this.props.title}
						getResult={this.props.getResult}
						hide={this.toggle}
					/>
				);
				break;
			case "specialWeapon":
				modal = (
					<AddSpecialWeaponForm
						title={this.props.title}
						getResult={this.props.getResult}
						hide={this.toggle}
					/>
				);
				break;
			case "subWeapon":
				modal = (
					<AddSubWeaponForm
						title={this.props.title}
						getResult={this.props.getResult}
						hide={this.toggle}
					/>
				);
				break;
			case "weight":
				modal = (
					<AddWeaponWeightForm
						title={this.props.title}
						getResult={this.props.getResult}
						hide={this.toggle}
					/>
				);
				break;
			case "weapon":
				modal = (
					<AddWeaponForm
						title={this.props.title}
						getResult={this.props.getResult}
						hide={this.toggle}
					/>
				);
				break;
			default:
				break;
		}
		return modal;
	};
	render() {
		let element = this.getForm();
		return (
			<section>
				<Button className="header pad-btn" onClick={this.toggle}>
					{this.props.title}
				</Button>
				<Modal isOpen={this.state.isOpen} toggle={this.toggle}>
					{element}
				</Modal>
			</section>
		);
	}
}

export default ModalLauncher;
