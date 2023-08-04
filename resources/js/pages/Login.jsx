import {Button, Checkbox, Form, Input} from "antd"
import {LockOutlined, UserOutlined} from "@ant-design/icons"
import {useNavigate} from "react-router-dom"
import {useEffect} from "react"
import Auth from "../features/authApi"

export const Login = () => {

  const userInfo = localStorage.getItem('user')
  const navigate = useNavigate()

  const onFinish = (values) => {
    Auth.login(values, (response)=>{
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
        navigate('/')
      } else {
        localStorage.clear()
      }
    }, (error)=>{
      console.log('AUTH ERROR', error)
      localStorage.clear()
    })
  }

  useEffect(() => {
    if (userInfo) navigate('/')
  }, [userInfo]);

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
      <Input prefix={<LockOutlined className='site-form-item-icon'/>} placeholder='Password' type="password"/>
    </Form.Item>
    <Form.Item name='remember' valuePropName="checked" noStyle>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>
    <Form.Item>
      <Button type='primary' htmlType='submit' className='login-form-button'>Log in</Button>
    </Form.Item>
  </Form>
}
