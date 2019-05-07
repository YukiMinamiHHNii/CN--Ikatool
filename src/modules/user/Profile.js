import React from "react";
import { Row } from "reactstrap";
import ModalLauncher from "../../components/ModalLauncher";
import ResultAlert from "../../components/ResultAlert";
import { SessionContext } from "../../utils/Session";
import withAuthorization from "../../components/hocs/withAuthorization";
import * as Operations from "../../utils/Operations";
import BattleInfo from "./BattleInfo";

class Profile extends React.Component {
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
			<section>
				<ResultAlert data={this.state} />
				<SessionContext.Consumer>
					{({ session, updateSession }) => (
						<article className="feature">
							<Row>
								<section className="col-sm-12 col-md-4 d-flex justify-content-center spacing">
									<img
										className="profile-img"
										src={session.profile.avatar}
										alt="placeholder"
									/>
								</section>
								<section className="col-sm-12 col-md-8 d-flex justify-content-center align-items-center flex-wrap spacing">
									<section className="d-flex flex-wrap justify-content-center mb-3">
										<h2 className="mr-3 ml-3">User Profile</h2>
										<ModalLauncher
											title="Edit"
											getResult={this.getResult}
											operation="userProfile"
										/>
									</section>
									<h3 className="col-sm-12 text-center">
										Username: {session.profile.username}
									</h3>
									<h3 className="col-sm-12 text-center">
										Favorite weapon:{" "}
										{session.profile.favoriteWeapon
											? session.profile.favoriteWeapon
											: "not set"}
									</h3>
									<h3 className="col-sm-12 text-center">
										Favorite stage:{" "}
										{session.profile.favoriteStage
											? session.profile.favoriteStage
											: "not set"}
									</h3>
								</section>
							</Row>
						</article>
					)}
				</SessionContext.Consumer>
				<BattleInfo operation={Operations.USR_BATTLES} getResult={this.getResult}/>
			</section>
		);
	}
}

export default withAuthorization(Profile, Operations.USR_PROFILE);
