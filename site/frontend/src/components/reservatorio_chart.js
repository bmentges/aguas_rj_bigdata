import React from 'react';
import PropTypes from 'prop-types';

function ReservatorioChart({selectedReservatorio}) {

  if (!selectedReservatorio) {
    return(
        <div style={{hidden: true}}>

        </div>
    );
  } else {
    return (
        <div className="reservatorio-chart">
          Aqui entra o gráfico
        </div>
    );
  }
}

ReservatorioChart.propTypes = {
  selectedReservatorio: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.bool.isRequired,
    estado: PropTypes.string.isRequired,
    codigo_ana: PropTypes.number.isRequired,
  })
};

export default ReservatorioChart;