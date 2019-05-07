import React from "react";
import { Input } from "reactstrap";

class BattleResultDropdown extends React.Component {
	select = e => {
		this.props.selection({
			result: e.target.value !== "placeholder" ? e.target.value : null
		});
	};
	render() {
		return (
			<div>
				<Input type="select" onChange={this.select}>
					<option value={"placeholder"}>Select an item</option>
					<option key="win" value={true}>
						Win
					</option>
					<option key="lose" value={false}>
						Lose
					</option>
				</Input>
			</div>
		);
	}
}

export default BattleResultDropdown;
