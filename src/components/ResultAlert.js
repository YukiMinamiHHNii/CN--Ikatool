import React from "react";
import { Alert } from "reactstrap";

class ResultAlert extends React.Component {
	state = {
		visible: false
	};
	onDismiss = () => {
		this.setState(prevState => {
			return { visible: !prevState.visible };
		});
	};
	componentDidUpdate(prevProps) {
		if (
			prevProps.data !== this.props.data &&
			(this.props.data.error || this.props.data.result)
		) {
			this.setState({ visible: true });
		}
	}
	render() {
		return (
			this.props.data && (
				<Alert
					className="col-sm-12"
					color={this.props.data.error ? "danger" : "success"}
					isOpen={this.state.visible}
					toggle={this.onDismiss}
				>
					{this.props.data.error
						? this.props.data.error
						: this.props.data.result}
				</Alert>
			)
		);
	}
}

export default ResultAlert;
