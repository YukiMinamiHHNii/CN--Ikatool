import React from "react";
import { Link } from "react-router-dom";

class AdminDashboard extends React.Component {
	render() {
		return (
			<ul>
				<li>
					<Link to="/admin/abilities">Manage abilities</Link>
				</li>
				<li>
					<Link to="/admin/brands">Manage brands</Link>
				</li>
				<li>
					<Link to="/admin/classes">Manage classes</Link>
				</li>
				<li>
					<Link to="/admin/modes">Manage modes</Link>
				</li>
				<li>
					<Link to="/admin/specials">Manage specials</Link>
				</li>
				<li>
					<Link to="/admin/stages">Manage stages</Link>
				</li>
				<li>
					<Link to="/admin/subs">Manage subs</Link>
				</li>
				<li>
					<Link to="/admin/weapons">Manage weapons</Link>
				</li>
				<li>
					<Link to="/admin/weights">Manage weights</Link>
				</li>
			</ul>
		);
	}
}

export default AdminDashboard;
