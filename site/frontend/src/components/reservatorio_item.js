import React, {Component} from 'react';

class ReservatorioItem extends Component {

	render() {
		let active = this.props.active ? this.props.active : '';

		return (
			<li onClick={() => this.props.onReservatorioSelect(this.props.reservatorio)} className={`nav-item ${active}`} >
				<a className="nav-link" href="#"><i class="glyphicon glyphicon-tint"></i> {this.props.reservatorio.nome} - {this.props.reservatorio.estado}</a>
			</li>
		);
	}
}

export default ReservatorioItem;