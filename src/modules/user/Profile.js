import React from "react";
import { Row, Button } from "reactstrap";
import { SessionContext } from "../../utils/Session";
import withAuthorization from "../../components/hocs/withAuthorization";
import * as Operations from "../../utils/Operations";

class Profile extends React.Component {
	edit = () => {
		console.log("Edit placeholder");
	};
	render() {
		return (
			<SessionContext.Consumer>
				{({ session, updateSession }) => (
					<article className="feature">
						<Row>
							<section className="col-sm-12 col-md-4 d-flex justify-content-center spacing">
								<img
									src="https://imgplaceholder.com/230x230"
									alt="placeholder"
								/>
							</section>
							<section className="col-sm-12 col-md-8 d-flex justify-content-center align-items-center flex-wrap spacing">
								<section className="d-flex flex-wrap justify-content-center mb-3">
									<h2>User Profile</h2>
									<Button className="pad-btn mr-3 ml-3" onClick={this.edit}>
										Edit
									</Button>
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
		);
	}
}

export default withAuthorization(Profile, Operations.USR_PROFILE);
