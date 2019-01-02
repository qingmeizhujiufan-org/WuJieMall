import React from 'react';
import PropTypes from 'prop-types';
import {NavBar, Carousel, Tabs, Icon, SearchBar} from 'antd-mobile';
import '../index.less';
import img1 from 'Img/1.jpg'
import img from 'Img/IMG_1624.png'

const GoodsCart = ({className = '', data, ...restProps}) => (
  <div className={`${className} goodsCart`} {...restProps}>
    <div className='goodsImg'>
      <img src={img1} alt=""/>
    </div>
    <div className='goodsBody'>
      <div className='goodsHeader'>
        {data.isTop ? <div className='isTop'>精品</div>: null}
      {data.title}
      </div>
      <div className='goodsContent'>
        <div className='goodsLabel'>【{data.name}】</div>
        <div className='goodsAddress'>{data.address}</div>
      </div>
      <div className='goodsFooter'>
        <div><span>￥</span><span>{data.price}</span></div>
      </div>
    </div>
  </div>
);


class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ['1', '2', '3'],
      category: [
        {
          title: '全部',
          id: 1,
          goodsList: [
            {
              id: 1,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 200,
              isTop: true
            },
            {
              id: 2,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 300,
              isTop: false
            },
            {
              id: 3,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 400,
              isTop: true
            },
            {
              id: 4,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 500,
              isTop: false
            }]
        }, {
          title: '酒水',
          id: 2,
          goodsList: [
            {
              id: 1,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 200,
              isTop: true
            },
            {
              id: 2,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 300,
              isTop: false
            },
            {
              id: 3,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 400,
              isTop: true
            },
            {
              id: 4,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 500,
              isTop: false
            }]
        },
        {
          title: '肉干零嘴',
          id: 3,
          goodsList: [
            {
              id: 1,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 200,
              isTop: true
            },
            {
              id: 2,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 300,
              isTop: false
            },
            {
              id: 3,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 400,
              isTop: true
            },
            {
              id: 4,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 500,
              isTop: false
            },{
              id: 5,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 400,
              isTop: true
            },
            {
              id: 6,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 500,
              isTop: false
            }]
        },
        {
          title: '特色糕点',
          id: 4,
          goodsList: [
            {
              id: 1,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 200,
              isTop: true
            },
            {
              id: 2,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 300,
              isTop: false
            },
            {
              id: 3,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 400,
              isTop: true
            },
            {
              id: 4,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 500,
              isTop: false
            }]
        },
        {
          title: '特色主食',
          id: 5,
          goodsList: [
            {
              id: 1,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 200,
              isTop: true
            },
            {
              id: 2,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 300,
              isTop: false
            },
            {
              id: 3,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 400,
              isTop: true
            },
            {
              id: 4,
              name: '太平鸟',
              title: '太平鸟那幢冬季短款黑色羽绒服',
              address: '杭州',
              price: 500,
              isTop: false
            }]
        }
      ],
    }
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  detail = (id) => {
    this.context.router.push(`/food/detail/${id}`);
  }

  renderContent = tab =>
    (<div className='tab-body'>
      {
        tab.goodsList.map(item => {
          return (
            <GoodsCart key={item.id} data={item} onClick={() => this.detail(item.id)}/>
          )
        })
      }
    </div>);

  render() {
    const {goodsList, category} = this.state;

    return (
      <div className="food">
        <div className="zui-content">
          <SearchBar placeholder="请输入要搜索的商品" maxLength={16}/>
          <Tabs
            tabs={category}
            swipeable={true}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={6}/>}>
            {this.renderContent}
          </Tabs>
        </div>
      </div>
    );
  }
}

Index.contextTypes = {
  router: PropTypes.object
}

export default Index;
