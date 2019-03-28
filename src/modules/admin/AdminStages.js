import React from "react";
import {
	Row,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input
} from "reactstrap";
import StagesList from "../../components/StagesList";

class AdminStages extends React.Component {
	constructor() {
		super();
		this.state = {
			modal: false
		};
	}
	toggle = () => {
		this.setState({ modal: !this.state.modal });
	};
	render() {
		return (
			<Row>
				<section className="col-sm-12 d-flex flex-wrap">
					<h2 className="mr-3 header">Stages management</h2>
					<Button className="header pad-btn" onClick={this.toggle}>
						Add new stage
					</Button>
				</section>
				<StagesList/>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader className="second-color">Modal title</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup className="mb-3">
								<Label for="splatnetID" className="col-sm-12 text-left">
									SplatNetID
								</Label>
								<Input
									type="text"
									name="splatnetID"
									placeholder="Enter SplatNetID"
								/>
							</FormGroup>
							<FormGroup className="mb-3">
								<Label for="name" className="col-sm-12 text-left">
									Stage name
								</Label>
								<Input type="text" name="name" placeholder="Enter Stage name" />
							</FormGroup>
							<FormGroup className="mb-3">
								<Label for="thumbnail" className="col-sm-12 text-left">
									Thumbnail
								</Label>
								<Input type="file" name="thumbnail" />
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button className="pad-btn" onClick={this.test}>
							Save
						</Button>
						<Button className="pad-btn" onClick={this.toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</Row>
		);
	}
}

export default AdminStages;
