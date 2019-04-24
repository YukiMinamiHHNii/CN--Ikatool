import React from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import * as Routes from "../utils/Routes";
import withAuthorization from "./hocs/withAuthorization";
import { firebaseApp } from "../utils/FirebaseConfig";
import "firebase/auth";
import { SessionContext } from "../utils/Session";
import { Section, SubSection } from "./nav/NavElements";

class Navigation extends React.Component {
	state = {
		isOpen: false
	};
	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};
	signOut = () => {
		firebaseApp
			.auth()
			.signOut()
			.then(() => {
				return this.context.clearSession();
			})
			.then(() => {
				return this.props.history.push(Routes.INDEX);
			});
	};
	
	render() {
		return (
			<SessionContext.Consumer>
				{({ session, updateSession, clearSession }) => (
					<Navbar className="second-color" expand="md">
						<Link to={Routes.INDEX} className="navbar-brand">
							CN--Pearl
						</Link>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							{session.userId ? (
								<LoggedNav
									name={session.profile.username}
									permissions={session.permissions}
									signOut={this.signOut}
								/>
							) : (
								<NotLoggedNav />
							)}
						</Collapse>
					</Navbar>
				)}
			</SessionContext.Consumer>
		);
	}
}

const NotLoggedNav = () => (
	<Nav className="ml-auto" navbar>
		<NavItem>
			<Link to={Routes.LOGIN} className="nav-link">
				Login
			</Link>
		</NavItem>
	</Nav>
);

const LoggedNav = props => {
	return (
		<Nav className="ml-auto" navbar>
			<NavItem>
				<Link to={Routes.HOME} className="nav-link">
					{props.name}
				</Link>
			</NavItem>
			<Section
				title="Manage"
				permissions={props.permissions}
				operation={"MOD-001"}
			>
				<SubSection title="Weapon Classes" permissions={props.permissions} operation={"MOD-003"} route={Routes.ADM_CLASSES}/>
				<SubSection title="Weapons" permissions={props.permissions} operation={"MOD-002"} route={Routes.ADM_WEAPONS}/>
			</Section>
			<NavItem>
				<NavLink onClick={props.signOut}>Sign out</NavLink>
			</NavItem>
		</Nav>
	);
};

Navigation.contextType = SessionContext;

export default withAuthorization(Navigation, () => true);
