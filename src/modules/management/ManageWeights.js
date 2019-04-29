import React from "react";
import { Row } from "reactstrap";
import ResultAlert from "../../components/ResultAlert";
import ModalLauncher from "../../components/ModalLauncher";
import WeaponWeightsList from "../../components/lists/WeaponWeightsList";
import withAuthorization from "../../components/hocs/withAuthorization";
import * as Operations from "../../utils/Operations";

class AdminWeights extends React.Component {
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
					<h2 className="mr-3 header">Weapon weights management</h2>
					<ModalLauncher
						title="Add new weapon weight"
						getResult={this.getResult}
						operation="weight"
					/>
				</section>
				<WeaponWeightsList
					append={this.state.docId !== null && this.state.docId}
				/>
			</Row>
		);
	}
}

export default withAuthorization(AdminWeights, Operations.MGT_WEIGHTS);
