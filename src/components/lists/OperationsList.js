import React from "react";
import { Table, Input, Label } from "reactstrap";
import { findCollectionData } from "../../daos/FirebaseDAO";

class OperationsList extends React.Component {
	state = {
		operations: [],
		error: null
	};
	componentDidMount() {
		findCollectionData("operations")
			.then(operations => {
				this.setState({ operations });
			})
			.catch(error => {
				this.setState({ error: error });
			});
	}
	componentDidUpdate(prevProps) {
		if (this.props.append !== prevProps.append && this.props.append) {
			findCollectionData("operations")
				.then(operations => {
					this.setState({ operations });
				})
				.catch(error => {
					this.setState({ error: error });
				});
		}
	}
	render() {
		return !this.state.error ? (
			<Table dark hover responsive className="col-sm-8">
				<thead>
					<tr>
						<th colspan="2" className="text-center">
							Operations
						</th>
					</tr>
				</thead>
				<tbody>
					{this.state.operations.map(item => {
						return (
							<tr key={item.docId}>
								<td className="text-center">
									<Label>{item.desc}</Label>
								</td>
								<td className="custom-control custom-switch">
									<Input
										type="checkbox"
										className="custom-control-input"
										id={item.docId}
									/>
									<label className="custom-control-label" for={item.docId} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		) : (
			<section className="col-sm-12">
				<h2>{this.state.error}</h2>
			</section>
		);
	}
}

export default OperationsList;
