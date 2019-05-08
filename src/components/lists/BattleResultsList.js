import React from "react";
import { Table } from "reactstrap";
import { findCollectionDataById } from "../../daos/FirebaseDAO";

class BattleResultsList extends React.Component {
	state = {
		battles: [],
		error: null
	};
	componentDidMount() {
		findCollectionDataById("battle", this.props.userId)
			.then(data => {
				this.setState({ battles: data.battles })
			})
			.catch(error => {
				this.setState({ error });
			});
	}
	componentDidUpdate(prevProps) {
		if (this.props.append !== prevProps.append && this.props.append) {
			findCollectionDataById("battle", this.props.userId)
				.then(data => {
					this.setState({ battles: data.battles })
				})
				.catch(error => {
					this.setState({ error });
				});
		}
	}
	render() {
		return !this.state.error ? (
			<section className="col-sm-12">
				<Table dark responsive className="text-center">
					<thead>
						<tr>
							<th>Played Game Mode</th>
							<th>Played Stage</th>
							<th>Used Weapon</th>
							<th>Result</th>
						</tr>
					</thead>
					<tbody>
						{this.state.battles.map(item => {
							return (
								<tr key={item.date}>
									<td>{item.mode.name}</td>
									<td>{item.stage.name}</td>
									<td>{item.weapon.name}</td>
									<td>{item.result === "true" ? "Win" : "Lose"}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</section>
		) : (
			<section className="col-sm-12">
				<h2>{this.state.error}</h2>
			</section>
		);
	}
}

export default BattleResultsList;
