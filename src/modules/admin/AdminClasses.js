import React from "react";
import { Row } from "reactstrap";
import ResultAlert from "../../components/ResultAlert";
import WeaponClassesList from "../../components/lists/WeaponClassesList";
import ModalLauncher from "../../components/ModalLauncher";
import withAuthorization from "../../components/hocs/withAuthorization";

class AdminClasses extends React.Component {
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
					<h2 className="mr-3 header">Weapon classes management</h2>
					<ModalLauncher
						title="Add new weapon class"
						getResult={this.getResult}
						operation="weaponClass"
					/>
				</section>
				<WeaponClassesList
					append={this.state.docId !== null && this.state.docId}
				/>
			</Row>
		);
	}
}

export default withAuthorization(
	AdminClasses,
	authUser => authUser.displayName === "YukiMinami2"
);
