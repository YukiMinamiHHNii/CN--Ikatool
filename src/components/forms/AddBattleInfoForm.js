import React from "react";
import { Form, FormGroup, Label, Button } from "reactstrap";
import CollectionDropdown from "../CollectionDropdown";
import BattleResultDropdown from "../dropdowns/BattleResultDropdown";
import { updateData } from "../../daos/FirebaseDAO";
import * as firebase from "firebase/app";
import "firebase/firestore";

class AddBattleInfoForm extends React.Component {
	state = {
		mode: null,
		stage: null,
		weapon: null,
		result: null
	};
	saveResult = () => {
		if (this.checkFormData()) {
			updateData("battle", this.props.userId, {
				battles: firebase.firestore.FieldValue.arrayUnion({
					...this.state,
					date: new Date().toISOString()
				})
			})
				.then(response => {
					return this.props.getResult({
						result: "Battle data added successfully",
						error: null,
						docId: new Date().toISOString()
					});
				})
				.catch(error => {
					return this.props.getResult({
						result: null,
						error: error,
						docId: null
					});
				});
		} else {
			return this.props.getResult({
				result: null,
				error: "Error: battle info form is missing required values",
				docId: null
			});
		}
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
	checkFormData = () => {
		for (let key in this.state) {
			if (this.state[key] === null) return false;
		}
		return true;
	};
	render() {
		return (
			<section className="col-sm-12">
				<Form className="row">
					<FormGroup className="mb-3 col-sm-12 col-md-4">
						<Label className="col-sm-12 text-left">Played Game Mode</Label>
						<CollectionDropdown
							collection={"mode"}
							selection={this.getSelection}
						/>
					</FormGroup>
					<FormGroup className="mb-3 col-sm-12 col-md-4">
						<Label className="col-sm-12 text-left">Played Stage</Label>
						<CollectionDropdown
							collection={"stage"}
							selection={this.getSelection}
						/>
					</FormGroup>
					<FormGroup className="mb-3 col-sm-12 col-md-4">
						<Label className="col-sm-12 text-left">Used Weapon</Label>
						<CollectionDropdown
							collection={"weapon"}
							selection={this.getSelection}
						/>
					</FormGroup>
					<FormGroup className="mb-3 col-sm-12 col-md-4">
						<Label className="col-sm-12 text-left">Battle Result</Label>
						<BattleResultDropdown selection={this.getSelection} />
					</FormGroup>
					<FormGroup className="col-sm-12">
						<Button className="pad-btn" onClick={this.saveResult}>
							Save
						</Button>
					</FormGroup>
				</Form>
			</section>
		);
	}
}

export default AddBattleInfoForm;
