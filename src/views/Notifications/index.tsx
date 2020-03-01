import React, { Component } from 'react'
import { Card, Button, List, Avatar, Badge, Spin } from 'antd'
import { connect } from '../../common'
// import { MapDispatchToPropsParam, connect as ConnectRedux } from 'react-redux'
import { Message } from '../../reducers/notifications'
import { NotificationReaded, AllReaded } from '../../actions/notifications'

// function connect<TDispatchProps = {}, TOwnProps = any>(
//   mapStateToProps?: ( ownProps?: TOwnProps) => any,
//   mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
// ): any {
//   return ConnectRedux(mapStateToProps, mapDispatchToProps);
// }

interface IProps {
  list: Array<Message>,
  NotificationReaded: any,
  AllReaded: any,
  isLoading: boolean
}

const mapState = state => {
  const { list, isLoading } = state.notifications
  return {
    list,
    isLoading
  }
}

@connect(mapState, { NotificationReaded, AllReaded })
class index extends Component<IProps> {
  render() {
    return (
      <Spin spinning={this.props.isLoading}>
        <Card title="通知中心" bordered={false} extra={
          <Button disabled={this.props.list.every(item => item.isRead)} onClick={this.props.AllReaded}>全部标记为已读</Button>
        }></Card>
        <List
          itemLayout="horizontal"
          dataSource={this.props.list}
          style={{padding: '0 30px'}}
          renderItem={item => (
            <List.Item
              extra={item.isRead ? '' : <Button onClick={this.props.NotificationReaded.bind(this, item.id)}>标记为已读</Button>}>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<Badge offset={[6, 3]} dot={!item.isRead}><a href="https://ant.design">{item.title}</a></Badge>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"/>
            </List.Item>
          )}
        />,
      </Spin>
    )
  }
}
export default connect()(index)
