import React from 'react';
import PropTypes from 'prop-types';
import {NavBar, Carousel, List, Icon} from 'antd-mobile';
import '../index.less';
import img1 from 'Img/1.jpg'
import img from 'Img/IMG_1624.png'
import DocumentTitle from "react-document-title";
import axios from "Utils/axios";
import restUrl from "RestUrl";

const Item = List.Item;

const GoodsItem = ({className = '', data, ...restProps}) => (
  <div className={`${className} goods-item`} {...restProps}>
    <div className='goods-item-img'>
      <img src={`https://zos.alipayobjects.com/rmsportal/${data.url}.png`} alt=""/>
    </div>
    <div className='goods-item-name'>{data.name}</div>
  </div>
);

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: '',
      loading: false,
      detailData: {

      },
      data: ['1', '2', '3'],
      goodsDetail: {
        id: '11',
        name: '太平鸟那幢冬季短款黑色羽绒服',
        isTop: true,
        number: 222,
        price: 222,
        comments: 22,
      },
      travelData: [{
        url: 'AiyWuByWklrrUDlFignR',
        date: '2018-01-25',
        name: '武汉金秋游'
      }, {
        url: 'AiyWuByWklrrUDlFignR',
        date: '2018-01-25',
        name: '武汉金秋游'
      }, {
        url: 'AiyWuByWklrrUDlFignR',
        date: '2018-01-25',
        name: '武汉金秋游'
      }]
    }
  };

  componentWillMount() {
    this.state.productId = this.props.params.id
    this.queryDetail();
  }

  componentDidMount() {
  }

  queryDetail = () => {
    this.setState({loading: true});
    axios.get('app/queryTopSliderList').then(res => res.data).then(data => {
      if (data.success) {
        if (data.backData) {
          const backData = data.backData;
          backData.map(item => {
            if (item.File) {
              item.imgSrc = restUrl.ADDR + '/public/' + `${item.File.id + item.File.fileType}`;
            }
          });

          this.setState({
            topSliderList: backData
          });
        } else {
          this.setState({
            topSliderList: []
          });
        }
      } else {
        Message.error('查询列表失败');
      }
      this.setState({loading: false});
    });
  }

  render() {
    const {data, goodsDetail, travelData} = this.state;

    return (
      <DocumentTitle title='食品介绍'>
        <div id="goodsDetail">
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
                {goodsDetail.isTop ? <div className='is-top'>精品</div> : null}
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
              <div className='goods-vip'>
                
              </div>
            </div>
            <div className="goods-comments">
              <List className="my-list">
                <Item arrow="horizontal" multipleLine onClick={() => {
                }}>
                  商品评价&nbsp;
                  <span style={{color: 'red', fontSize: '14px'}}>{goodsDetail.comments}</span>
                </Item>
              </List>
            </div>
            <div className="goods-store">
              <div className='goods-store-header'>
                <div className='goods-store-logo'>
                  <img src={img1} alt=""/>
                </div>
                <div className='goods-store-info'>
                  <div>安徽商铺</div>
                  <div>sdsd</div>
                </div>
                <div className='goods-store-into'onClick={()=> this.context.router.push(`/shop/detail/${id}`)}>
                  进入店铺
                </div>
              </div>
              <div className='goods-store-body'>
                {
                  travelData.map((item, index) => {
                    return (
                      <GoodsItem key={index} data={item}/>
                    )
                  })
                }
              </div>
            </div>
            <div className="goods-info">
              <List renderHeader={() => '食品基本信息'} className="goods-info-list">
                <Item extra={'extra content'}>生产日期</Item>
                <Item extra={'extra content'}>生产许可证编号</Item>
                <Item extra={'extra content'}>厂址</Item>
                <Item extra={'extra content'}>产地省份</Item>
                <Item extra={'extra content'}>保质期</Item>
                <Item extra={'extra content'}>净含量</Item>
                <Item extra={'extra content'}>成分及配料</Item>
              </List>
              <div className='goods-info-pic'>

              </div>
            </div>
          </div>
          <div className='footer'>
            <div className='service'>客服</div>
            <div className='add'>加入购物车</div>
            <div className='buy'>立即购买</div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

Index.contextTypes = {
  router: PropTypes.object
}

export default Index;
