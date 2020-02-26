import React, { Component } from 'react'
import { Card, Button, List, Avatar, Badge } from 'antd'
import { MapDispatchToPropsParam, connect as ConnectRedux } from 'react-redux'
import { Message } from '../../reducers/notifications'

function connect<TDispatchProps = {}, TOwnProps = any>(
  mapStateToProps?: ( ownProps?: TOwnProps) => any,
  mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>
): any {
  return ConnectRedux(mapStateToProps, mapDispatchToProps);
}

interface IProps {
  list: Array<Message>
}

const mapState = state => {
  const { list } = state.notifications
  return {
    list
  }
}

@connect(mapState)
class index extends Component<IProps> {
  render() {
    return (
      <>
        <Card title="通知中心" bordered={false} extra={<Button disabled={this.props.list.every(item => item.isRead)}>全部标记为已读</Button>}></Card>
        <List
          itemLayout="horizontal"
          dataSource={this.props.list}
          style={{padding: '0 30px'}}
          renderItem={item => (
            <List.Item
              extra={item.isRead ? '' : <Button>标记为已读</Button>}>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<Badge offset={[6, 3]} dot={!item.isRead}><a href="https://ant.design">{item.title}</a></Badge>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"/>
            </List.Item>
          )}
        />,
      </>
    )
  }
}
export default connect()(index)
