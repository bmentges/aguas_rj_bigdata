import React, {Component} from 'react';

class ReservatorioItem extends Component {

	render() {
		let active = '';

		if (this.props.active) {
			active = 'active';
		}

		const activeClassName = `nav-item ${active}`;

		return (
			<li onClick={() => this.props.onReservatorioSelect(this.props.reservatorio)} className={activeClassName} >
				<a className="nav-link" href="#"><i class="glyphicon glyphicon-tint"></i> {this.props.reservatorio.nome} - {this.props.reservatorio.estado}</a>
			</li>
		);
	}
}

export default ReservatorioItem;