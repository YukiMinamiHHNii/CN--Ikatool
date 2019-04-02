import React from "react";
import { Table } from "reactstrap";
import { getData } from "../../utils/APIUtils";
import { SpecialWeaponViewer } from "../viewers/SpecialWeaponViewer";

class SpecialWeaponsList extends React.Component {
	state = {
		specialWeapons: [],
		error: null,
		selectedSpecialWeapon: null
	};
	componentDidMount() {
		getData("special")
			.then(specialWeapons => {
				this.setState({ specialWeapons: specialWeapons });
			})
			.catch(error => {
				this.setState({ error: error });
			});
	}
	componentDidUpdate(prevProps) {
		if (this.props.append !== prevProps.append && this.props.append) {
			getData("special")
				.then(specialWeapons => {
					this.setState({ specialWeapons: specialWeapons });
				})
				.catch(error => {
					this.setState({ error: error });
				});
		}
	}
	selectedSpecialWeapon = specialWeapon => {
		this.setState({ selectedSpecialWeapon: specialWeapon });
	};
	render() {
		return !this.state.error ? (
			<section className="col-sm-12">
				<Table dark hover responsive>
					<thead>
						<tr>
							<th>SpecialWeaponID</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{this.state.specialWeapons.map(item => {
							return (
								<tr
									key={item.docId}
									onClick={() => this.selectedSpecialWeapon(item)}
								>
									<td>{item.specialWeaponID}</td>
									<td>{item.name}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
				<SpecialWeaponViewer specialWeapon={this.state.selectedSpecialWeapon}/>
			</section>
		) : (
			<section className="col-sm-12">
				<h2>{this.state.error}</h2>
			</section>
		);
	}
}

export default SpecialWeaponsList;
