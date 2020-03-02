import React, { Component } from 'react'
import { Layout, Menu, Icon, Dropdown, Avatar, Badge } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './Frame.scss'
import { adminRouter } from '../../routes'
import { connect } from '../../common'
// import { MapDispatchToPropsParam, connect as ConnectRedux } from 'react-redux'
import { Message } from '../../reducers/notifications'
import { setNotificationList } from '../../actions/notifications'
import { userLogout } from '../../actions/user'
const { Header, Sider, Content } = Layout

// function connect<TDispatchProps = {}, TOwnProps = any>(
//   mapStateToProps?: ( ownProps?: TOwnProps) => any,
//   mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
// ): any {
//   return ConnectRedux(mapStateToProps, mapDispatchToProps);
// }

interface IProps extends RouteComponentProps {
  notificationCount?: string
  setNotificationList?: any,
  avatar?: string,
  name?: string,
  userLogout?: any
}

interface ClickParam { // 从antd源码中拿的
  key: string;
  keyPath: Array<string>;
  item: any;
  domEvent: Event;
}

const mapState = state => {
  return {
    notificationCount: state.notifications.list.filter((item: Message) => !item.isRead).length,
    avatar: state.user.avatar,
    name: state.user.name
  }
}

@connect(mapState, { setNotificationList, userLogout })
class Frame extends Component<IProps> {
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
    if (key === '/login') {
      this.props.userLogout()
    } else {
      this.props.history.push(key)
    }
  }
  componentDidMount () {
    this.props.setNotificationList()
  }
  render() {
    const menu = (
      <Menu onClick={this.handlePerMenuClick}>
        <Menu.Item key={'/admin/notifications'}>
          <Badge dot={Boolean(this.props.notificationCount)}>
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
                
                <Avatar src={this.props.avatar}/>&emsp;欢迎回来！{this.props.name}
                <Icon type="down" />
                <Badge count={this.props.notificationCount} offset={[-30, -30]}/>
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
