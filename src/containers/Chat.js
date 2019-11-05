import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Chat from '../components/Chat';

const mapStateToProps = state => ({
  messages: state.chat.messages,
  competitor: state.user.competitor,
  imageUrl: state.user.imageUrl
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
