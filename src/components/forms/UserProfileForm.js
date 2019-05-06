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
import NameDropdown from "../dropdowns/NameDropdown";
import { addProfileDataWithId } from "../../daos/FirebaseDAO";
import { SessionContext } from "../../utils/Session";

class UserProfileForm extends React.Component {
	state = {
		avatar: "",
		username: "",
		stage: "",
		weapon: ""
	};
	updateProfile = () => {
		addProfileDataWithId(
			{
				profile: {
					avatar: this.state.avatar,
					username: this.state.username,
					favoriteWeapon: this.state.weapon,
					favoriteStage: this.state.stage
				}
			},
			"users",
			this.context.session.userId
		)
			.then(updatedData => {
				delete updatedData["docId"];
				return this.context.updateSession(updatedData);
			})
			.then(response => {
				return this.props.getResult({
					result: "User profile updated successfully",
					error: null,
					docId: this.context.session.userId
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
				e.target.name !== "avatar" ? e.target.value : e.target.files[0]
		});
	};
	getSelection = (selectedData, collection) => {
		this.setState({ ...selectedData });
	};
	render() {
		return (
			<SessionContext.Consumer>
				{({ session, updateSession }) => (
					<section>
						<ModalHeader className="second-color">
							{this.props.title}
						</ModalHeader>
						<ModalBody>
							<Form>
								<FormGroup className="mb-3">
									<Label for="username" className="col-sm-12 text-left">
										Username:
									</Label>
									<Input
										type="text"
										name="username"
										placeholder="Enter username"
										onChange={this.input}
									/>
								</FormGroup>
								<FormGroup className="mb-3">
									<Label className="col-sm-12 text-left">Favorite Weapon</Label>
									<NameDropdown
										collection={"weapon"}
										selection={this.getSelection}
									/>
								</FormGroup>
								<FormGroup className="mb-3">
									<Label className="col-sm-12 text-left">Favorite Stage</Label>
									<NameDropdown
										collection={"stage"}
										selection={this.getSelection}
									/>
								</FormGroup>
								<FormGroup className="mb-3">
									<Label for="avatar" className="col-sm-12 text-left">
										Avatar
									</Label>
									<Input type="file" name="avatar" onChange={this.input} />
								</FormGroup>
							</Form>
						</ModalBody>
						<ModalFooter>
							<Button className="pad-btn" onClick={this.updateProfile}>
								Save
							</Button>
							<Button className="pad-btn" onClick={this.props.hide}>
								Cancel
							</Button>
						</ModalFooter>
					</section>
				)}
			</SessionContext.Consumer>
		);
	}
}

UserProfileForm.contextType = SessionContext;

export default UserProfileForm;
