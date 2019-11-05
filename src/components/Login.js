import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import bg01 from '../image/bg01.jpg';
import { id } from '../core/constants';

class Login extends React.Component {
  loginRequest = e => {
    e.preventDefault();
    const { login } = this.props;
    login({
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    });
  };

  onFailure = error => {
    console.log(error);
  };

  googleResponse = response => {
    const { logingg } = this.props;
    if (response) {
      logingg({
        access_token: response.accessToken
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { username, loginErr, getUser, callbackLink, loginfb } = this.props;
    getUser();
    const responseFacebook = response => {
      if (response) {
        loginfb({
          access_token: response.accessToken
        });
      }
    };
    if (username) {
      if (callbackLink) return <Redirect to={callbackLink} />;
      return <Redirect to="/" />;
    }
    return (
      <div
        className="container-login100"
        style={{ backgroundImage: `url(${bg01})` }}
      >
        <div className="wrap-login100">
          <h1 className="login100-form-title">LOGIN</h1>
          <Form onSubmit={this.loginRequest} className="login100-form">
            <p style={{ color: '#fff' }}>{loginErr}</p>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                  id="username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                  id="password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox style={{ color: '#fff' }}>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <Link to="/register">register now!</Link>
            </Form.Item>
          </Form>
          <FacebookLogin
            appId={id.FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            cssClass="btnfb"
            icon="fa-facebook-square"
            callback={responseFacebook}
          />
          <GoogleLogin
            clientId={id.GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            className="btngg"
            onSuccess={this.googleResponse}
            onFailure={this.onFailure}
          />
        </div>
      </div>
    );
  }
}

const LoginForm = Form.create({})(Login);

export { LoginForm };
export default LoginForm;
