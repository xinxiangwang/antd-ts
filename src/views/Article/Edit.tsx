import React, { Component, createRef, FormEvent, RefObject } from 'react'
import { Card, Button, Form, Input, DatePicker, Spin, message } from 'antd'
import E from 'wangeditor'
import './index.scss'
import { getArticle, editArticle } from '../../requests'
import moment from 'moment'

class ArticleEdit extends Component<any, any> {
  public editorRef: RefObject<HTMLDivElement>
  protected editor
  readonly formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
  }
  constructor (props: any, state: any) {
    super(props)
    this.editorRef = createRef()
    this.state = {
      isSpinning: false
    }
  }
  handleSubmit = (event: FormEvent<HTMLFormElement>):void => {
    event.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const data = Object.assign({}, values, {
          createTime: values.createTime.valueOf()
        })
        this.setState({
          isSpinning: true
        })
        editArticle(this.props.match.params.id, data).then((res) => {
          if (res.data.code === 200) {
            message.success('编辑成功')
            this.props.history.push('/admin/article')
          }
        }).finally(() => {
          this.setState({
            isSpinning: false
          })
        })
      }
    })
  }
  initEditor = ():void => {
    this.editor = new E(this.editorRef.current)
    this.editor.customConfig.onchange = (html: string):void => {
      this.props.form.setFieldsValue({
        content: html
      })
    }
    this.editor.create()
  }
  getArticle = () => {
    this.setState({
      isSpinning: true
    })
    getArticle(this.props.match.params.id).then((res) => {
      let data = res.data.data
      this.props.form.setFieldsValue({
        title: data.title,
        author: data.author,
        amount: data.amount,
        content: data.content,
        createTime: moment(data.createTime),
      })
      this.editor.txt.html(data.content,)
    }).finally(() => {
      this.setState({
        isSpinning: false
      })
    })
  }
  componentDidMount () {
    this.initEditor()
    this.getArticle()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Card
        style={{ textAlign: 'left' }}
        title="编辑文章"
        bordered={false}
        extra={<Button onClick={() => {this.props.history.push('/admin/article')}}>取消</Button>}>
        <Spin spinning={this.state.isSpinning}>
          <Form {...this.formItemLayout} onSubmit={this.handleSubmit}>

            <Form.Item label="标题">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                ],
              })(<Input placeholder="请输入标题" />)}
            </Form.Item>

            <Form.Item label="作者">
              {getFieldDecorator('author', {
                rules: [
                  {
                    required: true,
                    message: '请输入作者',
                  },
                ],
              })(<Input placeholder="请输入作者" />)}
            </Form.Item>

            <Form.Item label="阅读量">
              {getFieldDecorator('amount', {
                rules: [
                  {
                    required: true,
                    message: '请输入阅读量',
                  },
                ],
              })(<Input placeholder="请输入阅读量" />)}
            </Form.Item>

            <Form.Item label="发布时间">
              {getFieldDecorator('createTime', {
                rules: [
                  {
                    required: true,
                    message: '请输入发布时间',
                  },
                ],
              })(<DatePicker placeholder="请输入发布时间" />)}
            </Form.Item>

            <Form.Item label="内容">
              {getFieldDecorator('content', {
                rules: [
                  { required: true, message: '文章内容不能为空' }
                ]
              })(<div className="editContent" ref={this.editorRef}></div>)}
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
              <Button type="primary" htmlType="submit">编辑</Button>
            </Form.Item>

          </Form>
        </Spin>
      </Card>
    )
  }
}

const ArticleEditRule = Form.create({})(ArticleEdit)
export default ArticleEditRule