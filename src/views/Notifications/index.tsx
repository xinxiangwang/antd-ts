import React, { Component } from 'react'
import { Card, Button, List, Avatar, Badge } from 'antd'
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
export default class index extends Component {
  render() {
    return (
      <>
        <Card title="通知中心" bordered={false} extra={<Button>全部标记为已读</Button>}></Card>
        <List
          itemLayout="horizontal"
          dataSource={data}
          style={{padding: '0 30px'}}
          renderItem={item => (
            <List.Item
              extra={<Button>标记为已读</Button>}>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<Badge offset={[6, 3]} dot={true}><a href="https://ant.design">{item.title}</a></Badge>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"/>
            </List.Item>
          )}
        />,
      </>
    )
  }
}
