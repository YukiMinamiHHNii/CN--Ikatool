import React from "react";
import { SessionContext } from "../../utils/Session";

export const withOperation = Component => {
	class WithOperation extends React.Component {
		findOperation = permissions => {
			return (
				permissions.findIndex(item => item.docId === this.props.operation) > -1
			);
		};
		checkOperation() {
			return this.findOperation(this.context.session.permissions) ? (
				<Component {...this.props} />
			) : null;
		}
		render() {
			return (
				<SessionContext.Consumer>
					{({ session }) => {
						return this.checkOperation();
					}}
				</SessionContext.Consumer>
			);
		}
	}
	WithOperation.contextType = SessionContext;
	return WithOperation;
};
