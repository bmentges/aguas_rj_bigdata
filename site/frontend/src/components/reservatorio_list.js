import React, { Component } from 'react';
import ReservatorioItem from './reservatorio_item';


class ReservatorioList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reservatorios: props.reservatorios,
			active: props.active,
			onReservatorioSelect: props.onReservatorioSelect
		};
	}

	render() {
		const reservatorioItems = this.state.reservatorios.map((reservatorio) => {
			return(
				<ReservatorioItem key={reservatorio.id}
								  reservatorio={reservatorio}
								  actice={this.state.active}
								  onReservatorioSelect={this.state.onReservatorioSelect} />
			);
		});

		return (
			<ul className="nav nav-tabs nav-fill">
				{reservatorioItems}
			</ul>
		);
	}
}

export default ReservatorioList;