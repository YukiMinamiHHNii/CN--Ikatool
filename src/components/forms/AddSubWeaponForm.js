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
import { saveData } from "../../utils/APIUtils";

class AddSubWeaponForm extends React.Component {
	state = {
		subWeaponID: "",
		name: "",
		icon: "",
		altIcon: ""
	};
	saveSubWeapon = () => {
		saveData(this.state, "sub")
			.then(response => {
				return this.props.getResult({
					result: "Subweapon data added successfully",
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
			[e.target.name]:
				e.target.name !== "icon" && e.target.name !== "altIcon"
					? e.target.value
					: e.target.files[0]
		});
	};
	render() {
		return (
			<section>
				<ModalHeader className="second-color">{this.props.title}</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup className="mb-3">
							<Label for="subWeaponID" className="col-sm-12 text-left">
								SubWeaponID
							</Label>
							<Input
								type="text"
								name="subWeaponID"
								placeholder="Enter subWeaponID"
								onChange={this.input}
							/>
						</FormGroup>
						<FormGroup className="mb-3">
							<Label for="name" className="col-sm-12 text-left">
								Name
							</Label>
							<Input
								type="text"
								name="name"
								placeholder="Enter subweapon name"
								onChange={this.input}
							/>
						</FormGroup>
						<FormGroup className="mb-3">
							<Label for="icon" className="col-sm-12 text-left">
								Icon
							</Label>
							<Input type="file" name="icon" onChange={this.input} />
						</FormGroup>
						<FormGroup className="mb-3">
							<Label for="altIcon" className="col-sm-12 text-left">
								AltIcon
							</Label>
							<Input type="file" name="altIcon" onChange={this.input} />
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button className="pad-btn" onClick={this.saveSubWeapon}>
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

export default AddSubWeaponForm;
