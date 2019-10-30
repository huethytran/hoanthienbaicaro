import { types } from '../core/constants';

const initialState = {
  callbackLink: null
};
export default function CallbackLink(state = initialState, action) {
  switch (action.type) {
    case types.CALLBACKLINK: {
      return {
        ...state,
        callbackLink: action.cbl
      };
    }
    case types.LOGIN_ERR: {
      return { ...state, err: action.err };
    }
    default:
      return state;
  }
}
