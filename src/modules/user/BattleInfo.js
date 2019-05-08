import React from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row } from "reactstrap";
import classnames from "classnames";
import AddBattleInfoForm from "../../components/forms/AddBattleInfoForm";
import { withOperation } from "../../components/hocs/withOperation";
import BattleResultsList from "../../components/lists/BattleResultsList";
import { SessionContext } from "../../utils/Session";

class BattleInfo extends React.Component {
	state = {
		activeTab: "BattleInfo",
		docId: null
	};
	toggle = tab => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	};
	appendResult = data => {
		this.setState({ docId: data.docId }, () => {
			this.props.getResult(data);
		});
	};
	render() {
		return (
			<SessionContext.Consumer>
				{({ session }) => (
					<div className="mt-3">
						<Nav tabs>
							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.activeTab === "BattleInfo"
									})}
									onClick={() => {
										this.toggle("BattleInfo");
									}}
								>
									Register Battle Info
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.activeTab === "BattleResults"
									})}
									onClick={() => {
										this.toggle("BattleResults");
									}}
								>
									Battles Results
								</NavLink>
							</NavItem>
						</Nav>
						<TabContent className="tab-body" activeTab={this.state.activeTab}>
							<TabPane tabId="BattleInfo">
								<Row>
									<AddBattleInfoForm
										userId={session.userId}
										getResult={this.appendResult}
									/>
								</Row>
							</TabPane>
							<TabPane tabId="BattleResults">
								<Row>
									<BattleResultsList
										userId={session.userId}
										append={this.state.docId !== null && this.state.docId}
									/>
								</Row>
							</TabPane>
						</TabContent>
					</div>
				)}
			</SessionContext.Consumer>
		);
	}
}

AddBattleInfoForm.contextType = SessionContext;

export default withOperation(BattleInfo);
