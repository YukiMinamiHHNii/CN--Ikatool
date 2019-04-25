import React from "react";
import { firebaseApp } from "./FirebaseConfig";
import "firebase/auth";
import { findCollectionDataById } from "../daos/FirebaseDAO";

export const SessionContext = React.createContext();

const INITIAL_STATE = {
	userId: null,
	profile: {
		username: null,
		avatar: null,
		favoriteWeapon: null,
		favoriteStage: null
	},
	permissions: []
};

export class Session extends React.Component {
	state = INITIAL_STATE;

	updateSession = updatedInfo => {
		let update = Object.assign({}, this.state, updatedInfo);
		localStorage.setItem("session", JSON.stringify(update)); //Need it to speed up auth validation HOC
		return this.setState({ ...update });
	};

	clearSession = () => {
		localStorage.clear();
		this.setState(INITIAL_STATE);
	};

	initSession = data => {
		return findCollectionDataById("users", data.email)
			.then(userData => {
				return this.updateSession({
					userId: userData.docId,
					profile: userData.profile,
					permissions: userData.permissions
				});
			})
			.catch(error => {
				this.clearSession();
			});
	};

	componentDidMount() {
		this.listener = firebaseApp.auth().onAuthStateChanged(authUser => {
			return authUser ? this.initSession(authUser) : this.clearSession;
		});
	}

	componentWillUnmount() {
		this.listener();
	}

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
