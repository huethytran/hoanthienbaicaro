import { types, players } from '../core/constants';

const initialState = {
  preStep: -1,
  squares: Array(400).fill(null),
  currentPlayer: players.X,
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
    case types.ADD_STEP: {
      return { ...state, squares: action.newArr, preStep: action.preStep };
    }
    case types.GO_TO_STEP: {
      return { ...state, squares: action.newArr };
    }
    case types.REPLAY: {
      return {
        ...state,
        squares: Array(400).fill(null),
        preStep: -1,
        currentPlayer: players.X
      };
    }
    case types.SET_WINNER: {
      return { ...state, winner: action.data };
    }
    default:
      return state;
  }
}
