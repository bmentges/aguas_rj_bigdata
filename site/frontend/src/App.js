import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import VisibleReservatorioList from './containers/visible_reservatorio_list';
import VisibleReservatorioDetail from './containers/visible_reservatorio_detail';

class App extends Component {

  componentDidCatch(error, errorInfo) {
      console.log(error);
      console.log(errorInfo);
  }

  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md">
                    <VisibleReservatorioList />
                </div>
            </div>
            <div className="row painel-detalhe">
                <div className="col-md detalhe-reservatorio">
                    <VisibleReservatorioDetail />
                </div>
            </div>
        </div>
    );
  }

}

App.contextTypes = { store: PropTypes.object };

export default App;
