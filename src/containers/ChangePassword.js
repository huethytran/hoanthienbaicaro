import { connect } from 'react-redux';
import ChangePassword from '../components/ChangePassword';
import * as actions from '../actions/index';

const mapStateToProps = state => ({
  numOfWordInPassword: state.user.numOfWordInPassword,
  isChangePassword: state.user.isChangePassword,
  changePasswordErr: state.user.changePasswordErr
});
const mapDispatchToProps = dispatch => {
  return {
    switchIsChangePassword: () => {
      dispatch(actions.switchIsChangePassword());
    },
    changePassword: data => {
      dispatch(actions.beforeChangePassword(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
