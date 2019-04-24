import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { Link } from "react-router-dom";

export const Section = props => {
	return props.permissions.findIndex(item => item.docId === props.operation) >
		-1 ? (
		<UncontrolledDropdown nav inNavbar>
			<DropdownToggle nav caret>
				{props.title}
			</DropdownToggle>
			<DropdownMenu right>{props.children}</DropdownMenu>
		</UncontrolledDropdown>
	) : null;
};

export const SubSection = props => {
	return props.permissions.findIndex(item => item.docId === props.operation) >
		-1 ? (
		<Link className="dropdown-item" to={props.route}>
			{props.title}
		</Link>
	) : null;
};
