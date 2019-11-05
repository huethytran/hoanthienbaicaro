import { types } from '../core/constants';
import * as callApi from '../utils/apiCaller';

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
export const replay = data => ({
  type: types.REPLAY,
  data
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
export const loginfb = user => ({
  type: types.LOGIN_FB,
  user
});
export const loginErr = err => ({
  type: types.LOGIN_ERR,
  err
});
export const loginFbRequest = data => {
  return dispatch => {
    return callApi
      .callApiLoginFb(data)
      .then(res => {
        localStorage.setItem('usertoken', res.data.token);
        dispatch(loginfb(res.data));
      })
      .catch(err => {
        dispatch(loginErr(err.response.data));
      });
  };
};
export const loginGgRequest = data => {
  return dispatch => {
    return callApi
      .callApiLoginGg(data)
      .then(res => {
        localStorage.setItem('usertoken', res.data.token);
        dispatch(loginfb(res.data));
      })
      .catch(err => {
        dispatch(loginErr(err.response.data));
      });
  };
};
export const logout = () => ({
  type: types.LOGOUT
});

export const loginRequest = user => {
  return dispatch => {
    return callApi
      .callApiLogin(user)
      .then(res => {
        localStorage.setItem('usertoken', res.data.token);
        dispatch(login(res.data));
      })
      .catch(err => {
        dispatch(loginErr(err.response.data));
      });
  };
};

export const getUser = () => {
  return dispatch => {
    return callApi
      .callApiGetInfo()
      .then(res => {
        dispatch(
          login({
            username: res.data.username,
            usertoken: localStorage.getItem('usertoken'),
            email: res.data.email,
            numOfWordInPassword: res.data.numOfWordInPassword,
            imageUrl: res.data.imageUrl
          })
        );
      })
      .catch(err => {
        console.log(err);
        dispatch(
          login({
            username: null,
            usertoken: null,
            email: null,
            numOfWordInPassword: 0
          })
        );
        localStorage.removeItem('usertoken');
      });
  };
};
export const logOut = () => {
  return dispatch => {
    localStorage.removeItem('usertoken');
    dispatch(logout());
  };
};
export const callbackLink = cbl => ({
  type: types.CALLBACKLINK,
  cbl
});

export const setCompetitor = competitor => ({
  type: types.SET_COMPETITOR,
  competitor
});

export const removeCompetitor = () => ({
  type: types.REMOVE_COMPETITOR
});
export const switchPlayerOnline = data => ({
  type: types.SWITCH_PLAYER_ONLINE,
  data
});
export const acceptUndo = history => ({
  type: types.ACCEPT_UNDO,
  history
});
export const visibleModal = () => ({
  type: types.VISIBLE_MODAL
});
export const hideModal = () => ({
  type: types.HIDE_MODAL
});
export const setRequestUndo = data => ({
  type: types.SET_REQUEST_UNDO,
  data
});
export const setRequestReplay = data => ({
  type: types.SET_REQUEST_REPLAY,
  data
});
export const switchIsSearching = data => ({
  type: types.SWITCH_IS_SEARCHING,
  data
});
export const addMessage = message => ({
  type: types.ADD_CHAT,
  message
});
export const removeChat = () => ({
  type: types.REMOVE_CHAT
});
export const changePassword = numOfWordInPassword => ({
  type: types.CHANGE_PASSWORD,
  numOfWordInPassword
});
export const changePasswordErr = err => ({
  type: types.CHANGE_PASSWORD_ERR,
  err
});
export const switchIsChangePassword = data => ({
  type: types.SWITCH_IS_CHANGE_PASSWORD,
  data
});
export const beforeChangePassword = data => {
  return dispatch => {
    return callApi
      .callApiChangePassword(data)
      .then(() => {
        dispatch(getUser());
        dispatch(switchIsChangePassword());
      })
      .catch(err => {
        console.log(err.response);
        if (err.response.status === 401) window.location.assign('/login');
        else dispatch(changePasswordErr(err.response.data));
      });
  };
};
export const updateInfoErr = err => ({
  type: types.UPDATE_INFO_ERR,
  err
});
export const updateInfo = data => ({
  type: types.UPDATE_INFO,
  data
});
export const beforeUpdateInfo = data => {
  return dispatch => {
    return callApi
      .callApiUpdateInfo(data)
      .then(res => {
        dispatch(updateInfo(res.data));
      })
      .catch(err => {
        if (err.response.status === 401) window.location.assign('/login');
        else dispatch(updateInfoErr(err.response.data));
      });
  };
};
export const switchLoading = () => ({
  type: types.SWITCH_LOADING
});
export const setImageUrl = data => ({
  type: types.SET_IMAGE_URL,
  data
});
export const beforeSetImageUrl = imageUrl => {
  return dispatch => {
    return callApi
      .callApiUploadAvatar(imageUrl)
      .then(res => {
        dispatch(setImageUrl(res.data));
      })
      .catch(err => {
        if (err.response.status === 401) window.location.assign('/login');
      });
  };
};
export const setRequest = data => ({
  type: types.SET_REQUEST,
  data
});
export const switchLevel = () => ({
  type: types.SWITCH_LEVEL
});
