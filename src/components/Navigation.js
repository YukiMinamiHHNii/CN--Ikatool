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
								Admin operations
							</DropdownToggle>
							<DropdownMenu right>
								<Link className="dropdown-item" to="/admin/classes">
									Manage weapon classes
								</Link>
								<Link className="dropdown-item" to="/admin/modes">
									Manage game modes
								</Link>
								<Link className="dropdown-item" to="/admin/specials">
									Manage special weapons
								</Link>
								<Link className="dropdown-item" to="/admin/stages">
									Manage stages
								</Link>
								<Link className="dropdown-item" to="/admin/subs">
									Manage subweapons
								</Link>
								<Link className="dropdown-item" to="/admin/weapons">
									Manage weapons
								</Link>
								<Link className="dropdown-item" to="/admin/weights">
									Manage weapon weights
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
