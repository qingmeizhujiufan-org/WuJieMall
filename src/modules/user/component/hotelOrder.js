import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Card,Button,Icon} from 'antd-mobile';
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
        userId: sessionStorage.userId,
        status: 0
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
        userId: sessionStorage.userId,
        status: tab.status
      }
    });
  }

  onDetail = (id) => {
    console.log(id);
    this.context.router.push(`/hotelOrder/detail/${id}`);
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
    const row = (rowData, sectionID, rowID) => {
      const obj = rowData;
      const hotel = obj.Hotel;
      const room  = obj.Room;
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
                <div>{hotel.hotelName}</div>
              </div>}
            // extra={<span>{obj.status === 0 ? '未出行' : '已结束'}</span>}
          />
          <Card.Body>
            <div className='card-body-title'>{room.roomName + "-" + room.breakfast}</div>
            <div className='card-body-middle'>
              <div>入住{obj.beginDate}</div>
              <div>离店{obj.endDate}</div>
              <div>{obj.days}晚</div>
            </div>
            <div className='card-body-footer'>价格：￥{obj.totalMoney}</div>
          </Card.Body>
          <Card.Footer
            content={'预定时间：' + obj.created_at}
            extra={
              <Button
                size='small'
                style={{float: 'right', color: '#888'}}
                onClick={() => this.handleClick(obj.id, obj.state )}
              >{obj.status === 0 || obj.status === 2? '删除订单' : '查看详情'}</Button>
            }/>
        </Card>
      );
    }

    return (
      <DocumentTitle title='民宿订单'>
        <Layout>
          <Layout.Content>
            <Tabs
              tabs={stateList}
              swipeable={false}
              onChange={this.tabChange}
              renderTabBar={props => <Tabs.DefaultTabBar {...props} page={6}/>}
            >
              <List
                pageUrl={'/hotel/queryOrderList'}
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
