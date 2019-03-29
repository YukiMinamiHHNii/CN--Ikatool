import React from "react";
import { Row } from "reactstrap";
import StagesList from "../../components/StagesList";
import ModalLauncher from "../../components/ModalLauncher";

class AdminStages extends React.Component {
	state = {
		result: null,
		error: null
	};
	getResult = data => {
		if (data.error) {
			this.setState({ result: null, error: data.error });
		} else {
			this.setState({ result: data.docId, error: null });
		}
	};
	render() {
		return (
			<Row>
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
