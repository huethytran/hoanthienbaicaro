import { types, players } from '../core/constants';

const initialState = {
  preStep: -1,
  squares: Array(400).fill(null),
  currentPlayer: players.X,
  currentPlayerOnline: null,
  isRequestUndo: false,
  isRequestReplay: false,
  isSearching: false,
  isRequest: false,
  isEasyLevel: true,
  winner: { kq: null, type: 0, vt: 0 }
};
export default function game(state = initialState, action) {
  switch (action.type) {
    case types.INIT_BOARD: {
      return { ...state, squares: action.arrBoard };
    }
    case types.SWITCH_PLAYER: {
      return { ...state, currentPlayer: action.data };
    }
    case types.SWITCH_PLAYER_ONLINE: {
      return { ...state, currentPlayerOnline: action.data };
    }
    case types.ADD_STEP: {
      return { ...state, squares: action.newArr, preStep: action.preStep };
    }
    case types.GO_TO_STEP: {
      return { ...state, squares: action.newArr };
    }
    case types.REPLAY: {
      return {
        ...state,
        currentPlayerOnline: action.data,
        isRequestUndo: false,
        isRequestReplay: false,
        isSearching: false,
        squares: Array(400).fill(null),
        preStep: -1,
        currentPlayer: players.X,
        winner: { kq: null, type: 0, vt: 0 }
      };
    }
    case types.SET_WINNER: {
      return { ...state, winner: action.data };
    }
    case types.SET_REQUEST_UNDO: {
      return { ...state, isRequestUndo: action.data };
    }
    case types.SET_REQUEST_REPLAY: {
      return { ...state, isRequestReplay: action.data };
    }
    case types.SWITCH_IS_SEARCHING: {
      return { ...state, isSearching: action.data };
    }
    case types.SET_REQUEST: {
      return { ...state, isRequest: action.data };
    }
    case types.SWITCH_LEVEL: {
      return {
        ...state,
        squares: Array(400).fill(null),
        preStep: -1,
        currentPlayer: players.X,
        isEasyLevel: !state.isEasyLevel
      };
    }
    default:
      return state;
  }
}
