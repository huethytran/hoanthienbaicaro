import { types } from '../core/constants';

const initialState = {
  username: null,
  usertoken: null,
  loginErr: null,
  competitor: null,
  numOfWordInPassword: 0,
  isChangePassword: false,
  email: null,
  changePasswordErr: null,
  updateInfoErr: null,
  imageUrl: null
};
export default function user(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN: {
      return {
        ...state,
        username: action.user.username,
        usertoken: action.user.token,
        email: action.user.email,
        numOfWordInPassword: action.user.numOfWordInPassword,
        imageUrl: action.user.imageUrl
      };
    }
    case types.LOGIN_FB: {
      return {
        ...state,
        username: action.user.username,
        usertoken: action.user.token,
        email: action.user.email,
        imageUrl: action.user.imageUrl,
        numOfWordInPassword: 0
      };
    }
    case types.LOGIN_ERR: {
      return { ...state, loginErr: action.err };
    }
    case types.SET_COMPETITOR: {
      return { ...state, competitor: action.competitor };
    }
    case types.REMOVE_COMPETITOR: {
      return { ...state, competitor: null };
    }
    case types.LOGOUT: {
      return {
        username: null,
        usertoken: null,
        loginErr: null,
        competitor: null,
        numOfWordInPassword: 0,
        isChangePassword: false,
        changePasswordErr: null,
        updateInfoErr: null,
        email: null,
        imageUrl: null
      };
    }
    case types.CHANGE_PASSWORD: {
      return {
        ...state,
        numOfWordInPassword: action.numOfWordInPassword,
        changePasswordErr: null
      };
    }
    case types.SWITCH_IS_CHANGE_PASSWORD: {
      return {
        ...state,
        isChangePassword: !state.isChangePassword,
        changePasswordErr: null
      };
    }
    case types.CHANGE_PASSWORD_ERR: {
      return { ...state, changePasswordErr: action.err };
    }
    case types.UPDATE_INFO: {
      return {
        ...state,
        username: action.username,
        email: action.email,
        updateInfoErr: null
      };
    }
    case types.UPDATE_INFO_ERR: {
      return { ...state, updateInfoErr: action.err };
    }
    case types.SET_IMAGE_URL: {
      return { ...state, imageUrl: action.data };
    }
    default:
      return state;
  }
}
