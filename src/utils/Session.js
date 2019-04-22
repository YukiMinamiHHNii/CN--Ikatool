import React from "react";

export const SessionContext = React.createContext();

const INITIAL_STATE = {
	userID: null,
	profile: {
		username: null,
		avatar: null,
		favoriteWeapon: null,
		favoriteStage: null
	},
	operations: []
};

export class Session extends React.Component {
	state = INITIAL_STATE;

	updateSession = updatedInfo => {
		let update = Object.assign({}, this.state, updatedInfo);
		return this.setState({ ...update });
	};

	clearSession = () => {
		this.setState(INITIAL_STATE);
	};

	render() {
		return (
			<SessionContext.Provider
				value={{
					session: this.state,
					updateSession: this.updateSession,
					clearSession: this.clearSession
				}}
			>
				{this.props.children}
			</SessionContext.Provider>
		);
	}
}
