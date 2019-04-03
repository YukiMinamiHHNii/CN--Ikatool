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

class AddStageForm extends React.Component {
	state = {
		splatnetID: "",
		name: "",
		thumbnail: ""
	};
	saveStage = () => {
		saveData(this.state, "stage")
			.then(response => {
				return this.props.getResult({
					result: "Stage data added successfully",
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
				e.target.name !== "thumbnail" ? e.target.value : e.target.files[0]
		});
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
								placeholder="Enter SplatNetID"
								onChange={this.input}
							/>
						</FormGroup>
						<FormGroup className="mb-3">
							<Label for="name" className="col-sm-12 text-left">
								Stage name
							</Label>
							<Input
								type="text"
								name="name"
								placeholder="Enter Stage name"
								onChange={this.input}
							/>
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
					<Button className="pad-btn" onClick={this.saveStage}>
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

export default AddStageForm;
