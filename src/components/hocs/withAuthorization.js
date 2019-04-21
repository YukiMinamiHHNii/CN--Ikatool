import React from "react";
import { withRouter } from "react-router-dom";
import { firebaseApp } from "../../utils/FirebaseConfig";
import "firebase/auth";
import { INDEX } from "../../utils/Routes";

const withAuthorization = (Component, condition) => {
	class WithAuthorization extends React.Component {
		state = {
			auth: false,
			name: null
		};
		checkCondition(authUser) {
			if (!condition(authUser)) {
				this.props.history.push(INDEX);
			}
		}
		checkAuth(authUser) {
			return authUser
				? this.setState({
						auth: true,
						name: authUser.displayName ? authUser.displayName : authUser.email
				  })
				: this.setState({ auth: false, name: null });
		}
		componentDidMount() {
			firebaseApp.auth().onAuthStateChanged(authUser => {
				this.checkAuth(authUser);
				this.checkCondition(authUser);
			});
		}
		render() {
			return (
				<Component
					session={this.state.auth}
					name={this.state.name}
					{...this.props}
				/>
			);
		}
	}

	return withRouter(WithAuthorization);
};

export default withAuthorization;
