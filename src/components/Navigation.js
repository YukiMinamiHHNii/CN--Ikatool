import React from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu
} from "reactstrap";
import { Link } from "react-router-dom";
import * as Routes from "../utils/Routes";
import withAuthorization from "./hocs/withAuthorization";
import { firebaseApp } from "../utils/FirebaseConfig";
import "firebase/auth";

class Navigation extends React.Component {
	state = {
		isOpen: false
	};
	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};
	signOut = () => {
		firebaseApp.auth().signOut();
		this.props.history.push(Routes.INDEX);
	};
	render() {
		return (
			<Navbar className="second-color" expand="md">
				<Link to={Routes.INDEX} className="navbar-brand">
					CN--Pearl
				</Link>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					{this.props.session ? (
						<LoggedNav
							session={this.props.session}
							name={this.props.name}
							signOut={this.signOut}
						/>
					) : (
						<NotLoggedNav />
					)}
				</Collapse>
			</Navbar>
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
			<UncontrolledDropdown nav inNavbar>
				<DropdownToggle nav caret>
					Manage
				</DropdownToggle>
				<DropdownMenu right>
					<Link className="dropdown-item" to={Routes.ADM_CLASSES}>
						Weapon classes
					</Link>
					<Link className="dropdown-item" to={Routes.ADM_MODES}>
						Game modes
					</Link>
					<Link className="dropdown-item" to={Routes.ADM_SPECIALS}>
						Special weapons
					</Link>
					<Link className="dropdown-item" to={Routes.ADM_STAGES}>
						Stages
					</Link>
					<Link className="dropdown-item" to={Routes.ADM_SUBS}>
						Subweapons
					</Link>
					<Link className="dropdown-item" to={Routes.ADM_WEAPONS}>
						Weapons
					</Link>
					<Link className="dropdown-item" to={Routes.ADM_WEIGHTS}>
						Weapon weights
					</Link>
				</DropdownMenu>
			</UncontrolledDropdown>
			<NavItem>
				<NavLink onClick={props.signOut}>Sign out</NavLink>
			</NavItem>
		</Nav>
	);
};

export default withAuthorization(Navigation, () => true);
