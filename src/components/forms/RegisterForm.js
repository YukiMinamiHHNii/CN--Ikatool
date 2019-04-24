import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import { firebaseApp } from "../../utils/FirebaseConfig";
import "firebase/auth";
import { findCollectionDataById, saveDataWithId } from "../../daos/FirebaseDAO";
import { HOME } from "../../utils/Routes";
import { SessionContext } from "../../utils/Session";

class RegisterForm extends React.Component {
	state = {
		username: "",
		mail: "",
		pass: "",
		confirmPass: "",
		error: null
	};
	input = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	signUp = e => {
		firebaseApp
			.auth()
			.createUserWithEmailAndPassword(this.state.mail, this.state.pass)
			.then(result => {
				return this.initNewUser(result.user);
			})
			.then(() => {
				this.props.history.push(HOME);
			})
			.catch(error => {
				this.props.getResult({ result: null, error: error.message });
			});
		e.preventDefault();
	};
	initNewUser = user => {
		return findCollectionDataById("users", "default")
			.then(defaultUser => {
				return defaultUser.permissions;
			})
			.then(permissions => {
				return saveDataWithId("users", this.state.mail, {
					profile: {
						username: this.state.username,
						avatar: null,
						favoriteWeapon: null,
						favoriteStage: null
					},
					permissions: permissions
				});
			})
			.then(registeredUser => {
				return this.context.updateSession({
					userId: registeredUser.docId,
					profile: registeredUser.profile,
					permissions: registeredUser.permissions
				});
			})
			.catch(error => {
				return {
					message: `Error while registering new user - ${error.message}`
				};
			});
	};
	render() {
		return (
			<SessionContext.Consumer>
				{({ session, updateSession }) => (
					<Form>
						<FormGroup className="mb-3">
							<Label for="username" className="col-sm-12 text-left">
								Username
							</Label>
							<Input type="text" name="username" onChange={this.input} />
						</FormGroup>
						<FormGroup className="mb-3">
							<Label for="mail" className="col-sm-12 text-left">
								Mail
							</Label>
							<Input type="email" name="mail" onChange={this.input} />
						</FormGroup>
						<FormGroup className="mb-3">
							<Label for="pass" className="col-sm-12 text-left">
								Password
							</Label>
							<Input type="password" name="pass" onChange={this.input} />
						</FormGroup>
						<FormGroup className="mb-3">
							<Label for="confirmPass" className="col-sm-12 text-left">
								Confirm password
							</Label>
							<Input type="password" name="confirmPass" onChange={this.input} />
						</FormGroup>
						<Button className="pad-btn" onClick={this.signUp}>
							Sign Up
						</Button>
					</Form>
				)}
			</SessionContext.Consumer>
		);
	}
}

RegisterForm.contextType = SessionContext;

export default withRouter(RegisterForm);
