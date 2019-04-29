import dotenv from "dotenv";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "reactstrap";
import * as Routes from "./utils/Routes";
import Navbar from "./components/Navigation";
import Landing from "./modules/Landing";
import Login from "./modules/session/Login";
import Register from "./modules/session/Register";
import ManageClasses from "./modules/management/ManageClasses";
import ManageModes from "./modules/management/ManageModes";
import ManageSpecials from "./modules/management/ManageSpecials";
import ManageStages from "./modules/management/ManageStages";
import ManageSubs from "./modules/management/ManageSubs";
import ManageWeapons from "./modules/management/ManageWeapons";
import ManageWeights from "./modules/management/ManageWeights";
import UsrAccessCtrl from "./modules/control/UsrAccessCtrl";

import { Session } from "./utils/Session";

dotenv.config();

class App extends React.Component {
	render() {
		return (
			<Session>
				<main>
					<Router>
						<Navbar />
						<Container className="main-container">
							<h2 className="header text-center">CN--Pearl</h2>
							<Switch>
								<Route path={Routes.INDEX} exact component={Landing} />
								<Route path={Routes.HOME} exact component={Landing} />
								<Route path={Routes.LOGIN} component={Login} />
								<Route path={Routes.REGISTER} component={Register} />
								<Route path={Routes.MGT_CLASSES} component={ManageClasses} />
								<Route path={Routes.MGT_MODES} component={ManageModes} />
								<Route path={Routes.MGT_SPECIALS} component={ManageSpecials} />
								<Route path={Routes.MGT_STAGES} component={ManageStages} />
								<Route path={Routes.MGT_SUBS} component={ManageSubs} />
								<Route path={Routes.MGT_WEAPONS} component={ManageWeapons} />
								<Route path={Routes.MGT_WEIGHTS} component={ManageWeights} />
								<Route path={Routes.UAC} component={UsrAccessCtrl} />
								<Route path={Routes.UNAUTHORIZED} component={Unauthorized} />
								<Route component={NotFound} />
							</Switch>
						</Container>
					</Router>
				</main>
			</Session>
		);
	}
}

const NotFound = () => (
	<h2 className="text-center">
		The content you are looking for is not here... くコ:彡
	</h2>
);

const Unauthorized = () => (
	<h2 className="text-center">
		You are not authorized to see this content... くコ:彡
	</h2>
);

export default App;
