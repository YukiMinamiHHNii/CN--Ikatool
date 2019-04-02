import React from "react";
import {
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
	Button
} from "reactstrap";
import { saveClassData } from "../utils/APIUtils";

class AddWeaponClassModal extends React.Component {
	state = {
		classID: "",
		name: ""
	};
	saveClass = () => {
		saveClassData(this.state)
			.then(response => {
				return this.props.getResult({
					result: "Weapon class data added successfully",
					error: null
				});
			})
			.catch(error => {
				return this.props.getResult({ result: null, error: error });
			});
		this.props.hide();
	};
	input = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	render() {
		return (
			<section>
				<ModalHeader className="second-color">{this.props.title}</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup className="mb-3">
							<Label for="name" className="col-sm-12 text-left">
								Class name
							</Label>
							<Input
								type="text"
								name="name"
								placeholder="Enter class name"
								onChange={this.input}
							/>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button className="pad-btn" onClick={this.saveClass}>
						Save
					</Button>
					<Button className="pad-btn" onClick={this.props.hide}>
						Cancel
					</Button>
				</ModalFooter>
			</section>
		);
	}
}

export default AddWeaponClassModal;
