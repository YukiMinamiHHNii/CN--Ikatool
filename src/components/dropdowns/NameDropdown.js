import React from "react";
import { Input } from "reactstrap";
import { findCollectionData } from "../../daos/FirebaseDAO";

class NameDropdown extends React.Component {
	state = {
		items: []
	};
	componentDidMount() {
		findCollectionData(this.props.collection).then(data => {
			this.setState({ items: data });
		});
	}
	select = e => {
		this.props.selection({
			[this.props.collection]:
				e.target.value !== "placeholder"
					? e.target.value
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
								value={item.name}
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

export default NameDropdown;
