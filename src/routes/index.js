/*
 *  create by zhongzheng in 2018/11/11.
 */

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {Icon} from 'antd-mobile';
import Loadable from 'react-loadable';

function Loading(props) {
  if (props.error) {
    return <div>错误! <button onClick={props.retry}>点击重试</button></div>;
  } else if (props.timedOut) {
    return <div>已经超时加载... <button onClick={props.retry}>点击重试</button></div>;
  } else if (props.pastDelay) {
    return (
      <div style={{
        padding: '30px 0',
        textAlign: 'center'
      }}><Icon type='loading'/></div>
    );
  } else {
    return null;
  }
}

const App = Loadable({
  loader: () => import('../modules/App'),
  loading: Loading
});

/* 首页 */
const Index = Loadable({
  loader: () => import('../modules/home/component/index'),
  loading: Loading
});

/* 食品首页详情 */
const Food = Loadable({
  loader: () => import('../modules/food/component/index'),
  loading: Loading
})
const FoodDetail = Loadable({
  loader: () => import('../modules/food/component/foodDetail'),
  loading: Loading
})

/* 住宿首页详情 */
const Hotel = Loadable({
  loader: () => import('../modules/hotel/component/index'),
  loading: Loading
})
/* 住宿商品详情 */
const HotelDetail = Loadable({
  loader: () => import('../modules/hotel/component/hotelDetail'),
  loading: Loading
})


/* 旅游首页详情 */
const Travel = Loadable({
  loader: () => import('../modules/travel/component/index'),
  loading: Loading
})
/* 旅游商品详情 */
const TravelDetail = Loadable({
  loader: () => import('../modules/travel/component/travelDetail'),
  loading: Loading
})

/* 店铺详情 */
const ShopDetail = Loadable({
  loader: () => import('../modules/shop/component/shopDetail'),
  loading: Loading
})

/* 添加订单 */
const OrderAdd = Loadable({
  loader: () => import('../modules/order/component/orderAdd'),
  loading: Loading
})

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Index}/>
    <Route path="food" component={App}>
      <IndexRoute component={Food}/>
      <Route path="index" component={Food}/>
      <Route path="detail/:id" component={FoodDetail}/>
    </Route>
    <Route path="hotel" component={App}>
      <IndexRoute component={Hotel}/>
      <Route path="index" component={Hotel}/>
      <Route path="detail/:id" component={HotelDetail}/>
    </Route>
    <Route path="travel" component={App}>
      <IndexRoute component={Travel}/>
      <Route path="index" component={Travel}/>
      <Route path="detail/:id" component={TravelDetail}/>
    </Route>
    <Route path="shop" component={App}>
      <IndexRoute component={ShopDetail}/>
      <Route path="detail/:id" component={ShopDetail}/>
    </Route>
    <Route path="order" component={App}>
      <IndexRoute component={OrderAdd}/>
      <Route path="add/:id" component={OrderAdd}/>
    </Route>
  </Route>
);
