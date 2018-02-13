import { connect } from 'react-redux'
import ReservatorioChart from '../components/reservatorio_chart'

const mapStateToProps = (state) => ({
  selectedReservatorio: state.selectedReservatorio
});

const VisibleReservatorioChart = connect(
  mapStateToProps, null
)(ReservatorioChart);

export default VisibleReservatorioChart;
