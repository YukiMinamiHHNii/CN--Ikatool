import dotenv from "dotenv";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "reactstrap";
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
import { firebaseApp } from "./utils/FirebaseConfig";
import "firebase/auth";

dotenv.config();

class App extends React.Component {
	state = {
		authUser: null
	};
	componentDidMount() {
		firebaseApp.auth().onAuthStateChanged(authUser => {
			authUser
				? this.setState({ authUser })
				: this.setState({ authUser: null });
		});
	}
	render() {
		return (
			<main>
				<Router>
					<Navbar />
					<Container className="main-container">
						<h2 className="header text-center">
							CN--Pearl
						</h2>
						<Switch>
							<Route path="/" exact component={Landing} />
							<Route path="/login" exact component={Login} />
							<Route path="/register" exact component={Register} />
							<Route path="/admin/classes" component={AdminClasses} />
							<Route path="/admin/modes" component={AdminModes} />
							<Route path="/admin/specials" component={AdminSpecials} />
							<Route path="/admin/stages" component={AdminStages} />
							<Route path="/admin/subs" component={AdminSubs} />
							<Route path="/admin/weapons" component={AdminWeapons} />
							<Route path="/admin/weights" component={AdminWeights} />
							<Route path="/admin/weights" component={AdminWeights} />
							<Route component={NotFound} />
						</Switch>
					</Container>
				</Router>
			</main>
		);
	}
}

const NotFound = () => (
	<h2 className="text-center">
		The content you are looking for is not here...
	</h2>
);

export default App;
