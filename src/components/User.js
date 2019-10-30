import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class User extends React.Component {
  render() {
    const { getUser, username, callbackLink, onLogout } = this.props;
    console.log('prop của user compo', this.props);
    getUser();
    if (username)
      return (
        <div className="divuser">
          <p>Hi, {username}!</p>
          <Button type="danger" size="small" onClick={onLogout}>
            Logout
          </Button>
        </div>
      );
    return (
      <div>
        <Link to="/login">
          <Button type="primary" size="small" onClick={callbackLink('/game')}>
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button
            type="primary"
            size="small"
            onClick={callbackLink('/game')}
            style={{ marginLeft: '20px', marginBottom: '20px' }}
          >
            Register
          </Button>
        </Link>
      </div>
    );
  }
}

export default User;
