import { connect } from 'react-redux'
import ReservatorioDetail from '../components/reservatorio_detail'

const mapStateToProps = (state) => ({
  selectedReservatorio: state.selectReservatorio
});

const VisibleReservatorioDetail = connect(
  mapStateToProps
)(ReservatorioDetail);

export default VisibleReservatorioDetail;
