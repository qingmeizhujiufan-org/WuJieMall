import React from 'react';
import PropTypes from 'prop-types';
import {Carousel, Flex, Toast} from 'antd-mobile';
import moment from 'moment';
import '../index.less';
import img from 'Img/IMG_1624.png'
import DocumentTitle from "react-document-title";
import axios from "Utils/axios";
import restUrl from "RestUrl";
import {Layout, BaseInfo, DatePicker, List, InputItem} from "Comps/zui-mobile";
import vipDiscount from 'Img/vip_discount.png';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formatBeginDate: '',
            formatEndDate: '',
            days: null,
            data: {},
            person: '',
            telephone: ''
        }
    };

    componentWillMount() {
        const {state} = this.props.location;
        const {beginDate, endDate, days, roomInfo} = state;
        this.setState({
            formatBeginDate: new moment(beginDate).format('YYYY年M月D日'),
            formatEndDate: new moment(endDate).format('YYYY年M月D日'),
            days: days,
            data: roomInfo
        });
    }

    componentDidMount() {
        this.queryDetail();
    }

    queryDetail = () => {
        this.setState({loading: true});
        const param = {
            id: this.props.params.id
        }
        axios.get('room/queryDetail', {
            params: param
        }).then(res => res.data).then(data => {
            if (data.success) {
                if (data.backData) {
                    const backData = data.backData;
                    const detailPic = backData.detailPic || [];

                    detailPic.map(item => {
                        item.imgSrc = restUrl.FILE_ASSET + `${item.id + item.fileType}`;
                    });

                    this.setState({
                        detailPicList: detailPic,
                        data: backData
                    });
                } else {
                    this.setState({
                        detailPicList: []
                    });
                }
            } else {
                message.error('查询列表失败');
            }
            this.setState({loading: false});
        });
    }

    signUp = () => {
        const data = this.state.data;
        const {state} = this.props.location;
        this.context.router.push({
            pathname: '/hotel/order/' + data.id,
            state
        });
    }

    render() {
        const {formatBeginDate, formatEndDate, days, data, person, telephone} = this.state;

        return (
            <DocumentTitle title='订单填写'>
                <Layout className="hotel-order" withFooter>
                    <Layout.Content>
                        <div className='hotel-order-card'>
                            <div className='card-container'>
                                <div className='room-name'>{data.roomName}</div>
                                <div className='stay-info'>
                                    <div>入住<span className='strong'>{formatBeginDate}</span><span
                                        className='strong'>{formatEndDate}</span><span
                                        className='strong'>共 {days} 天</span></div>
                                    <div
                                        className='room-info'>{`${data.breakfast} ${data.bedModel} ${data.window}`}</div>
                                </div>
                            </div>
                        </div>
                        <div className='sign-person-info'>
                            <List>
                                <InputItem
                                    placeholder={person ? person : '填写实际入住人姓名'}
                                    clear
                                >入住人</InputItem>
                                <InputItem
                                    placeholder={telephone ? telephone : '填写实际入住人手机号'}
                                    clear
                                >中国大陆+86</InputItem>
                            </List>
                            <List renderHeader='预定须知：本产品只适用于持中国身份证的居民预订'>
                                <List.Item extra='如需要发票，可向店家索取'>发票</List.Item>
                            </List>
                        </div>
                        <div className='notice'>
                            <div className='title'>入离时间</div>
                            <div className='content'>14:00后办理入住，早到店可能需要等待，如您在所选到店时间前无法抵店请联系民宿说明，否则民宿可能无法为您保留房间
                                次日12:00前办理退房，续住和行李寄存请咨询前台
                            </div>
                        </div>
                    </Layout.Content>
                    <Layout.Footer>
                        <Flex className='footer-btn-group'>
                            <div className='total-money'>¥ <span className='price'>{data.roomPrice}</span></div>
                            <div className='sign' onClick={this.signUp}>提交订单</div>
                        </Flex>
                    </Layout.Footer>
                </Layout>
            </DocumentTitle>
        );
    }
}

Index.contextTypes = {
    router: PropTypes.object
}

export default Index;
