import React, { Component } from 'react';


class ReservatorioDetail extends Component {

    render() {
        if (!this.props.reservatorio) {
            return (
                <div className="reservatorio-detail">

                </div>
            );
        } else {
            return (
                <div className="reservatorio-detail">
                    Dados do reservatorio: <br/>
                    <ul>
                        <li>Id: {this.props.reservatorio.id}<br/></li>
                        <li>Nome: {this.props.reservatorio.nome}<br/></li>
                        <li>Código ANA: {this.props.reservatorio.codigo_ana}<br/></li>
                        <li>Estado: {this.props.reservatorio.estado}<br/></li>
                    </ul>
                </div>
            );
        }
    }
}

export default ReservatorioDetail;