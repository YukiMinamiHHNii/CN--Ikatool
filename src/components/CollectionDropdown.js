import React from "react";
import { Input } from "reactstrap";
import {
	findCollectionData,
	findCollectionDataById
} from "../daos/FirebaseDAO";

class CollectionDropdown extends React.Component {
	state = {
		items: []
	};
	componentDidMount() {
		findCollectionData(this.props.collection).then(data => {
			this.setState({ items: data });
		});
	}
	select = e => {
		if (e.target.value !== "placeholder") {
			findCollectionDataById(this.props.collection, e.target.value)
				.then(result => {
					this.props.selection({
						[this.props.collection]: result
					});
				})
				.catch(error => {
					this.props.selection({
						[this.props.collection]: null
					});
				});
		} else {
			this.props.selection({
				[this.props.collection]: null
			});
		}
	};
	render() {
		return (
			<div>
				<Input type="select" onChange={this.select}>
					<option value={"placeholder"}>Select an item</option>
					{this.state.items.map(item => {
						return (
							<option key={item.docId} value={item.docId}>
								{item.name}
							</option>
						);
					})}
				</Input>
			</div>
		);
	}
}

export default CollectionDropdown;
