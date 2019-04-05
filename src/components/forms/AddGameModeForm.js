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

class AddGameModeForm extends React.Component {
	state = {
		gameModeID: "",
		name: "",
		thumbnail: ""
	};
	saveGameMode = () => {
		addCollectionData(this.state, "mode")
			.then(response => {
				return this.props.getResult({
					result: "Game mode data added successfully",
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
							<Label for="gameModeID" className="col-sm-12 text-left">
								GameModeID
							</Label>
							<Input
								type="text"
								name="gameModeID"
								placeholder="Enter GameModeID"
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
								placeholder="Enter game mode name"
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
					<Button className="pad-btn" onClick={this.saveGameMode}>
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

export default AddGameModeForm;
