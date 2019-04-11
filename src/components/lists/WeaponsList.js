import React from "react";
import { Table } from "reactstrap";
import { findCollectionData } from "../../daos/FirebaseDAO";
import { WeaponViewer } from "../viewers/WeaponViewer";

class WeaponsList extends React.Component {
	state = {
		weapons: [],
		error: null,
		selectedWeapon: null
	};
	componentDidMount() {
		this.getData();
	}
	componentDidUpdate(prevProps) {
		if (this.props.append !== prevProps.append && this.props.append) {
			this.getData();
		}
	}
	getData = () => {
		findCollectionData("weapon")
			.then(weapons => {
				this.setState({ weapons });
			})
			.catch(error => {
				this.setState({ error: error });
			});
	};
	selectedWeapon = selectedWeapon => {
		this.setState({ selectedWeapon });
	};
	render() {
		return !this.state.error ? (
			<section className="col-sm-12">
				<Table dark hover responsive>
					<thead>
						<tr>
							<th>SplatNetID</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{this.state.weapons.map(item => {
							return (
								<tr key={item.docId} onClick={() => this.selectedWeapon(item)}>
									<td>{item.splatnetID}</td>
									<td>{item.name}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
				<WeaponViewer weapon={this.state.selectedWeapon} />
			</section>
		) : (
			<section className="col-sm-12">
				<h2>{this.state.error}</h2>
			</section>
		);
	}
}

export default WeaponsList;
