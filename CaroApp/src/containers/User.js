import React from 'react';
import { connect } from 'react-redux';
import UserComponent from '../components/User';
import * as actions from '../actions/index';

class User extends React.Component {
  render() {
    const { onLogout, getUser, callbackLink, username } = this.props;
    return (
      <UserComponent
        onLogout={onLogout}
        getUser={getUser}
        callbackLink={callbackLink}
        username={username}
      />
    );
  }
}
const mapStateToProps = state => ({
  username: state.user.username,
  usertoken: state.user.usertoken,
  err: state.user.err
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
