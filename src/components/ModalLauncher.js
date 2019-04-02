import React from "react";
import { Button, Modal } from "reactstrap";
import AddStageModal from "./AddStageModal";
import AddWeaponClassModal from "./AddWeaponClassModal";

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
					<AddStageModal
						title={this.props.title}
						getResult={this.props.getResult}
						hide={this.toggle}
					/>
				);
				break;
			case "weaponClass":
				modal = (
					<AddWeaponClassModal
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
