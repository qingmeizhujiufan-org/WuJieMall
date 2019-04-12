import React from 'react';
import PropTypes from 'prop-types';
import {List, NavBar, Icon} from 'antd-mobile';
import '../index.less';
import img from 'Img/2.jpg';
import userImg from 'Img/IMG_1624.png';
import vipBadge from 'Img/VIP_badge.png';
import {Layout} from "Comps/zui-mobile";
import DocumentTitle from "react-document-title";

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

    viewVIP = () => {
        this.context.router.push('vip');
    }

    render() {
        const {data} = this.state;

        return (
            <DocumentTitle title='个人中心'>
                <div id="goodsDetail">
                    <Layout>
                        <Layout.Content>
                            <div className="zui-content">
                                <div id="userCenter">
                                    <div className='img-area'></div>
                                    <div className='main-area'>
                                        <div className='user-area'>
                                            <div className='user-info'>
                                                <div className='user-img'>
                                                    <img src={userImg} alt=""/>
                                                </div>
                                                <div className='user-detail'>
                                                    <div className='user-name'>丽龙利</div>
                                                    <div className='user-points'>我的积分 {360}</div>
                                                    {
                                                        1 ? (<div className='is-vip'><img src={vipBadge}/> VIP</div>) : (<div className='common-user'>VIP尚未开通</div>)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className='vip' onClick={this.viewVIP}>
                                        </div>
                                        <div className='info-area'>
                                            <List className='info-list'>
                                                <Item
                                                    thumb={<span className='iconfont icon-gouwuche1'></span>}
                                                    arrow="horizontal"
                                                    extra={0}
                                                    onClick={() => {
                                                }}
                                                >购物车</Item>
                                                <Item
                                                    thumb={<span className='iconfont icon-gerenzhongxin-shangpindingdan'></span>}
                                                    arrow="horizontal"
                                                    onClick={() => {
                                                    }}
                                                >商品订单</Item>
                                                <Item
                                                    thumb={<span className='iconfont icon-fangjianxinxi'></span>}
                                                    arrow="horizontal"
                                                    onClick={() => {
                                                    }}
                                                >民宿订单</Item>
                                                <Item
                                                    thumb={<span className='iconfont icon-gerenzhongxin-lvyoudingdan'></span>}
                                                    onClick={() => {
                                                    }}
                                                    arrow="horizontal"
                                                >旅游订单</Item>
                                            </List>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Layout.Content>
                    </Layout>
                </div>
            </DocumentTitle>
        );
    }
}

Index.contextTypes = {
    router: PropTypes.object
}

export default Index;
