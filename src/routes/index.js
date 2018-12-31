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

/* 旅游首页详情 */
const Travel = Loadable({
  loader: () => import('../modules/travel/component/index'),
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
    <Route path="hotel/index" component={Hotel}/>
    <Route path="travel/index" component={Travel}/>

  </Route>
);
