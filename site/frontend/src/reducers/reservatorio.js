import {
  FETCH_INITIAL_DATA, RESERVOIR_DOWNLOADED, reservoirDownloadedAction, SELECT_RESERVATORIO,
  selectReservatorioAction
} from '../constants/actionTypes';

export const INITIAL_STATE = {
  reservatorios: [],
  selectedReservatorio: null,
  fetching_data: false,
}

export default function reservatorioReducer(state = INITIAL_STATE, action) {
  if (typeof(state) === "undefined") {
    return INITIAL_STATE;
  }

  switch (action.type) {
    case SELECT_RESERVATORIO:
      return {...state, selectedReservatorio: action.reservatorio};
    case FETCH_INITIAL_DATA:
      // para a home, só os 4 principais: Paraibuna, Jaguari, Funil e Santa Branca.
      const ids_reservatorios = [97, 70, 46, 128];

      ids_reservatorios.map((_id) => {
        fetch(`/api/v1/reservatorios/${_id}/`)
            .then(r => r.json())
            .then(r => action.asyncDispatch(reservoirDownloadedAction(r)))
            .catch(function (error) {
              console.log(error);
            });
      });
      return {
        ...state,
        fetching_data: true
      };
    case RESERVOIR_DOWNLOADED:
      if (!state.reservatorios || state.reservatorios.length === 0) {
        const new_state = {
          ...state,
          reservatorios: [action.reservatorio],
          fetching_data: false
        };
        return reservatorioReducer(new_state, selectReservatorioAction(action.reservatorio));
      } else {
        return {
          ...state,
          reservatorios: [...state.reservatorios, action.reservatorio],
          fetching_data: false
        };
      }
    default:
      return state;
  }
}
