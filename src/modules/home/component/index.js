import React from 'react';
import PropTypes from 'prop-types';
import {NavBar, Carousel, Grid, Icon} from 'antd-mobile';
import '../index.less';
import img1 from 'Img/1.jpg'


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

const girdData = Array.from(new Array(10)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ['1', '2', '3'],
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
        <NavBar
          mode="light"
          rightContent={[
            <Icon key="0" type="search" style={{marginRight: '16px'}}/>,
            <Icon key="1" type="ellipsis"/>,
          ]}
        >商城首页</NavBar>
        <div className='zui-scroll-wrapper'>
          <div className="zui-scroll">
            <Carousel
              autoplay
              infinite
            >
              {data.map(val => (
                <a
                  key={val}
                  href="http://www.alipay.com"
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
            <Grid data={girdData} hasLine={false} columnNum={5}/>
            <div className="sub-title">精品推荐</div>
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
      </div>
    );
  }
}

Index.contextTypes = {
  router: PropTypes.object
}

export default Index;
