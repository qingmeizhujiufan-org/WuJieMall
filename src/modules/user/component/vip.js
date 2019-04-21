import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from 'antd-mobile';
import '../index.less';
import img from 'Img/2.jpg';
import userImg from 'Img/IMG_1624.png';
import vipBadge from 'Img/VIP_badge.png';
import {Layout} from "Comps/zui-mobile";
import DocumentTitle from "react-document-title";

const alert = Modal.alert;

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

    becomeVip = () => {
        alert('积分开通VIP', '您将用3000积分兑换开通VIP会员', [
            {text: '取消', onPress: () => console.log('cancel')},
            {text: '确定', onPress: () => console.log('ok')},
        ])
    }

    render() {
        const {data} = this.state;

        return (
            <DocumentTitle title='VIP兑换'>
                <div id="goodsDetail">
                    <Layout>
                        <Layout.Content>
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
                                                <div className='is-vip'><img src={vipBadge}/> VIP</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='info-area'>
                                        <div className='vip-rule'>
                                            <div className='vip-rule-title'>积分兑换VIP原则：</div>
                                            <div
                                                className='vip-rule-desc'>1、积分积累原则：用户在购买特产食品后的金额会积累为用户的消费积分（一元积累为一个积分，例如：36元的消费即为36分）
                                            </div>
                                            <br/>
                                            <div className='vip-rule-desc'>2、积分兑换VIP会员：积累3000分的用户可以使用积分兑换VIP会员</div>
                                            <br/>
                                            <div className='vip-rule-title'>VIP所享福利：</div>
                                            <div className='vip-rule-desc'>1、VIP用户购买特产食品可以享受所有商品9折优惠</div>
                                            <div className='vip-rule-desc'>2、VIP用户预定特色民宿可以享9折优惠</div>
                                            <br/>
                                            <div className='vip-rule-title'>VIP会员服务协议：</div>
                                            <div className='vip-rule-desc'>会员服务的最终解释权归新华资产有限公司所有</div>
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
