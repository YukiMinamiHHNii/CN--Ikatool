import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { firebaseApp } from "../../utils/FirebaseConfig";
import "firebase/auth";

class LoginForm extends React.Component {
	state = {
		username: "",
		mail: "",
		pass: "",
		confirmPass: ""
	};
	input = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	signUp = e => {
		firebaseApp
			.auth()
			.signInWithEmailAndPassword(this.state.mail, this.state.pass)
			.then(result => {
				this.props.history.push("/");
			})
			.catch(error => {
				this.props.getResult({ result: null, error: "Incorrect mail or password" });
			});
	};
	render() {
		return (
			<section>
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
					<Button className="pad-btn" onClick={this.signUp}>
						Login
					</Button>
				</Form>
				<h4 className="text-center mt-3 mb-0">
					Don't have an account? Create one, <Link to="/register" className="highlight">here</Link>
				</h4>
			</section>
		);
	}
}

export default withRouter(LoginForm);
