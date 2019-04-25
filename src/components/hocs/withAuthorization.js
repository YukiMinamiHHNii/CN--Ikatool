import React from "react";
import { withRouter } from "react-router-dom";
import * as Routes from "../../utils/Routes";

const withAuthorization = (Component, operation) => {
	class WithAuthorization extends React.Component {
		findPermission = permissions => {
			return permissions.findIndex(item => item.docId === operation) > -1;
		};
		componentDidMount() {
			let sessionData = JSON.parse(localStorage.getItem("session")); //Need it because this operation can't wait until firebase user is loaded
			if (!sessionData || !sessionData.userId) {
				this.props.history.push(Routes.LOGIN);
			} else if (!this.findPermission(sessionData.permissions, operation)) {
				this.props.history.push(Routes.UNAUTHORIZED);
			}
		}
		render() {
			return <Component {...this.props} />;
		}
	}

	return withRouter(WithAuthorization);
};

export default withAuthorization;
