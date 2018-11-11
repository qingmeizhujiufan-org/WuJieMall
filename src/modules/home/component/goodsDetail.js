import React from 'react';
import PropTypes from 'prop-types';
import {NavBar, Carousel, Modal, Icon} from 'antd-mobile';
import '../index.less';
import img1 from 'Img/1.jpg'
import img from 'Img/IMG_1624.png'


const GoodsCart = ({className = '', ...restProps}) => (
  <div className={`${className} goodsCart`} {...restProps}>
    <div className='goodsImg'>
      <img src={img1} alt=""/>
    </div>
    <div className='goodsBody'>
      <div className='goodsLabel'>太平鸟</div>
      <div className='goodsHeader'>
        太平鸟太平鸟太平鸟太平鸟太平鸟太平鸟太平鸟那幢冬季短款黑色羽绒服太平鸟那幢冬季短款黑色羽绒服
      </div>
      <div className='goodsContent'>
        <span className='saleLabel'>每400减50</span>
      </div>
      <div className='goodsFooter'>
        <div><span>￥</span><span>299</span></div>
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
      }
    }
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  detail = (id) => {
    this.context.router.push(`/frame/news/detail/${id}`);
  }

  render() {
    const {data, goodsDetail} = this.state;

    return (
      <div className="home">
        <div className='zui-scroll-wrapper'>
          <div className="zui-scroll">
            <Carousel
              autoplay
              infinite
            >
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
            <Modal
              popup
              visible={false}
              onClose={this.onClose}
              animationType="slide-up"
            >
              <div></div>
            </Modal>
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
