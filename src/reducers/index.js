import { combineReducers } from 'redux';
import game from './Game';
import history from './History';
import user from './User';
import CallbackLink from './CallbackLink';

const rootReducer = combineReducers({
  game,
  history,
  user,
  CallbackLink
});
export default rootReducer;
