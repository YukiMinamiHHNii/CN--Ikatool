import React from "react";
import { Button, Modal } from "reactstrap";
import AddStageModal from "./AddStageModal";

class ModalLauncher extends React.Component {
	state = {
		isOpen: false
	};
	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};
	render() {
		return (
			<section>
				<Button className="header pad-btn" onClick={this.toggle}>
					{this.props.title}
				</Button>
				<Modal isOpen={this.state.isOpen} toggle={this.toggle}>
					<AddStageModal title={this.props.title} getResult={this.props.getResult} hide={this.toggle} />
				</Modal>
			</section>
		);
	}
}

export default ModalLauncher;
