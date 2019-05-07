import React from "react";
import {
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	Row,
	Col
} from "reactstrap";
import classnames from "classnames";
import AddBattleInfoForm from "../../components/forms/AddBattleInfoForm";
import { withOperation } from "../../components/hocs/withOperation";

class BattleInfo extends React.Component {
	state = {
		activeTab: "1"
	};

	toggle = tab => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	};
	render() {
		return (
			<div className="mt-3">
				<Nav tabs>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === "1" })}
							onClick={() => {
								this.toggle("1");
							}}
						>
							Register Battle Info
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === "2" })}
							onClick={() => {
								this.toggle("2");
							}}
						>
							Battles Results
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent className="tab-body" activeTab={this.state.activeTab}>
					<TabPane tabId="1">
						<Row>
							<AddBattleInfoForm getResult={this.props.getResult} />
						</Row>
					</TabPane>
					<TabPane tabId="2">
						<Row>
							<Col sm="12">
								<h4>Tab 2 Contents</h4>
							</Col>
						</Row>
					</TabPane>
				</TabContent>
			</div>
		);
	}
}

export default withOperation(BattleInfo);
