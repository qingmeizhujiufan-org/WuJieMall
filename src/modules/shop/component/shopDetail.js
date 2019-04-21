import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Tabs, Toast} from 'antd-mobile';
import {SearchBar} from 'Comps/zui-mobile';
import '../index.less';
import restUrl from "RestUrl";
import DocumentTitle from "react-document-title";
import axios from "Utils/axios";
import assign from 'lodash/assign';

import {CardList} from 'Comps';

const GoodsCart = ({className = '', data, ...restProps}) => (
  <div className={`${className} goodsCart`} {...restProps}>
    <div className='goodsImg'>
      <img src={data.File ? (restUrl.FILE_ASSET + data.File.id + data.File.fileType) : ''} alt=""/>
    </div>
    <div className='goodsBody'>
      <div className='goodsHeader'>
        {data.isTop ? <div className='isTop'>精品</div> : null}
        {data.foodName}
      </div>
      <div className='goodsContent'>
        <div className='goodsLabel'>【{data.shopName}】</div>
        <div className='goodsAddress'>{data.shopAddress}</div>
      </div>
      <div className='goodsFooter'>
        <div><span>￥</span><span style={{fontSize: 15}}>{data.foodSellingprice}</span></div>
      </div>
    </div>
  </div>
);

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      params: {
        id: this.props.params.id,
        pageNumber: 1,
        pageSize: 10,
      },
      keyWords: '',
      shopDetail: {},
      goodsList: []
    }
  };

  componentDidMount() {
    this.queryShopDetail();
  }

  queryShopDetail = () => {
    const param = {
      id: this.props.params.id
    };
    axios.get('shop/queryDetail', {
      params: param
    }).then(res => res.data).then(data => {
      if (data.success) {
        if (data.backData) {
          let backData = data.backData;
          let shopPic = backData.shopPic;
          shopPic.map(item => {
            item.imgSrc = restUrl.FILE_ASSET + `${item.id + item.fileType}`;
          });
          backData.shopPic = shopPic[0];
          this.setState({
            shopDetail: backData
          });
        }
      }
    });
  }

  detail = (id) => {
    this.context.router.push(`/food/detail/${id}`);
  }

  render() {
    const {params, shopDetail} = this.state;
    const row = (rowData, sectionID, rowID) => {
      const obj = rowData;

      return (
        <div key={rowID} style={{float: 'left', width: '50%'}}>
          <GoodsCart key={obj.id} data={obj} onClick={() => this.detail(obj.id)}/>
        </div>
      );
    }

    return (
      <DocumentTitle title='商品小铺'>
        <div className="shop">
          <div className="zui-content">
            <SearchBar placeholder="请输入要搜索的商铺" maxLength={16}/>
            <div className="goods-store">
              <div className='goods-store-header'>
                <div className='goods-store-logo'>
                  {
                    shopDetail.shopPic && shopDetail.shopPic.imgSrc ?
                      (
                        <img
                          src={shopDetail.shopPic && shopDetail.shopPic.imgSrc}
                          alt=""/>
                      ) : (
                        shopDetail.shopName && shopDetail.shopName.slice(0, 2)
                      )
                  }
                </div>
                <div className='goods-store-info'>
                  {shopDetail.shopName}
                </div>
                <div className='goods-store-into'>
                  收藏店铺
                </div>
              </div>
              <div className='goods-store-body'>
                {shopDetail.mark}
              </div>
            </div>
            <CardList
              pageUrl={'food/queryListByShopId'}
              params={params}
              row={row}
            />
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
