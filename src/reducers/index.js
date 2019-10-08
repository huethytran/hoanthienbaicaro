import { combineReducers } from 'redux';
import game from './Game';
import history from './History';

const rootReducer = combineReducers({
  game,
  history
});
export default rootReducer;
