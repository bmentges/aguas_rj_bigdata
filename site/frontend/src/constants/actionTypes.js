export const SELECT_RESERVATORIO = 'Selecionar reservatório';
export const FETCH_INITIAL_DATA = 'Buscar dados iniciais';
export const RESERVOIR_DOWNLOADED = 'Dado de reservatório está disponível';
export const FETCH_MEDICOES = 'Pegar medições do reservatório';
export const ADD_MEDICOES_TO_RESERVATORIO = 'Adicionar medições ao reservatório';
export const MEDICOES_DOWNLOADED = 'Dados das medições estão disponíveis';

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

export function getMedicoesAction(reservatorio) {
  return {
    type: FETCH_MEDICOES,
    reservatorio: reservatorio
  }
}

export function addMedicoesAction(reservatorio, medicoes) {
  return {
    type: ADD_MEDICOES_TO_RESERVATORIO,
    reservatorio: reservatorio,
    medicoes: medicoes
  }
}

export function medicoesDownloadedAction(reservatorio, medicoes) {
  return {
    type: MEDICOES_DOWNLOADED,
    reservatorio: reservatorio,
    medicoes: medicoes
  }
}