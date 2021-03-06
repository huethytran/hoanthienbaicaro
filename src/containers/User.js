import { connect } from 'react-redux';
import User from '../components/User';
import * as actions from '../actions/index';

const mapStateToProps = state => ({
  username: state.user.username,
  usertoken: state.user.usertoken,
  err: state.user.err,
  imageUrl: state.user.imageUrl
});
const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(actions.getUser());
    },
    callbackLink: cbl => {
      dispatch(actions.callbackLink(cbl));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
