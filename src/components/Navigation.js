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
		return firebaseApp.auth().signOut();
	};
	render() {
		return (
			<Navbar className="second-color" expand="md">
				<Link to="/" className="navbar-brand">
					CN--Pearl
				</Link>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					{this.props.session ? (
						<LoggedNav session={this.props.session} signOut={this.signOut} />
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
			<Link to="/login" className="nav-link">
				Login
			</Link>
		</NavItem>
	</Nav>
);

const LoggedNav = props => {
	return (
		<Nav className="ml-auto" navbar>
			<NavItem>
				<Link to="/" className="nav-link">
					{props.session.displayName}
				</Link>
			</NavItem>
			<UncontrolledDropdown nav inNavbar>
				<DropdownToggle nav caret>
					Manage
				</DropdownToggle>
				<DropdownMenu right>
					<Link className="dropdown-item" to="/admin/classes">
						Weapon classes
					</Link>
					<Link className="dropdown-item" to="/admin/modes">
						Game modes
					</Link>
					<Link className="dropdown-item" to="/admin/specials">
						Special weapons
					</Link>
					<Link className="dropdown-item" to="/admin/stages">
						Stages
					</Link>
					<Link className="dropdown-item" to="/admin/subs">
						Subweapons
					</Link>
					<Link className="dropdown-item" to="/admin/weapons">
						Weapons
					</Link>
					<Link className="dropdown-item" to="/admin/weights">
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

export default Navigation;
