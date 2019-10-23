import React from 'react';
import ReCAPTCHA from 'react-grecaptcha';
import { Form, Input, Button, Modal } from 'antd';
import * as callApi from '../utils/apiCaller';
import bg01 from '../image/bg01.jpg';

const callback = function() {};
const expiredCallback = function() {};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: []
    };
  }

  registerRequest = e => {
    e.preventDefault();
    const user = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      email: document.getElementById('email').value
    };
    if (user.username && user.password && user.email) {
      return callApi
        .callApiRegister(user)
        .then(() => {
          this.success();
          this.props.history.push('/login');
        })
        .catch(err => {
          document.getElementById('msg').innerHTML = err.response.data.error;
        });
    }
    document.getElementById('msg').innerHTML = 'Please fill in all fields';
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  success() {
    Modal.success({
      title: 'Create Account Success',
      content: 'Press OK to login'
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 }
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

    return (
      <div
        className="container-login100"
        style={{ backgroundImage: `url(${bg01})` }}
      >
        <Modal
          title="Notification"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <div className="wrap-register100">
          <h1 className="login100-form-title">REGISTER</h1>
          <div className="register100-form">
            <Form {...formItemLayout} onSubmit={this.registerRequest}>
              <p id="msg" style={{ color: 'red' }} />
              <Form.Item label="Username">
                {getFieldDecorator('username', {
                  rules: [
                    { required: true, message: 'Please input your username!' }
                  ]
                })(<Input id="username" />)}
              </Form.Item>
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!'
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input.Password id="password" />)}
              </Form.Item>
              <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!'
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
              </Form.Item>
              <Form.Item label="E-mail">
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
                })(<Input id="email" />)}
              </Form.Item>
              <Form.Item
                label="Captcha"
                extra="We must make sure that your are a human."
              >
                <ReCAPTCHA
                  sitekey="6LcU2L4UAAAAAIxHuVU88xc5gc7aPrwgXCjHP7yn"
                  callback={callback}
                  expiredCallback={expiredCallback}
                  locale="en"
                />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
const RegisterForm = Form.create({})(Register);

export { RegisterForm };
export default RegisterForm;
