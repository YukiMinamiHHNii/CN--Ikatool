import React from "react";
import { Table } from "reactstrap";
import { findCollectionData } from "../../daos/FirebaseDAO";
import { GameModeViewer } from "../viewers/GameModeViewer";

class GameModesList extends React.Component {
	state = {
		gameModes: [],
		error: null,
		selectedGameMode: null
	};
	componentDidMount() {
		findCollectionData("mode")
			.then(gameModes => {
				this.setState({ gameModes: gameModes });
			})
			.catch(error => {
				this.setState({ error: error });
			});
	}
	componentDidUpdate(prevProps) {
		if (this.props.append !== prevProps.append && this.props.append) {
			findCollectionData("mode")
				.then(gameModes => {
					this.setState({ gameModes: gameModes });
				})
				.catch(error => {
					this.setState({ error: error });
				});
		}
	}
	selectedGameMode = gameMode => {
		this.setState({ selectedGameMode: gameMode });
	};
	render() {
		return !this.state.error ? (
			<section className="col-sm-12">
				<Table dark hover responsive>
					<thead>
						<tr>
							<th>GameModeID</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{this.state.gameModes.map(item => {
							return (
								<tr
									key={item.docId}
									onClick={() => this.selectedGameMode(item)}
								>
									<td>{item.gameModeID}</td>
									<td>{item.name}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
				<GameModeViewer gameMode={this.state.selectedGameMode} />
			</section>
		) : (
			<section className="col-sm-12">
				<h2>{this.state.error}</h2>
			</section>
		);
	}
}

export default GameModesList;
