import { types } from '../core/constants';

const initialState = {
  username: null,
  usertoken: null,
  err: 0
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
    default:
      return state;
  }
}
