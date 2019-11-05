import React from 'react';
import { Form, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }

  componentDidUpdate() {
    const { numOfWordInPassword, isChangePassword } = this.props;
    if (numOfWordInPassword !== 0 && isChangePassword === false) {
      document.getElementById(
        'fakepassword'
      ).innerHTML = this.createFakePassword();
    }
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newpassword')) {
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

  createFakePassword = () => {
    const { numOfWordInPassword } = this.props;
    let arr = '';
    for (let i = 0; i < numOfWordInPassword; i++) {
      arr += '•';
    }
    return arr;
  };

  changePassword = e => {
    e.preventDefault();
    console.log('password', document.getElementById('oldpassword').value);
    const data = {
      password: document.getElementById('oldpassword').value,
      newpassword: document.getElementById('newpassword').value
    };

    const { changePassword } = this.props;
    changePassword(data);
  };

  render() {
    const {
      isChangePassword,
      switchIsChangePassword,
      changePasswordErr,
      numOfWordInPassword
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (numOfWordInPassword !== 0 && isChangePassword === false) {
      setTimeout(
        () =>
          (document.getElementById(
            'fakepassword'
          ).innerHTML = this.createFakePassword()),
        500
      );
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
    if (isChangePassword === false)
      return (
        <div>
          <Form {...formItemLayout} style={{ float: 'left', width: '60%' }}>
            <Form.Item
              label="Password"
              style={{ display: 'flex', fontWeight: 'bold' }}
            >
              {getFieldDecorator('password', {
                rules: []
              })(
                <div>
                  <p id="fakepassword" style={{ marginLeft: '40px' }} />
                  <Button type="primary" onClick={switchIsChangePassword}>
                    Change Password
                  </Button>
                </div>
              )}
            </Form.Item>
          </Form>
        </div>
      );
    return (
      <div>
        <Form
          {...formItemLayout}
          onSubmit={this.changePassword}
          style={{ float: 'left', width: '60%' }}
        >
          <Form.Item
            label="Password"
            hasFeedback
            style={{ display: 'flex', fontWeight: 'bold' }}
          >
            {getFieldDecorator('oldpassword', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]
            })(
              <Input.Password id="oldpassword" style={{ marginLeft: '40px' }} />
            )}
          </Form.Item>
          <Form.Item
            label="New Password"
            hasFeedback
            style={{ display: 'flex', fontWeight: 'bold' }}
          >
            {getFieldDecorator('newpassword', {
              rules: [
                {
                  required: true,
                  message: 'Please input your new password!'
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(
              <Input.Password id="newpassword" style={{ marginLeft: '40px' }} />
            )}
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            hasFeedback
            style={{ display: 'flex', fontWeight: 'bold' }}
          >
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your new password!'
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input.Password
                onBlur={this.handleConfirmBlur}
                style={{ marginLeft: '40px' }}
              />
            )}
          </Form.Item>
          <p style={{ fontWeight: 'bold', color: 'red', marginLeft: '42%' }}>
            {changePasswordErr}
          </p>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: '40px' }}
            >
              Save Changes
            </Button>
            <Button style={{ marginLeft: 50 }} onClick={switchIsChangePassword}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const ChangePasswordForm = Form.create({})(ChangePassword);

export { ChangePasswordForm };
export default withRouter(ChangePasswordForm);
