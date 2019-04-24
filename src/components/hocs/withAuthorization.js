import React from "react";
import { withRouter } from "react-router-dom";
import { firebaseApp } from "../../utils/FirebaseConfig";
import "firebase/auth";
import { INDEX } from "../../utils/Routes";

const withAuthorization = (Component, condition) => {
	class WithAuthorization extends React.Component {
		state = {
			auth: false
		};
		checkCondition(authUser) {
			if (!condition(authUser)) {
				this.props.history.push(INDEX);
			}
		}
		checkAuth(authUser) {
			return authUser
				? this.setState({
						auth: true
				  })
				: this.setState({ auth: false });
		}
		componentDidMount() {
			this.listener=firebaseApp.auth().onAuthStateChanged(authUser => {
				this.checkAuth(authUser);
				this.checkCondition(authUser);
			});
		}
		componentWillUnmount(){
			this.listener();
		}
		render() {
			return <Component access={this.state.auth} {...this.props} />;
		}
	}

	return withRouter(WithAuthorization);
};

export default withAuthorization;
