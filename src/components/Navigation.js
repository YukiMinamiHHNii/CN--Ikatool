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
import * as Operations from "../utils/Operations";
import { withRouter } from "react-router-dom";
import { firebaseApp } from "../utils/FirebaseConfig";
import "firebase/auth";
import { SessionContext } from "../utils/Session";
import { SectionDropdown, SubSection, SingleSection } from "./nav/NavElements";

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
			<SectionDropdown title="Management" operation={Operations.MGT_MOD}>
				<SubSection
					title="Weapon Classes"
					permissions={props.permissions}
					operation={Operations.MGT_CLASSES}
					route={Routes.MGT_CLASSES}
				/>
				<SubSection
					title="Game Modes"
					operation={Operations.MGT_MODES}
					route={Routes.MGT_MODES}
				/>
				<SubSection
					title="Special Weapons"
					operation={Operations.MGT_SPECIALS}
					route={Routes.MGT_SPECIALS}
				/>
				<SubSection
					title="Stages"
					operation={Operations.MGT_STAGES}
					route={Routes.MGT_STAGES}
				/>
				<SubSection
					title="Sub Weapons"
					operation={Operations.MGT_SUBS}
					route={Routes.MGT_SUBS}
				/>
				<SubSection
					title="Weapons"
					operation={Operations.MGT_WEAPONS}
					route={Routes.MGT_WEAPONS}
				/>
				<SubSection
					title="Weapon Weights"
					operation={Operations.MGT_WEIGHTS}
					route={Routes.MGT_WEIGHTS}
				/>
			</SectionDropdown>
			<NavItem>
				<SingleSection title="Users and Access Control" operation={Operations.UAC_MOD} route={Routes.UAC}/>
			</NavItem>
			<NavItem>
				<NavLink onClick={props.signOut}>Sign out</NavLink>
			</NavItem>
		</Nav>
	);
};

Navigation.contextType = SessionContext;

export default withRouter(Navigation);
