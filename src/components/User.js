import React from 'react';
import { Button, Menu, Avatar, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';

class User extends React.Component {
  render() {
    const { getUser, username, callbackLink, onLogout, imageUrl } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>
          <a href="/profile">Change Profile</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={onLogout}>
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );
    getUser();
    if (username)
      return (
        <div className="divuser">
          <div style={{ display: 'flex' }}>
            <Button type="default" size="default">
              <a href="/">
                <Icon type="home" />
              </a>
            </Button>
            &nbsp; &nbsp;
            <p>Hi, {username}!</p>&nbsp;&nbsp;
            <Dropdown overlay={menu} placement="bottomRight">
              <div>
                {' '}
                <Avatar size="large" icon="user" src={imageUrl} />
                <Icon type="down" style={{ color: 'white' }} />
              </div>
            </Dropdown>
          </div>
        </div>
      );
    return (
      <div>
        <Link to="/login">
          <Button
            type="primary"
            size="small"
            onClick={callbackLink(window.location.pathname)}
          >
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button
            type="primary"
            size="small"
            onClick={callbackLink(window.location.pathname)}
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
