import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Card, Button, Icon} from 'antd-mobile';
import '../index.less';
import {Layout} from "Comps/zui-mobile";
import DocumentTitle from "react-document-title";
import {List} from 'Comps';

const stateList = [{
  title: '待确认',
  status: 0
}, {
  title: '已确认',
  status: 2
}, {
  title: '已结束',
  status: 3
}, {
  title: '已取消',
  status: 1
}];

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {
        pageNumber: 1,
        pageSize: 10,
        userId: 'cd133890-5d95-11e9-a045-5328e803891c',
        state: 0
      },
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  tabChange = (tab) => {
    this.setState({
      params: {
        pageNumber: 1,
        pageSize: 10,
        userId: 'cd133890-5d95-11e9-a045-5328e803891c',
        state: tab.status
      }
    });
  }

  onDetail = (id) => {
    console.log(id);
    this.context.router.push(`/travelOrder/detail/${id}`);
  }

  onDelete = (id) => {
    console.log(id);
  }


  handleClick = (id, flag) => {
    console.log(id, flag);
    if (flag === 0) {
      this.onDelete(id);
    } else {
      this.onDetail(id)
    }
  }

  render() {
    const {params} = this.state;
    // const stateList = ['待出行', '已'];
    const row = (rowData, sectionID, rowID) => {
      const obj = rowData;
      const travel = obj.Travel;
      return (
        <Card
          key={rowID}
          className='am-card-full order-card'
          style={{padding: '10px 0', width: '100vw'}}
          onClick={() => this.onDetail(obj.id)}
        >
          <Card.Header
            title={
              <div className='card-head-title'>
                <Icon type='check-circle'/>
                <div>{travel.travelTheme}</div>
              </div>}
            // extra={<span>{obj.state === 0 ? '未出行' : '已结束'}</span>}
          />
          <Card.Body>
            <div className='card-body-title'>{travel.travelTheme}</div>
            <div className='card-body-middle'>
              <div>出发{travel.travelBeginTime}</div>
              <div>返回{travel.travelEndTime}</div>
              <div>{travel.travelLastTime}</div>
            </div>
            <div className='card-body-desc'>包含：{travel.travelHas}</div>
            <div className='card-body-footer'>价格：￥{travel.manPrice}</div>
          </Card.Body>
          <Card.Footer
            content={'预定时间：' + obj.created_at}
            extra={
              <Button
                size='small'
                style={{float: 'right', color: '#888'}}
                onClick={() => this.handleClick(obj.id, obj.state )}
              >{obj.state === 0 || obj.state === 2 ? '删除订单' : '查看详情'}</Button>
            }/>
        </Card>
      );
    }

    return (
      <DocumentTitle title='旅游订单'>
        <Layout>
          <Layout.Content>
            <Tabs
              tabs={stateList}
              swipeable={false}
              onChange={this.tabChange}
              renderTabBar={props => <Tabs.DefaultTabBar {...props} page={6}/>}
            >
              <List
                pageUrl={'travel/queryOrderList'}
                params={params}
                row={row}
              />
            </Tabs>
          </Layout.Content>
        </Layout>
      </DocumentTitle>
    );
  }
}

Index.contextTypes = {
  router: PropTypes.object
}

export default Index;
