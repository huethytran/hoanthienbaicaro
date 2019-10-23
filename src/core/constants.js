export const types = {
  INIT_BOARD: 'INIT_BOARD',
  ADD_STEP: 'ADD_STEP',
  SWITCH_PLAYER: 'SWITCH_PLAYER',
  GO_TO_STEP: 'GO_TO_STEP',
  ADD_HISTORY: 'ADD_HISTORY',
  REPLAY: 'REPLAY',
  SWITCH_SORT: 'SWITCH_SORT',
  SET_WINNER: 'SET_WINNER',
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERR: 'LOGIN_ERR',
  REGISTER: 'REGISTER',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  LOGOUT: 'LOGOUT',
  CALLBACKLINK: 'CALLBACKLINK'
};

export const numberCell = 20;

export const players = {
  X: 'X',
  O: 'O'
};

export const sort = {
  Asc: true,
  Desc: false
};

export const api_url = 'https://btcn06-1612685.herokuapp.com';
