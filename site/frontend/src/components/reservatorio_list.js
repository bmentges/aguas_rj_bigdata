import React from 'react';
import ReservatorioItem from './reservatorio_item';
import PropTypes from 'prop-types';


function ReservatorioList({reservatorios, selectedReservatorio, onReservatorioSelect}) {
	let items = reservatorios.map((reservatorio) => {
    return (
        <ReservatorioItem key={reservatorio.id}
                          reservatorio={reservatorio}
                          active={(selectedReservatorio && selectedReservatorio.id === reservatorio.id)}
                          onReservatorioSelect={onReservatorioSelect}/>
    );
  });

  return (
      <ul className="nav nav-tabs nav-fill">
        {items}
      </ul>
  );
}

ReservatorioList.propTypes = {
  reservatorios: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.bool.isRequired,
    estado: PropTypes.string.isRequired,
		codigo_ana: PropTypes.number.isRequired,
  }).isRequired),
	selectedReservatorio: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.bool.isRequired,
    estado: PropTypes.string.isRequired,
		codigo_ana: PropTypes.number.isRequired,
  }),
  onReservatorioSelect: PropTypes.func.isRequired
};

export default ReservatorioList;