import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

export const Login = () => {

  const onFinish = (values) => {
    console.log('Success:', values);
  }

  return <Form
    name="login"
    className='login-form'
    initialValues={{remember: true}}
    onFinish={onFinish}
  >
    <Form.Item name='email' rules={[{required:true,message:'Please input your email!'}]}>
      <Input prefix={<UserOutlined className='site-form-item-icon'/>} placeholder='Email'/>
    </Form.Item>
    <Form.Item name='password' rules={[{required:true,message:'Please input your password!'}]}>
      <Input prefix={<LockOutlined className='site-form-item-icon'/>} placeholder='Password'/>
    </Form.Item>
    <Form.Item name='remember' valuePropName="checked" noStyle>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>
    <Form.Item>
      <Button type='primary' htmlType='submit' className='login-form-button'>Log in</Button>
    </Form.Item>
  </Form>
}
