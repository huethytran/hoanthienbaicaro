import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

class Home extends React.Component {
  render() {
    const { username, logout, getUser, callbackLink } = this.props;
    getUser();
    if (username == null)
      return (
        <div
          className="container-login100"
          style={{ backgroundColor: '#282c34' }}
        >
          <div style={{ display: 'block' }}>
            <p className="hometitle">Caro VN</p>
            <div className="btn">
              <Link to="/login">
                <Button
                  type="default"
                  size="large"
                  onClick={callbackLink('/')}
                  style={{ width: '100%' }}
                >
                  Login
                </Button>
              </Link>
              <br />
              <br />
              <Link to="/register">
                <Button
                  type="default"
                  size="large"
                  onClick={callbackLink('/')}
                  style={{ width: '100%' }}
                >
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      );

    return (
      <div
        className="container-login100"
        style={{ backgroundColor: '#282c34' }}
      >
        <div style={{ display: 'block' }}>
          <p className="hometitle">Caro VN</p>
          <p className="usernamehome">Hello, {username}!</p>
          <br />
          <div className="btn">
            <Link to="/game">
              {' '}
              <Button type="default" size="large" style={{ width: '100%' }}>
                Play Online
              </Button>
            </Link>
            <br />
            <br />
            <Button
              type="default"
              size="large"
              onClick={logout}
              style={{ width: '100%' }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
