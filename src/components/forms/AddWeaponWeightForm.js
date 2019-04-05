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
import { addCollectionData } from "../../daos/FirebaseDAO";

class AddWeaponWeightForm extends React.Component {
	state = {
		name: ""
	};
	saveWeight = () => {
		addCollectionData(this.state, "weight")
			.then(response => {
				return this.props.getResult({
					result: "Weapon weight data added successfully",
					error: null,
					docId: response.docId
				});
			})
			.catch(error => {
				return this.props.getResult({
					result: null,
					error: error,
					docId: null
				});
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
								Weight name
							</Label>
							<Input
								type="text"
								name="name"
								placeholder="Enter weight name"
								onChange={this.input}
							/>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button className="pad-btn" onClick={this.saveWeight}>
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

export default AddWeaponWeightForm;
