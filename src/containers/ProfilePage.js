import { connect } from 'react-redux';
import ProfilePage from '../components/ProfilePage';
import * as actions from '../actions/index';

const mapStateToProps = state => ({
  username: state.user.username,
  email: state.user.email,
  updateInfoErr: state.user.updateInfoErr,
  imageUrl: state.user.imageUrl,
  cbl: state.CallbackLink.callbackLink,
  numOfWordInPassword: state.user.numOfWordInPassword
});
const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(actions.getUser());
    },
    logout: () => {
      dispatch(actions.logOut());
    },
    updateInfo: data => {
      dispatch(actions.beforeUpdateInfo(data));
    },
    callbackLink: cbl => {
      dispatch(actions.callbackLink(cbl));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
