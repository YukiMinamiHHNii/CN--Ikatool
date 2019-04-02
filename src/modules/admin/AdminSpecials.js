import React from "react";
import { Row } from "reactstrap";
import ResultAlert from "../../components/ResultAlert";
import SpecialWeaponsList from "../../components/lists/SpecialWeaponsList";
import ModalLauncher from "../../components/ModalLauncher";

class AdminSpecials extends React.Component {
	state = {
		result: null,
		error: null
	};
	getResult = data => {
		this.setState({ ...data });
	};
	render() {
		return (
			<Row>
				<ResultAlert data={this.state} />
				<section className="col-sm-12 d-flex flex-wrap">
					<h2 className="mr-3 header">Special weapons management</h2>
					<ModalLauncher
						title="Add new special weapon"
						getResult={this.getResult}
						operation="specialWeapon"
					/>
				</section>
				<SpecialWeaponsList append={this.state.result} />
			</Row>
		);
	}
}

export default AdminSpecials;
