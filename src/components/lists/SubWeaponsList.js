import React from "react";
import { Table } from "reactstrap";
import { findCollectionData } from "../../daos/FirebaseDAO";
import { SubWeaponViewer } from "../viewers/SubWeaponViewer";

class SubWeaponsList extends React.Component {
	state = {
		subWeapons: [],
		error: null,
		selectedSubWeapon: null
	};
	componentDidMount() {
		findCollectionData("sub")
			.then(subWeapons => {
				this.setState({ subWeapons: subWeapons });
			})
			.catch(error => {
				this.setState({ error: error });
			});
	}
	componentDidUpdate(prevProps) {
		if (this.props.append !== prevProps.append && this.props.append) {
			findCollectionData("sub")
				.then(subWeapons => {
					this.setState({ subWeapons: subWeapons });
				})
				.catch(error => {
					this.setState({ error: error });
				});
		}
	}
	selectedSubWeapon = subWeapon => {
		this.setState({ selectedSubWeapon: subWeapon });
	};
	render() {
		return !this.state.error ? (
			<section className="col-sm-12">
				<Table dark hover responsive>
					<thead>
						<tr>
							<th>SubWeaponID</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{this.state.subWeapons.map(item => {
							return (
								<tr
									key={item.docId}
									onClick={() => this.selectedSubWeapon(item)}
								>
									<td>{item.subWeaponID}</td>
									<td>{item.name}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
				<SubWeaponViewer subWeapon={this.state.selectedSubWeapon} />
			</section>
		) : (
			<section className="col-sm-12">
				<h2>{this.state.error}</h2>
			</section>
		);
	}
}

export default SubWeaponsList;
