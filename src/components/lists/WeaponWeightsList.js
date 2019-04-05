import React from "react";
import { Table } from "reactstrap";
import { findCollectionData } from "../../daos/FirebaseDAO";

class WeaponWeightsList extends React.Component {
	state = {
		weights: [],
		error: null
	};
	componentDidMount() {
		findCollectionData("weight")
			.then(weights => {
				this.setState({ weights: weights });
			})
			.catch(error => {
				this.setState({ error: error });
			});
	}
	componentDidUpdate(prevProps) {
		if (this.props.append !== prevProps.append && this.props.append) {
			findCollectionData("weight")
				.then(weights => {
					this.setState({ weights: weights });
				})
				.catch(error => {
					this.setState({ error: error });
				});
		}
	}
	render() {
		return !this.state.error ? (
			<section className="col-sm-12">
				<Table dark hover responsive>
					<thead>
						<tr>
							<th>Weight name</th>
						</tr>
					</thead>
					<tbody>
						{this.state.weights.map(item => {
							return (
								<tr key={item.docId}>
									<td>{item.name}</td>
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

export default WeaponWeightsList;
