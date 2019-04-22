import React from 'react';
import PropTypes from 'prop-types';
import {Card, Button, Icon, Toast, List, WingBlank} from 'antd-mobile';
import '../index.less';
import {Layout} from "Comps/zui-mobile";
import DocumentTitle from "react-document-title";
import axios from "Utils/axios";
import restUrl from "RestUrl";

const Item = List.Item;
const Brief = Item.Brief;

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 'cd133890-5d95-11e9-a045-5328e803891c',
      data: {},
      travel: {},
      initLoading: false
    }
  }

  componentWillMount() {
    this.queryOrderDetail();
  }

  queryOrderDetail = id => {
    Toast.loading('Loading...');
    const param = {
      id: this.props.params.id
    }
    axios.get('travel/queryOrderDetail', {
      params: param
    }).then(res => res.data).then(data => {
      if (data.success) {
        if (data.backData) {
          const backData = data.backData;
          this.setState({
            data: backData,
            travel: backData.Travel
          });
        }
      } else {
        Toast.fail('查询详情失败');
      }
    }).finally(() => {
      Toast.hide()
    });
  }

  onTravelDetail = (id) => {

  }

  render() {
    const {data, travel} = this.state;
    return (
      <DocumentTitle title='订单详情'>
        <Layout className='travel-order-detail'>
          <Layout.Content>
            <List>
              <Item>
                <span style={{fontSize: '16px', color: '#000', paddingRight: '10px'}}>订单金额</span>
                <span style={{fontSize: '16px', color: '#FF0036'}}>{`￥${data.totalMoney}`}</span>
              </Item>
              <Item wrap>付款规则：线下付款，客服会和您取得联系</Item>
            </List>
            <Card className='detail-card am-card-full'>
              <Card.Header
                title='旅游项目'
                extra={
                  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    查看项目详情<Icon type="right" size='md'/>
                  </div>
                }
              />
              <Card.Body>
                <List>
                  <Item>
                    <div>报名团期 {data.signDate}</div>
                    <Brief>{travel.travelTheme}</Brief>
                  </Item>
                  <Item>
                    <div>
                      {travel.travelBeginTime + '至' + travel.travelEndTime}
                      <span style={{marginLeft: '10px'}}>{travel.travelLastTime}</span>
                    </div>
                    <Brief>包含元素 {travel.travelHas}</Brief>
                  </Item>
                </List>
                <div>
                  <Button
                    size='small'
                    style={{margin: '10px 15%', color: '#FF5745', backgroundColor: '#fff0ca'}}
                  >拨打咨询电话</Button>
                </div>
              </Card.Body>
            </Card>
            <Card className='detail-card am-card-full'>
              <Card.Header title='联系人员信息'/>
              <Card.Body>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </Card.Body>
            </Card>
            <Card className='detail-card am-card-full'>
              <Card.Header title='参与人员信息'/>
              <Card.Body>
                <div>ssss</div>
                <div>ssss</div>
              </Card.Body>
            </Card>
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
