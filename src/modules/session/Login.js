import React from "react";
import ResultAlert from "../../components/ResultAlert";
import LoginForm from "../../components/forms/LoginForm";

class Login extends React.Component {
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
				<h1 className="header">Login</h1>
				<ResultAlert data={this.state} />
				<LoginForm getResult={this.getResult} />
			</section>
		);
	}
}

export default Login;
