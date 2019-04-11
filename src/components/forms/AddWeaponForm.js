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
import CollectionDropdown from "../CollectionDropdown";
import { addCollectionData } from "../../daos/FirebaseDAO";

class AddWeaponForm extends React.Component {
	state = {
		splatnetID: "",
		name: "",
		selectedclass: null,
		selectedspecial: null,
		selectedsub: null,
		selectedweight: null
	};
	saveWeapon = () => {
		addCollectionData(this.state, "weapon")
			.then(response => {
				return this.props.getResult({
					result: "Weapon data added successfully",
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
				e.target.name !== "image" && e.target.name !== "thumbnail"
					? e.target.value
					: e.target.files[0]
		});
	};
	getSelection = selectedData => {
		this.setState({ ...selectedData });
	};
	render() {
		return (
			<section>
				<ModalHeader className="second-color">{this.props.title}</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup className="mb-3">
							<Label for="splatnetID" className="col-sm-12 text-left">
								SplatNetID
							</Label>
							<Input
								type="text"
								name="splatnetID"
								placeholder="Enter SplatnetID"
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
								placeholder="Enter weapon name"
								onChange={this.input}
							/>
						</FormGroup>
						<FormGroup>
							<Label className="col-sm-12 text-left">Select a class</Label>
							<CollectionDropdown
								collection={"class"}
								selection={this.getSelection}
							/>
						</FormGroup>
						<FormGroup>
							<Label className="col-sm-12 text-left">
								Select a special weapon
							</Label>
							<CollectionDropdown
								collection={"special"}
								selection={this.getSelection}
							/>
						</FormGroup>
						<FormGroup>
							<Label className="col-sm-12 text-left">Select a subweapon</Label>
							<CollectionDropdown
								collection={"sub"}
								selection={this.getSelection}
							/>
						</FormGroup>
						<FormGroup>
							<Label className="col-sm-12 text-left">
								Select a weapon weight
							</Label>
							<CollectionDropdown
								collection={"weight"}
								selection={this.getSelection}
							/>
						</FormGroup>
						<FormGroup className="mb-3">
							<Label for="image" className="col-sm-12 text-left">
								Image
							</Label>
							<Input type="file" name="image" onChange={this.input} />
						</FormGroup>
						<FormGroup className="mb-3">
							<Label for="thumbnail" className="col-sm-12 text-left">
								Thumbnail
							</Label>
							<Input type="file" name="thumbnail" onChange={this.input} />
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button className="pad-btn" onClick={this.saveWeapon}>
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

export default AddWeaponForm;
