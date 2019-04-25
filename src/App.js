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
import AdminClasses from "./modules/admin/AdminClasses";
import AdminModes from "./modules/admin/AdminModes";
import AdminSpecials from "./modules/admin/AdminSpecials";
import AdminStages from "./modules/admin/AdminStages";
import AdminSubs from "./modules/admin/AdminSubs";
import AdminWeapons from "./modules/admin/AdminWeapons";
import AdminWeights from "./modules/admin/AdminWeights";

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
								<Route path={Routes.ADM_CLASSES} component={AdminClasses} />
								<Route path={Routes.ADM_MODES} component={AdminModes} />
								<Route path={Routes.ADM_SPECIALS} component={AdminSpecials} />
								<Route path={Routes.ADM_STAGES} component={AdminStages} />
								<Route path={Routes.ADM_SUBS} component={AdminSubs} />
								<Route path={Routes.ADM_WEAPONS} component={AdminWeapons} />
								<Route path={Routes.ADM_WEIGHTS} component={AdminWeights} />
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
