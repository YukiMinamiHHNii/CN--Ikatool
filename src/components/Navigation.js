import React from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}
	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};
	render() {
		return (
			<Navbar className="second-color" expand="md">
				<Link to="/" className="navbar-brand">
					CN--Pearl
				</Link>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<Link to="/" className="nav-link">
								Login
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
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								Options
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>Option 1</DropdownItem>
								<DropdownItem>Option 2</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Reset</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}

export default Navigation;
