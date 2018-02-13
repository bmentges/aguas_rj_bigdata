import React from 'react';
import {reservoirDownloadedAction} from '../constants/actionTypes';
import globalStateReducer, {INITIAL_STATE} from './reservatorio';

test("deve adicionar reservatorio na lista global", () => {
  const reservatorio = "abc";

  const expected = {
    reservatorios: [reservatorio],
    selectedReservatorio: reservatorio,
    fetching_data: false,
  }

  const resultado = globalStateReducer(INITIAL_STATE, reservoirDownloadedAction(reservatorio));

  expect(resultado).toEqual(expected);
});

test("deve adicionar reservatorio na lista global quando já estiver populada", () => {
  const reservatorio1 = {id: "abc"};
  const reservatorio2 = {id: "def"};

  const expected = {
    reservatorios: [reservatorio1, reservatorio2],
    selectedReservatorio: reservatorio1,
    fetching_data: false,
  }

  const action = reservoirDownloadedAction(reservatorio1);
  const action2 = reservoirDownloadedAction(reservatorio2);

  const resultado = globalStateReducer(globalStateReducer(INITIAL_STATE, action), action2);

  expect(resultado).toEqual(expected);
});

test("deve pegar o estado inicial por padrão", () => {
  const resultado = globalStateReducer(INITIAL_STATE, {});

  expect(resultado).toEqual(INITIAL_STATE);
});