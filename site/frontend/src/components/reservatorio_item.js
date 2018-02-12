import React, { Component } from 'react';

class ReservatorioItem extends Component {

	constructor(props) {
		super(props);

		this.state = {
			reservatorio: props.reservatorio,
			onReservatorioSelect: props.onReservatorioSelect,
			reservatorioIconUrl: require('../images/icons/reservatorio.jpg'),
			active: props.active
		};
	}



	render() {
		let active = '';

		if (this.state.active && this.state.active.id === this.state.reservatorio.id) {
			active = 'active';
		}

		const imgStyle = {
			width: '64px',
			height: '64px'
		};

		const activeClassName = `nav-item ${active}`;

		return (
			<li onClick={() => this.state.onReservatorioSelect(this.state.reservatorio)} className={activeClassName} >
				<a className="nav-link" href="#"><i class="glyphicon glyphicon-tint"></i> {this.state.reservatorio.nome} - {this.state.reservatorio.estado}</a>
			</li>
		);
	}
}

export default ReservatorioItem;