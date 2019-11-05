import { combineReducers } from 'redux';
import game from './Game';
import history from './History';
import user from './User';
import CallbackLink from './CallbackLink';
import chat from './Chat';
import avatar from './Avatar';

const rootReducer = combineReducers({
  game,
  history,
  user,
  CallbackLink,
  chat,
  avatar
});
export default rootReducer;
