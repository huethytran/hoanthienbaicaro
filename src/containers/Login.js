import { connect } from 'react-redux';
import Login from '../components/Login';
import * as actions from '../actions/index';

const mapStateToProps = state => ({
  username: state.user.username,
  usertoken: state.user.usertoken,
  err: state.user.err,
  callbackLink: state.CallbackLink.callbackLink
});
const mapDispatchToProps = dispatch => {
  return {
    login: user => {
      dispatch(actions.loginRequest(user));
    },
    getUser: () => {
      dispatch(actions.getUser());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
