import { types } from '../core/constants';

const initialState = {
  loading: false
};
export default function avatar(state = initialState, action) {
  switch (action.type) {
    case types.SWITCH_LOADING: {
      return {
        loading: !state.loading
      };
    }

    default:
      return state;
  }
}
