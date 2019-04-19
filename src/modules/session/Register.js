import React from "react";
import ResultAlert from "../../components/ResultAlert";
import RegisterForm from "../../components/forms/RegisterForm";

class Register extends React.Component {
	state = {
		result: null,
		error: null
	};
	getResult = data => {
		this.setState({ ...data });
	};
	render() {
		return (
			<section>
				<h1 className="header">Sign Up</h1>
				<ResultAlert data={this.state} />
				<RegisterForm getResult={this.getResult} />
			</section>
		);
	}
}

export default Register;
