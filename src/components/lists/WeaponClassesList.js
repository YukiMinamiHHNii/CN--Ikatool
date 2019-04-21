import React from "react";
import { Table } from "reactstrap";
import { findCollectionData } from "../../daos/FirebaseDAO";

class WeaponClassesList extends React.Component {
	mounted = true;
	state = {
		classes: [],
		error: null
	};
	componentDidMount() {
		findCollectionData("class")
			.then(classes => {
				if (this.mounted) this.setState({ classes: classes });
			})
			.catch(error => {
				if (this.mounted) this.setState({ error: error });
			});
	}
	componentDidUpdate(prevProps) {
		if (this.props.append !== prevProps.append && this.props.append) {
			findCollectionData("class")
				.then(classes => {
					this.setState({ classes: classes });
				})
				.catch(error => {
					this.setState({ error: error });
				});
		}
	}
	componentWillUnmount() {
		this.mounted = false;
	}
	render() {
		return !this.state.error ? (
			<section className="col-sm-12">
				<Table dark hover responsive>
					<thead>
						<tr>
							<th>Class name</th>
						</tr>
					</thead>
					<tbody>
						{this.state.classes.map(item => {
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

export default WeaponClassesList;
