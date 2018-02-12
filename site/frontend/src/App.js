import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import ReservatorioList from './components/reservatorio_list';
import ReservatorioDetail from './components/reservatorio_detail';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        reservatorios: [],
        selectedReservatorio: null
    };

    this.fetchReservatorios();
  }

  fetchReservatorios() {
    // para a home, só os 4 principais: Paraibuna, Jaguari, Funil e Santa Branca.
    const reservatorios = [97, 70, 46, 128];

    reservatorios.map((id) => {
      axios.get(`/api/v1/reservatorios/${id}/`)
        .then(response => {
          console.log(response);
          this.addReservatorioToState(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      return true;
    });
  }

  addReservatorioToState(reservatorio) {
    this.state.reservatorios.push(reservatorio);

    if (!this.state.selectedReservatorio) {
      this.setState({
          reservatorios: this.state.reservatorios,
          selectedReservatorio: reservatorio
      });
    } else {
      this.setState({reservatorios: this.state.reservatorios});
    }
  }

  selectReservatorio(reservatorio) {
      this.setState({selectedReservatorio: reservatorio});
  }

  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md">
                    <ReservatorioList
                        reservatorios={this.state.reservatorios}
                        active={this.state.selectedReservatorio}
                        onReservatorioSelect={ reservatorio => ( this.selectReservatorio(reservatorio) ) } />
                </div>
            </div>
            <div className="row">
                <div className="col-md detalhe-reservatorio">
                    <ReservatorioDetail reservatorio={this.state.selectedReservatorio} />
                </div>
            </div>
        </div>
    );
  }
}

export default App;
