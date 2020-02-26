import React, { Component } from 'react'
import { Layout, Menu, Icon, Dropdown, Avatar, Badge } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './Frame.scss'
import { adminRouter } from '../../routes'
const { Header, Sider, Content } = Layout

interface ClickParam { // 从antd源码中拿的
  key: string;
  keyPath: Array<string>;
  item: any;
  domEvent: Event;
}

class Frame extends Component<RouteComponentProps, any> {
  state = {
    collapsed: false
  }
  toggle = ():void => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handleMenuChange = ({ key }:ClickParam):void => {
    this.props.history.push(key)
  }
  handlePerMenuClick = ({ key }:ClickParam):void => {
    this.props.history.push(key)
  }
  render() {
    const menu = (
      <Menu onClick={this.handlePerMenuClick}>
        <Menu.Item key={'/admin/notifications'}>
          <Badge dot={true}>
            通知中心
          </Badge>
        </Menu.Item>
        <Menu.Item key={'/admin/settings'}>
          个人设置
        </Menu.Item>
        <Menu.Item key={'/login'}>
          退出登录
        </Menu.Item>
      </Menu>
    )
    const selectedKeyArr = this.props.location.pathname.split('/')
    selectedKeyArr.length = 3
    console.log(this.props)
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo"><div/></div>
          <Menu theme="light"
            onClick={this.handleMenuChange}
            mode="inline"
            selectedKeys={[selectedKeyArr.join('/')]}>
            {
              adminRouter.map((item, index) => {
                return item.isNav ? (
                  <Menu.Item key={item.pathname}>
                    <Icon type="user"></Icon>
                    <span>{item.label}</span>
                  </Menu.Item>
                ) : false
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon className="trigger" onClick={this.toggle} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}></Icon>
            <Dropdown overlay={menu} className="personal">
            
              <div style={{display: 'flex', alignItems: 'center'}}>
                
                <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />&emsp;欢迎回来！王新翔
                <Icon type="down" />
                <Badge count={25} offset={[-30, -30]}/>
              </div>
            </Dropdown>
          </Header>
          <Content style={{margin: '24px 16px', background: '#fff', minHeight: 280}}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(Frame)
