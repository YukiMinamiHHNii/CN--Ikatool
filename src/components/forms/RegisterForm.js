import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import { firebaseApp } from "../../utils/FirebaseConfig";
import "firebase/auth";
import { HOME } from "../../utils/Routes";

class RegisterForm extends React.Component {
	state = {
		mail: "",
		pass: "",
		confirmPass: "",
		roles: [],
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
				this.props.history.push(HOME);
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
