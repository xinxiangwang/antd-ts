import React, { Component, createRef } from 'react'
import { Card, Row, Col } from 'antd'
import echarts from 'echarts'
import { pullArticleAmount } from '../../requests'
import './dashboard.scss'

export default class Dashboard extends Component<any, any> {
  private articleAmountDom: React.RefObject<HTMLDivElement>
  private articleChart: any
  constructor (props: any) {
    super(props)
    this.articleAmountDom = createRef()
  }
  initArticleChart = () => {
    let option = {}
    pullArticleAmount().then(ret => {
      option = {
        xAxis: {
            type: 'category',
            data: ret.data.data.amount.map(item => {
              return item.month
            })
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: ret.data.data.amount.map(item => {
              return item.value
            }),
            type: 'line'
        }]
      }
      console.log(option)
      this.articleChart = echarts.init(this.articleAmountDom.current)
      this.articleChart.setOption(option)
    })
    
  }
  componentDidMount () {
    this.initArticleChart()
  }
  render() {
    return (
      <>
        <Card
          style={{ textAlign: 'left' }}
          title="概览"
          bordered={false}>
          <Row gutter={16}>
            <Col span={6}>
              <div className="overview one"></div>
            </Col>
            <Col span={6}>
              <div className="overview two"></div>
            </Col>
            <Col span={6}>
              <div className="overview three"></div>
            </Col>
            <Col span={6}>
              <div className="overview four"></div>
            </Col>
          </Row>
        </Card>
        <Card
          style={{ textAlign: 'left' }}
          title="最近浏览量"
          bordered={false}>
          <div style={{ height: '400px' }} ref={this.articleAmountDom}></div>
        </Card>
      </>
    )
  }
}

