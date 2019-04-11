import React from "react";
import { Row } from "reactstrap";
import ResultAlert from "../../components/ResultAlert";
import WeaponsList from "../../components/lists/WeaponsList";
import ModalLauncher from "../../components/ModalLauncher";

class AdminWeapons extends React.Component {
	state = {
		result: null,
		error: null,
		docId: null
	};
	getResult = data => {
		this.setState({ ...data });
	};
	render() {
		return (
			<Row>
				<ResultAlert data={this.state} />
				<section className="col-sm-12 d-flex flex-wrap">
					<h2 className="mr-3 header">Weapon management</h2>
					<ModalLauncher
						title="Add new weapon"
						getResult={this.getResult}
						operation="weapon"
					/>
				</section>
				<WeaponsList append={this.state.docId !== null && this.state.docId} />
			</Row>
		);
	}
}

export default AdminWeapons;
