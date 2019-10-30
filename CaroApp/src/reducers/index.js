import { combineReducers } from 'redux';
import game from './Game';
import history from './History';
import user from './User';
import CallbackLink from './CallbackLink';
import chat from './Chat';

const rootReducer = combineReducers({
  game,
  history,
  user,
  CallbackLink,
  chat
});
export default rootReducer;
