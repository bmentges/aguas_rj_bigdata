import React from 'react';
import PropTypes from 'prop-types';

function ReservatorioDetail({selectedReservatorio}) {

  if (!selectedReservatorio) {
    return (
        <div className="reservatorio-detail">
          Carregando reservatórios... aguarde.
        </div>
    );
  } else {
    return (
        <div className="reservatorio-detail">
          Dados do reservatorio: <br/>
          <ul>
            <li>Id: {selectedReservatorio.id}<br/></li>
            <li>Nome: {selectedReservatorio.nome}<br/></li>
            <li>Código ANA: {selectedReservatorio.codigo_ana}<br/></li>
            <li>Estado: {selectedReservatorio.estado}<br/></li>
          </ul>
        </div>
    );
  }
}

ReservatorioDetail.propTypes = {
  selectedReservatorio: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.bool.isRequired,
    estado: PropTypes.string.isRequired,
    codigo_ana: PropTypes.number.isRequired,
  })
};

export default ReservatorioDetail;