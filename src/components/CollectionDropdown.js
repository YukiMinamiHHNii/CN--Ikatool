import React from "react";
import { Input } from "reactstrap";
import { findCollectionData } from "../daos/FirebaseDAO";
import firebase from "firebase/app";

class CollectionDropdown extends React.Component {
	state = {
		items: []
	};
	componentDidMount() {
		findCollectionData(this.props.collection)
			.then(data => {
				this.setState({ items: data });
			})
	}
	select = e => {
		this.props.selection({
			[`selected${this.props.collection}`]:
				e.target.value !== "placeholder"
					? firebase.firestore().doc(e.target.value)
					: null
		});
	};
	render() {
		return (
			<div>
				<Input type="select" onChange={this.select}>
					<option value={"placeholder"}>Select an item</option>
					{this.state.items.map(item => {
						return (
							<option
								key={item.docId}
								value={`${this.props.collection}/${item.docId}`}
							>
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