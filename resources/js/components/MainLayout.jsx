import {Outlet, useNavigate} from "react-router-dom"
import {useGetUserDetailsQuery} from "../services/authService"
import React,{useEffect, useState} from "react"
import {Button, Layout, Select, Space} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import Auth from "../features/authApi";


export const MainLayout = () => {
  const userInfo = localStorage.getItem('user')
  const navigate = useNavigate()
  const {Header, Sider, Content} = Layout

  const { data, isFetching, isError, error } = useGetUserDetailsQuery('userDetails',{
    pollingInterval: 100000
  })

  if (!userInfo) navigate('/login')

  const [collapsed, setCollapsed] = useState(false)
  const handleLogout = () => {
    Auth.logout((response)=>{
      if (response.status === 200) {
        localStorage.clear()
        navigate('/login')
      }
    }, (error)=>{
      console.log('AUTH ERROR', error)
    })
  }

  const changeLang = (value) => {

  }

  useEffect(() => {
    if (data) {
      localStorage.setItem('user', JSON.stringify(data.user))
    }
    if (isError) localStorage.clear()
  }, [data, isError]);

  return <Layout>
    <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
    >

    </Sider>
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{padding: 0}}>
        {
          React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )
        }
        <div className="header-buttons">
          <Space>
            <Button type="primary" onClick={handleLogout}>Logout</Button>
            <Select defaultValue="ro" onChange={changeLang}>
              <Select.Option value="ro">RO</Select.Option>
              <Select.Option value="en">EN</Select.Option>
              <Select.Option value="ru">RU</Select.Option>
            </Select>
          </Space>
        </div>
      </Header>
      <Content>
        <Outlet/>
      </Content>
    </Layout>
  </Layout>
}
