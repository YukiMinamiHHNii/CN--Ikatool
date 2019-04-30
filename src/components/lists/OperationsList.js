import React from "react";
import { Table, Input, Label, Button } from "reactstrap";
import {
	findCollectionData,
	findCollectionDataById,
	updateData
} from "../../daos/FirebaseDAO";

class OperationsList extends React.Component {
	state = {
		operations: [],
		userOperations: null,
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
		if (this.props.user !== prevProps.user && this.props.user) {
			findCollectionDataById("users", this.props.user)
				.then(data => {
					this.setState({ userOperations: data.permissions });
				})
				.catch(error => {
					this.setState({ error: error });
				});
		}
	}
	checkUserOps = operationId => {
		return this.state.userOperations &&
			this.state.userOperations.find(item => item.docId === operationId)
			? true
			: false;
	};
	selection = e => {
		let data = e.target.id;
		if (!this.checkUserOps(e.target.id)) {
			this.setState(prevState => ({
				userOperations: [...prevState.userOperations, { docId: data }]
			}));
		} else {
			this.setState(prevState => ({
				userOperations: prevState.userOperations.filter(
					item => item.docId !== data
				)
			}));
		}
	};
	save = () => {
		updateData("users", this.props.user, {
			permissions: this.state.userOperations
		})
			.then(response => {
				return this.props.getResult({
					result: `${response.docId} permissions were successfully updated`,
					error: null,
					docId: response.docId
				});
			})
			.catch(error => {
				return this.props.getResult({
					result: null,
					error: error,
					docId: null
				});
			});
	};
	render() {
		return !this.state.error ? (
			<Table dark hover responsive className="col-sm-8">
				<thead>
					<tr>
						<th className="text-center">Operations</th>
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
										disabled={!this.props.user ? true : false}
										onChange={this.selection}
										checked={this.checkUserOps(item.docId)}
									/>
									<Label className="custom-control-label" for={item.docId} />
								</td>
							</tr>
						);
					})}
					<tr>
						<td colSpan="2" className="text-center">
							<Button
								className="pad-btn"
								onClick={this.save}
								disabled={!this.props.user ? true : false}
							>
								Save
							</Button>
						</td>
					</tr>
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
