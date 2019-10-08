import { types } from '../core/constants';

export const initBoard = arrBoard => ({
  type: types.INIT_BOARD,
  arrBoard
});
export const addStep = (newArr, preStep) => ({
  type: types.ADD_STEP,
  newArr,
  preStep
});

export const switchPlayer = data => ({
  type: types.SWITCH_PLAYER,
  data
});

export const goToStep = (step, newArr) => ({
  type: types.GO_TO_STEP,
  step,
  newArr
});
export const addHistory = (numOfStep, backStep, history) => ({
  type: types.ADD_HISTORY,
  numOfStep,
  backStep,
  history
});
export const replay = () => ({
  type: types.REPLAY
});
export const switchSort = data => ({
  type: types.SWITCH_SORT,
  data
});
export const setWinner = data => ({
  type: types.SET_WINNER,
  data
});
