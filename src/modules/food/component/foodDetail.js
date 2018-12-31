import React from 'react';
import PropTypes from 'prop-types';
import {NavBar, Carousel, List, Icon} from 'antd-mobile';
import '../index.less';
import img1 from 'Img/1.jpg'
import img from 'Img/IMG_1624.png'

const Item = List.Item;

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ['1', '2', '3'],
      goodsDetail: {
        id:'11',
        name: '太平鸟那幢冬季短款黑色羽绒服',
        isTop: true,
        number: 222,
        price: 222,
        comments: 22,
      }
    }
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    const {data, goodsDetail} = this.state;

    return (
      <div id="goodsDetail">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          rightContent={[
            <Icon key="0" type="ellipsis"/>
          ]}
        >特色食品</NavBar>
        <div className="zui-content">
          <Carousel infinite>
            {data.map(val => (
              <a
                key={val}
                style={{display: 'inline-block', width: '100%', height: '60vw'}}
              >
                <img
                  src={img1}
                  alt=""
                  style={{width: '100%', height: '100%', verticalAlign: 'top'}}
                />
              </a>
            ))}
          </Carousel>
          <div className="goods-detail">
            <div className='goods-header'>
              {goodsDetail.isTop ? <div className='is-top'>精品</div>: null}
              {goodsDetail.name}
            </div>
            <div className='goods-subscribe'>
              <div className='goods-price'><span>￥</span><span>{goodsDetail.price}</span></div>
              <div className='goods-number'>
                {
                  goodsDetail.number ? (
                    <div><span>【现货】</span><span>&nbsp;&nbsp;&nbsp;</span><span>库存{goodsDetail.number}件</span></div>
                  ) : (
                    缺货
                  )
                }
              </div>
            </div>
          </div>
          <div className="goods-comments">
            <List className="my-list">
              <Item arrow="horizontal" multipleLine onClick={() => {}}>
                商品评价&nbsp;{goodsDetail.comments}
              </Item>
            </List>
          </div>
          <div className="goods-store">

          </div>
          <div className="goods-subscribe">
            
          </div>
        </div>
        <div className='footer'>
          <div className='service'>客服</div>
          <div className='add'>加入购物车</div>
          <div className='buy'>立即购买</div>
        </div>
      </div>
    );
  }
}

Index.contextTypes = {
  router: PropTypes.object
}

export default Index;
