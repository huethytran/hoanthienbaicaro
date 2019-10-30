import { connect } from 'react-redux';
import Home from '../components/Home';
import * as actions from '../actions/index';

const mapStateToProps = state => ({
  username: state.user.username,
  usertoken: state.user.usertoken
});
const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(actions.logOut());
    },
    getUser: () => {
      dispatch(actions.getUser());
    },
    callbackLink: cbl => {
      dispatch(actions.callbackLink(cbl));
    },
    switchIsSearching: data => {
      dispatch(actions.switchIsSearching(data));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
