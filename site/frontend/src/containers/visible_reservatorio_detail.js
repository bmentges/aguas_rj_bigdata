import { connect } from 'react-redux'
import ReservatorioDetail from '../components/reservatorio_detail'

const mapStateToProps = (state) => ({
  selectedReservatorio: state.selectedReservatorio
});

const VisibleReservatorioDetail = connect(
  mapStateToProps, null
)(ReservatorioDetail);

export default VisibleReservatorioDetail;
