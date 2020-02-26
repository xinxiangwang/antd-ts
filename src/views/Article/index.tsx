import React, { Component } from 'react'
import { Card, Table, Tag, Button, Modal, message } from 'antd'
import { getArticleList, deleteArticle } from '../../requests/index'
import moment from 'moment'
import XLSX from 'xlsx'
const { confirm } = Modal
export default class ArticleList extends Component<any, any> {
  private tableTitle = {
    id: '编号',
    title: '标题',
    author: '作者',
    amount: '数量',
    createTime: '创建时间'
  }
  constructor (props: any) {
    super(props)
    this.state = {
      dataSource: [],
      columns: [],
      tableLoading: false,
      total: ''
    }
  }
  getTableData = async () => {
    this.setState({
      tableLoading: true
    })
    let ret = await getArticleList()
    let columnsKeys = Object.keys(ret.data.data.list[0])

    let columns = columnsKeys.map(item => {
      if (item === 'amount')
        return {
          title: this.tableTitle[item],
          key: item,
          render: (text: any, record: any) => {
            return <Tag color={record.amount > 100 ? 'red' : 'lime'}>{record.amount}</Tag>
          } 
      }
      if (item === 'createTime')
        return {
          title: this.tableTitle[item],
          key: item,
          render: (text: any, record: any) => {
            return moment(record.createTime).format('YYYY-MM-DD hh-mm')
          } 
      }
      return {
        title: this.tableTitle[item],
        dataIndex: item,
        key: item
      }
    })

    columns.push({
      title: '操作',
      key: 'btn',
      render: (record) =>
        <Button.Group>
          <Button type="primary" size="small" onClick={() => this.toEdit(record)}>编辑</Button>
          <Button type="danger" size="small" onClick={() => this.delArticle(record)}>删除</Button>
        </Button.Group>
    })
    this.setState({
      dataSource: ret.data.data.list,
      columns,
      total: ret.data.data.total
    })
    this.setState({
      tableLoading: false
    })
  }
  delArticle = (record: object) => {
    confirm({
      centered: true,
      title: '友情提示',
      content: (
        <div>
          <p>确定删除：</p>
          <p>{record['title']}&nbsp;&nbsp;吗</p>
        </div>
      ),
      async onOk () {
        let a = await deleteArticle(record['id'])
        if (a.data.code === 200) {
          message.success('删除成功')
        } else {
          message.success('删除失败')
        }
      }
    })
  }
  toEdit = (record: object) => {
    console.log(this.props)
    this.props.history.push({
      pathname: `/admin/article/edit/${record['id']}`,
      state: {
        title: record['title']
      }
    })
  }
  toExcel = () => {
    let head:Array<string> = []
    this.state.columns.forEach((item: any): void => {
      if (item.key !== 'btn') {
        head.push(item.key)
      }
    })
    console.log(head)
    let body: any[] = []
    for (let i = 0; i < this.state.dataSource.length; i++) {
      const element = this.state.dataSource[i]
      body.push([
        element.id,
        element.title,
        element.author,
        element.amount,
        moment(element.createTime).format('YYYY-MM-DD hh-mm')
      ])
    }

    const ws = XLSX.utils.aoa_to_sheet([head, ...body])
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'sheetjs')
    XLSX.writeFile(wb, 'asdasd.xlsx')
  }
  componentDidMount () {
    this.getTableData()
  }
  
  render() {
    return (
      <Card title="文章标题" bordered={false} style={{ textAlign: 'left' }} extra={<Button onClick={this.toExcel}>导出EXCEL</Button>}>
        <Table
          dataSource={this.state.dataSource}
          loading={this.state.tableLoading}
          columns={this.state.columns}
          pagination={{
            total: this.state.total,
            onChange: () => {

            }
          }}
          rowKey="id"/>
      </Card>
    )
  }
}
