import React from "react";
import { Table } from "reactstrap";
import { findCollectionData } from "../../daos/FirebaseDAO";
import { StageViewer } from "../viewers/StageViewer";

class StagesList extends React.Component {
	state = {
		stages: [],
		error: null,
		selectedStage: null
	};
	componentDidMount() {
		findCollectionData("stage")
			.then(stages => {
				this.setState({ stages: stages });
			})
			.catch(error => {
				this.setState({ error: error });
			});
	}
	componentDidUpdate(prevProps) {
		if (this.props.append !== prevProps.append && this.props.append) {
			findCollectionData("stage")
				.then(stages => {
					this.setState({ stages: stages });
				})
				.catch(error => {
					this.setState({ error: error });
				});
		}
	}
	selectedStage = stage => {
		this.setState({ selectedStage: stage });
	};
	render() {
		return !this.state.error ? (
			<section className="col-sm-12">
				<Table dark hover responsive>
					<thead>
						<tr>
							<th>SplatNetID</th>
							<th>Stage name</th>
						</tr>
					</thead>
					<tbody>
						{this.state.stages.map(item => {
							return (
								<tr key={item.docId} onClick={() => this.selectedStage(item)}>
									<td>{item.splatnetID}</td>
									<td>{item.name}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
				<StageViewer stage={this.state.selectedStage} />
			</section>
		) : (
			<section className="col-sm-12">
				<h2>{this.state.error}</h2>
			</section>
		);
	}
}

export default StagesList;
