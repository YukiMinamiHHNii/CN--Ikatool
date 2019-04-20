import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import { firebaseApp } from "../../utils/FirebaseConfig";
import "firebase/auth";

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
				return firebaseApp.auth().currentUser.updateProfile({
					displayName: this.state.username
				});
			})
			.then(() => {
				this.props.history.push("/");
			})
			.catch(error => {
				this.props.getResult({ result: null, error: error.message });
			});
		e.preventDefault();
	};
	render() {
		return (
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
		);
	}
}

export default withRouter(RegisterForm);
