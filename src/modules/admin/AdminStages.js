import React from "react";
import { Row } from "reactstrap";
import ResultAlert from "../../components/ResultAlert";
import StagesList from "../../components/StagesList";
import ModalLauncher from "../../components/ModalLauncher";

class AdminStages extends React.Component {
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
					<h2 className="mr-3 header">Stages management</h2>
					<ModalLauncher title="Add new stage" getResult={this.getResult} />
				</section>
				<StagesList append={this.state.result} />
			</Row>
		);
	}
}

export default AdminStages;
