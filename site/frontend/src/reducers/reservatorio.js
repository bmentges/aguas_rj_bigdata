import {
  MEDICOES_DOWNLOADED,
  FETCH_INITIAL_DATA,
  FETCH_MEDICOES,
  RESERVOIR_DOWNLOADED,
  SELECT_RESERVATORIO,
  ADD_MEDICOES_TO_RESERVATORIO,
  selectReservatorioAction,
  reservoirDownloadedAction,
  medicoesDownloadedAction,
  addMedicoesAction,
  getMedicoesAction
} from '../constants/actionTypes';

export const INITIAL_STATE = {
  reservatorios: [],
  selectedReservatorio: null,
  fetching_data: false,
};

// para a home, só os 4 principais: Paraibuna, Jaguari, Funil e Santa Branca.
const ids_reservatorios_iniciais = [97, 70, 46, 128];

export default function globalStateReducer(state = INITIAL_STATE, action) {
  if (typeof(state) === "undefined") {
    return INITIAL_STATE;
  }

  switch (action.type) {
    case SELECT_RESERVATORIO:
      return {...state, selectedReservatorio: action.reservatorio};
    case FETCH_INITIAL_DATA:
      ids_reservatorios_iniciais.map((_id) => {
        fetch(`/api/v1/reservatorios/${_id}/`)
            .then(r => r.json())
            .then(r => action.asyncDispatch(reservoirDownloadedAction(r)))
            .catch(function (error) {
              console.log(error);
            });
        return true;
      });
      return {
        ...state,
        fetching_data: true
      };
    case FETCH_MEDICOES:
      let reservatorio = action.reservatorio;
      fetch(`/api/v1/reservatorios/${reservatorio.id}/medicoes/`)
          .then(r => r.json())
          .then(r => action.asyncDispatch(medicoesDownloadedAction(reservatorio, r)))
          .catch(function (error) {
            console.log(error);
          });

      return {...state,
          fetching_data: true
      };
    case MEDICOES_DOWNLOADED:
      let new_state = {
        ...state,
        reservatorios: state.reservatorios.map((reservatorio) =>
          reservatorioReducer(reservatorio, addMedicoesAction(action.reservatorio, action.medicoes)))
      };

      if (state.selectedReservatorio.id === action.reservatorio.id) {
        console.log(`achei!!!! ${state.selectedReservatorio.id} === ${action.reservatorio.id}`);
        new_state.reservatorios.forEach((reservatorio) => {
          if (reservatorio.id === action.reservatorio.id) {
            action.asyncDispatch(selectReservatorioAction(reservatorio));
          }
        });
      }

      return new_state;
    case RESERVOIR_DOWNLOADED:
      // agora pegar as medições (assíncrono)
      action.asyncDispatch(getMedicoesAction(action.reservatorio));

      if (!state.reservatorios || state.reservatorios.length === 0) {
        const new_state = {
          ...state,
          reservatorios: [action.reservatorio],
          fetching_data: false
        };

        // se for o primeiro, também torna-lo selecionado.
        return globalStateReducer(new_state, selectReservatorioAction(action.reservatorio));
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

export const RESERVATORIO_INITIAL_STATE = {
  id: null,
  nome: null,
  codigo_ana: null,
  estado: null,
  medicoes: []};

export function reservatorioReducer(state=RESERVATORIO_INITIAL_STATE, action) {
  if (typeof(state) === "undefined") {
    return RESERVATORIO_INITIAL_STATE;
  }

  switch(action.type) {
    case ADD_MEDICOES_TO_RESERVATORIO:
      if (state.id !== action.reservatorio.id) {
        return state;
      }
      console.log(`Medicao adicionada a reservatorio ${action.reservatorio.id}`);
      return {...state, medicoes: action.medicoes};
    default:
      return state;
  }
}
