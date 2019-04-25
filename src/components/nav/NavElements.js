import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { Link } from "react-router-dom";
import { withOperation } from "../hocs/withOperation";

export const Section = withOperation(props => (
	<UncontrolledDropdown nav inNavbar>
		<DropdownToggle nav caret>
			{props.title}
		</DropdownToggle>
		<DropdownMenu right>{props.children}</DropdownMenu>
	</UncontrolledDropdown>
));

export const SubSection = withOperation(props => (
	<Link className="dropdown-item" to={props.route}>
		{props.title}
	</Link>
));
