import React, { Component, FormEvent } from 'react'
import { Form, Icon, Input, Button, Checkbox, Card, Spin } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { UserLogin } from '../../actions/user'
import { connect } from '../../common'
import { Redirect } from 'react-router'

interface Iprops extends FormComponentProps {
  isLoading: boolean
  UserLogin: any
  name: string
  isLogin: false
}
const mapState = (state) => {
  const { isLoading, name, isLogin } = state.user
  return {
    isLoading,
    name,
    isLogin
  }
}

@connect(mapState, { UserLogin })
class LoginForm extends Component<Iprops> {
  public handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.UserLogin(values)
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      this.props.isLogin ? <Redirect to="/admin/dashboard"/> :
      <Card title="欢迎登录" className='login-wrapper'>
        <Spin spinning={this.props.isLoading}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="账号"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox style={{float: 'right'}}>记住密码</Checkbox>)}

            </Form.Item>
          </Form>
        </Spin>
      </Card>
    )
  }
}

const Login = Form.create({})(LoginForm)
export default Login
