import React from "react";
import { Row } from "reactstrap";
import ResultAlert from "../../components/ResultAlert";
import GameModesList from "../../components/lists/GameModesList";
import ModalLauncher from "../../components/ModalLauncher";
import withAuthorization from "../../components/hocs/withAuthorization";
import * as Operations from "../../utils/Operations";

class AdminModes extends React.Component {
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
					<h2 className="mr-3 header">Game modes management</h2>
					<ModalLauncher
						title="Add new game mode"
						getResult={this.getResult}
						operation="gameMode"
					/>
				</section>
				<GameModesList append={this.state.docId !== null && this.state.docId} />
			</Row>
		);
	}
}

export default withAuthorization(AdminModes, Operations.MGT_MODES);
