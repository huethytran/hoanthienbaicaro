import { types } from '../core/constants';

const initialState = {
  username: null,
  usertoken: null,
  err: 0,
  competitor: null
};
export default function user(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN: {
      return {
        ...state,
        username: action.user.username,
        usertoken: action.user.token
      };
    }
    case types.LOGIN_ERR: {
      return { ...state, err: action.err };
    }
    case types.SET_COMPETITOR: {
      return { ...state, competitor: action.competitor };
    }
    case types.REMOVE_COMPETITOR: {
      return { ...state, competitor: null };
    }
    case types.LOGOUT: {
      return { username: null, usertoken: null, err: 0, competitor: null };
    }
    default:
      return state;
  }
}
