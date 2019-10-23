import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class User extends React.Component {
  render() {
    const { logout, getUser, username, callbackLink } = this.props;
    getUser();
    console.log(this.props);
    if (username)
      return (
        <div className="divuser">
          <p>Hi, {username}!</p>
          <Button type="danger" size="small" onClick={logout}>
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
