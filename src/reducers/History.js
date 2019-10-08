import { types, sort } from '../core/constants';

const initialState = {
  numOfStep: 0,
  backStep: 0,
  history: [{ player: null, step: 0 }],
  sortHistory: sort.Asc
};
export default function history(state = initialState, action) {
  switch (action.type) {
    case types.ADD_HISTORY: {
      return {
        ...state,
        history: action.history,
        numOfStep: action.numOfStep,
        backStep: action.backStep
      };
    }
    case types.GO_TO_STEP: {
      return { ...state, backStep: action.step };
    }
    case types.REPLAY: {
      return {
        ...state,
        history: [{ player: null, step: 0 }],
        numOfStep: 0,
        backStep: 0
      };
    }
    case types.SWITCH_SORT: {
      return { ...state, sortHistory: action.data };
    }
    default:
      return state;
  }
}
