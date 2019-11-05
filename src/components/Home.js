import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import FacebookLogin from 'react-facebook-login';

class Home extends React.Component {
  handleProfileClick = () => {
    const { callbackLink } = this.props;
    window.location.assign('/profile');
    callbackLink('/');
  };

  render() {
    FacebookLogin.callback = response => {
      console.log(response);
    };
    const {
      username,
      logout,
      getUser,
      callbackLink,
      switchIsSearching
    } = this.props;
    getUser();
    if (username === null)
      return (
        <div
          className="container-login100"
          style={{ backgroundColor: '#282c34' }}
        >
          <div style={{ display: 'block' }}>
            <p className="hometitle">Caro VN</p>
            <div className="btn">
              <Link to="/gameai">
                <Button type="default" size="large" style={{ width: '100%' }}>
                  Play With AI
                </Button>
              </Link>
              <br />
              <br />
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
            <Link to="/gameai">
              <Button type="default" size="large" style={{ width: '100%' }}>
                Play With AI
              </Button>
            </Link>
            <br />
            <br />
            <Link to="/game">
              <Button
                type="default"
                size="large"
                style={{ width: '100%' }}
                onClick={switchIsSearching(true)}
              >
                Play Online
              </Button>
            </Link>
            <br />
            <br />
            <Button
              type="default"
              size="large"
              style={{ width: '100%' }}
              onClick={this.handleProfileClick}
            >
              Profile
            </Button>
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
