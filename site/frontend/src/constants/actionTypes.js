export const SELECT_RESERVATORIO = 'Selecionar reservatório';
export const FETCH_INITIAL_DATA = 'Buscar dados iniciais';
export const RESERVOIR_DOWNLOADED = 'Dado de reservatório disponivel';

export function selectReservatorioAction(reservatorio) {
    return {
        type: SELECT_RESERVATORIO,
        reservatorio: reservatorio
    }
}

export function fetchInitialDataAction() {
    return {
        type: FETCH_INITIAL_DATA
    }
}

export function reservoirDownloadedAction(reservatorio) {
  return {
      type: RESERVOIR_DOWNLOADED,
      reservatorio: reservatorio
  }
}
