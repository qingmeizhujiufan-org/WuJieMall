import React from 'react';
import PropTypes from 'prop-types';
import {NavBar, Carousel, Modal, Icon} from 'antd-mobile';
import '../index.less';
import img1 from 'Img/1.jpg'
import img from 'Img/IMG_1624.png'

const GoodsCart = ({className = '', data, ...restProps}) => (
  <div className={`${className} goodsCart`} {...restProps}>
    <div className='goodsImg'>
      <img src={img1} alt=""/>
    </div>
    <div className='goodsBody'>
      <div className='goodsLabel'>{data.name}</div>
      <div className='goodsHeader'>{data.title}</div>
      <div className='goodsContent'>
        <span className='saleLabel'>{data.sale}</span>
      </div>
      <div className='goodsFooter'>
        <div><span>￥</span><span>{data.price}</span></div>
        <div>找相似</div>
      </div>
    </div>
  </div>
);


class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ['1', '2', '3'],
      goodsDetail: {
        id: 1,
        name: '太平鸟',
        title: '太平鸟那幢冬季短款黑色羽绒服',
        price: 300,
        sale: '每400减50'
      },
      goodsList: [
        {
          id: 1,
          name: '太平鸟',
          title: '太平鸟那幢冬季短款黑色羽绒服',
          price: 200,
          sale: '每400减50'
        },
        {
          id: 2,
          name: '太平鸟',
          title: '太平鸟那幢冬季短款黑色羽绒服',
          price: 300,
          sale: '每400减50'
        },
        {
          id: 3,
          name: '太平鸟',
          title: '太平鸟那幢冬季短款黑色羽绒服',
          price: 400,
          sale: '每400减50'
        },
        {
          id: 4,
          name: '太平鸟',
          title: '太平鸟那幢冬季短款黑色羽绒服',
          price: 500,
          sale: '每400减50'
        }]
    }
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  detail = (id) => {
    this.context.router.push(`/goods/detail/${id}`);
  }

  render() {
    const {data, goodsList} = this.state;

    return (
      <div className="home">
        <div className='zui-scroll-wrapper' style={{bottom: '50px'}}>
          <div className="zui-scroll" >
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
            <div className="goods-detail"></div>
            <div className="goods-comments"></div>
            <Modal
              popup
              visible={false}
              onClose={this.onClose}
              animationType="slide-up"
            >
              <div></div>
            </Modal>
            <div className="sub-title">猜你喜欢</div>
            <div className='goodsWrap'>
              {
                goodsList.map(item => {
                  return (
                    <GoodsCart key={item.id} data={item} onClick={() => this.detail(item.id)}/>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className='footer'>
          <div className='footer-btn'>
            <div className='btn-img'><img src={img} alt=""/></div>
            <div className='btn-label'>客服</div>
          </div>
          <div className='footer-btn'>
            <div className='btn-img'><img src={img} alt=""/></div>
            <div className='btn-label'>店铺</div>
          </div>
          <div className='footer-btn'>
            <div className='btn-img'><img src={img} alt=""/></div>
            <div className='btn-label'>收藏</div>
          </div>
          <div className='add'>
            加入购物车
          </div>
          <div className='buy'>
            立即购买
          </div>
        </div>
      </div>
    );
  }
}

Index.contextTypes = {
  router: PropTypes.object
}

export default Index;
