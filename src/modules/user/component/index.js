import React from 'react';
import PropTypes from 'prop-types';
import {List,NavBar,Icon} from 'antd-mobile';
import '../index.less';
import img from 'Img/2.jpg'
import userImg from 'Img/IMG_1624.png'

const Item = List.Item;

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        isPayed: 1,
        isDoned: 2,
        toPayed: 1
      }
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    const {data} = this.state;

    return (
      <div className="home">
        <NavBar
          mode="light"
          rightContent={[
            <Icon key="0" type="search" style={{marginRight: '16px'}}/>,
            <Icon key="1" type="ellipsis"/>,
          ]}
        >人人中心</NavBar>
        <div className="zui-content">
          <div id="userCenter">
            <div className='img-area'>
              <img src={img} alt=""/>
            </div>
            <div className='main-area'>
              <div className='user-area'>
                <div className='user-info'>
                  <div className='user-img'>
                    <img src={userImg} alt=""/>
                  </div>
                  <div className='user-detail'>
                    <div className='user-name'>王玮</div>
                    <div className='user-address'>湖北·武汉</div>
                  </div>
                </div>
                <div className='order-list'>
                  <div className='order-item'>
                    <div className='order-number'>1</div>
                    <div className='order-label'>待支付</div>
                  </div>
                  <div className='order-item'>
                    <div className='order-number'>1</div>
                    <div className='order-label'>已支付</div>
                  </div>
                  <div className='order-item'>
                    <div className='order-number'>1</div>
                    <div className='order-label'>已完成</div>
                  </div>
                </div>
              </div>
              <div className='info-area'>
                <List className='info-list'>
                  <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    arrow="horizontal"
                    onClick={() => {
                    }}
                  >个人信息</Item>
                  <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    arrow="horizontal"
                    onClick={() => {
                    }}
                  >我的预约订单</Item>
                  <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                    onClick={() => {
                    }}
                    arrow="horizontal"
                  >
                    我的地址
                  </Item>
                </List>
              </div>
              <div className='info-area'>
                <List className='info-list'>
                  <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    arrow="horizontal"
                    onClick={() => {
                    }}
                  >联系客服</Item>
                  <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                    onClick={() => {
                    }}
                    arrow="horizontal"
                  >
                    关于我们
                  </Item>
                </List>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Index
  .contextTypes = {
  router: PropTypes.object
}

export default Index;
