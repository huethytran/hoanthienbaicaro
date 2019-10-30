import { types } from '../core/constants';

const initialState = {
  messages: []
};
export default function chat(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CHAT: {
      return {
        messages: [...state.messages, action.message]
      };
    }
    case types.REMOVE_CHAT: {
      return {
        messages: []
      };
    }

    default:
      return state;
  }
}
