import { types } from '../core/constants';
import { callApiLogin } from '../utils/apiCaller';

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
export const login = user => ({
  type: types.LOGIN,
  user
});

export const loginErr = err => ({
  type: types.LOGIN_ERR,
  err
});

export const loginRequest = user => {
  return dispatch => {
    return callApiLogin(user)
      .then(res => {
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('usertoken', res.data.token);
        dispatch(login(res.data));
      })
      .catch(err => {
        dispatch(loginErr(err.response.status));
      });
  };
};

export const getUser = () => {
  return dispatch => {
    dispatch(
      login({
        username: localStorage.getItem('username'),
        usertoken: localStorage.getItem('usertoken')
      })
    );
  };
};
export const logOut = () => {
  return dispatch => {
    localStorage.removeItem('username');
    localStorage.removeItem('usertoken');
    dispatch(login({ username: null, usertoken: null }));
  };
};
export const callbackLink = cbl => ({
  type: types.CALLBACKLINK,
  cbl
});
