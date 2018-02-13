import { connect } from 'react-redux'
import {selectReservatorioAction} from "../constants/actionTypes";
import ReservatorioList from "../components/reservatorio_list";

const mapStateToProps = (state) => ({
  reservatorios: state.reservatorios,
  selectedReservatorio: state.selectedReservatorio
});

const mapDispatchToProps = {
  onReservatorioSelect: selectReservatorioAction 
};

const VisibleReservatorioList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservatorioList);

export default VisibleReservatorioList;
