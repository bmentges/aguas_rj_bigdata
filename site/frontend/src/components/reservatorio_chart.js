import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const getData = (selectedReservatorio) => {
  if (typeof(selectedReservatorio.medicoes) === "undefined") {
    return [];
  }
  return selectedReservatorio.medicoes.map((medicao, index) => {
    if ((index % 45) === 0) { // quero 1 a cada 7 registros pra plotar no gráfico, 1 por semana ta bom.
      return dataReducer(medicao);
    } else {
      return null;
    }
  }).filter(x => x).reverse(); // remove nulls, reverse porque queremos do mais antigo pro novo (chart)
};

const dataReducer = (medicao) => {
  return {volume_util: parseFloat(medicao.volume_util), dia: medicao.data_da_medicao}
};

class SimpleLineChart extends Component {
  render() {
    return (
        <div className="chart-container">
          <div className="chart-title">
            <h3>Medições: Volume Útil (%)</h3>
          </div>
          <div className="the-chart">
            <ResponsiveContainer width="80%" height={300}>
              <LineChart data={this.props.data}
                         margin={{top: 5, right: 0, left: 0, bottom: 5}}>
                <XAxis dataKey="dia" label={{ value: "Data da medição",  position: 'bottom' }}/>
                <YAxis label={{ value: "Volume útil (%)", angle: -90, position: 'insideLeft' }}/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend verticalAlign="top" height={36}/>
                <Line connectNulls={true} type="monotone" dataKey="volume_util" stroke="#8884d8" activeDot={{r: 8}}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
    );
  }
}

function ReservatorioChart({selectedReservatorio}) {
  if (!selectedReservatorio) {
    return (
        <div style={{hidden: true}}>

        </div>
    );
  } else {
    const data = getData(selectedReservatorio);
    return (
        <div className="reservatorio-chart">
          <SimpleLineChart data={data}/>
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