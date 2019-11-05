import React from 'react';
import {
  Form,
  Input,
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Avatar,
  Divider
} from 'antd';
import { withRouter, Link } from 'react-router-dom';
import AvatarContainer from '../containers/Avatar';
import ChangePassword from '../containers/ChangePassword';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class ProfilePage extends React.Component {
  componentDidUpdate() {
    const { username, email, numOfWordInPassword } = this.props;
    if (numOfWordInPassword !== 0) {
      if (
        username !== null &&
        document.getElementById('username').value === '' &&
        document.getElementById('email').value === ''
      ) {
        document.getElementById('username').value = username;
        document.getElementById('email').value = email;
      }
    }
  }

  logout = () => {
    const { logout } = this.props;
    console.log('helooooooo');
    logout();
    window.location.assign('/');
  };

  updateInfo = e => {
    e.preventDefault();
    const data = {
      username: document.getElementById('username').value,
      email: document.getElementById('email').value
    };
    if (data.username === null || data.email === null)
      document.getElementById('msg').innerHTML = 'Please fill in all fields';
    else {
      const { updateInfo } = this.props;
      updateInfo(data);
    }
  };

  render() {
    const {
      getUser,
      updateInfoErr,
      callbackLink,
      imageUrl,
      email,
      username,
      numOfWordInPassword
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (localStorage.getItem('usertoken') === null) {
      callbackLink('/profile');
      this.props.history.push('/login');
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 50 },
        sm: { span: 10 }
      },
      wrapperCol: {
        xs: { span: 50 },
        sm: { span: 20 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    getUser();
    if (numOfWordInPassword === 0 || numOfWordInPassword === undefined)
      return (
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <SubMenu
                title={
                  <span className="submenu-title-wrapper">
                    Play &nbsp;
                    <Icon type="down" />
                  </span>
                }
              >
                <Menu.Item key="play:1">
                  <Link to="/gameai">AI Mode</Link>
                </Menu.Item>
                <Menu.Item key="play:2">
                  <Link to="/game">Online Mode</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                style={{ float: 'right' }}
                title={
                  <span className="submenu-title-wrapper">
                    <Avatar size="large" icon="user" src={imageUrl} />
                    &nbsp;
                    <Icon type="down" />
                  </span>
                }
              >
                <Menu.Item key="user:1">
                  <a onClick={this.logout}>Log Out</a>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Profile</Breadcrumb.Item>
            </Breadcrumb>
            <Layout style={{ padding: '24px 50px', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <a href={imageUrl}>
                  <img className="avatar" src={imageUrl} alt="Avatar" />
                </a>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <p
                  id="msg"
                  style={{
                    fontWeight: 'bold',
                    color: 'red',
                    marginLeft: '42%'
                  }}
                >
                  {updateInfoErr}
                </p>
                <Form
                  {...formItemLayout}
                  onSubmit={this.updateInfo}
                  style={{ float: 'left', width: '60%' }}
                >
                  <Form.Item
                    label="Username"
                    style={{ display: 'flex', fontWeight: 'bold' }}
                  >
                    <p id="username" style={{ marginLeft: '40px' }}>
                      {username}
                    </p>
                  </Form.Item>
                  <Form.Item
                    label="E-mail"
                    style={{ display: 'flex', fontWeight: 'bold' }}
                  >
                    <p id="email" style={{ marginLeft: '40px' }}>
                      {email}
                    </p>
                  </Form.Item>
                </Form>
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      );
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  Play &nbsp;
                  <Icon type="down" />
                </span>
              }
            >
              <Menu.Item key="play:1">
                <Link to="/gameai">AI Mode</Link>
              </Menu.Item>
              <Menu.Item key="play:2">
                <Link to="/game">Online Mode</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              style={{ float: 'right' }}
              title={
                <span className="submenu-title-wrapper">
                  <Avatar size="large" icon="user" src={imageUrl} />
                  &nbsp;
                  <Icon type="down" />
                </span>
              }
            >
              <Menu.Item key="user:1">
                <a onClick={this.logout}>Log Out</a>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Profile</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: '24px 50px', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <AvatarContainer />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <p
                id="msg"
                style={{
                  fontWeight: 'bold',
                  color: 'red',
                  marginLeft: '42%'
                }}
              >
                {updateInfoErr}
              </p>
              <Form
                {...formItemLayout}
                onSubmit={this.updateInfo}
                style={{ float: 'left', width: '60%' }}
              >
                <Form.Item
                  label="Username"
                  style={{ display: 'flex', fontWeight: 'bold' }}
                >
                  {getFieldDecorator('username', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your username!'
                      }
                    ]
                  })(<Input id="username" style={{ marginLeft: '40px' }} />)}
                </Form.Item>
                <Form.Item
                  label="E-mail"
                  style={{ display: 'flex', fontWeight: 'bold' }}
                >
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!'
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!'
                      }
                    ]
                  })(<Input id="email" style={{ marginLeft: '40px' }} />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
              <Divider />
              <ChangePassword />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}
const ProfileForm = Form.create({})(ProfilePage);

export { ProfileForm };
export default withRouter(ProfileForm);
