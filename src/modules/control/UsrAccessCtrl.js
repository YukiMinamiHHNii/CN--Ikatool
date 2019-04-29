import React from "react";
import { Row, Label } from "reactstrap";
import ResultAlert from "../../components/ResultAlert";
import withAuthorization from "../../components/hocs/withAuthorization";
import * as Operations from "../../utils/Operations";
import UsersDropdown from "../../components/dropdowns/UsersDropdown";
import OperationsList from "../../components/lists/OperationsList";

class UsrAccessCtrl extends React.Component {
	state = {
		result: null,
		error: null,
		docId: null
	};
	getResult = data => {
		this.setState({ ...data });
	};
	getSelection = selectedData => {
		console.log(selectedData.users);
	};
	test = e=>{
		console.log(e.target.value);
	}
	render() {
		return (
			<Row>
				<ResultAlert data={this.state} />
				<section className="col-sm-12 d-flex flex-wrap">
					<h2 className="mr-3 header">Users and Access control</h2>
				</section>
				<section className="col-sm-12 d-flex flex-wrap justify-content-center header">
					<Label className="mr-3 mt-1">Selected user:</Label>
					<UsersDropdown collection={"users"} selection={this.getSelection} />
				</section>
				<OperationsList/>
			</Row>
		);
	}
}

export default withAuthorization(UsrAccessCtrl, Operations.UAC_USERS);
