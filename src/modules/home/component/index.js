import React from 'react';
import PropTypes from 'prop-types';
import {Flex, Carousel} from 'antd-mobile';
import {Layout} from 'Comps/zui-mobile';
import '../index.less';
import DocumentTitle from "react-document-title";
import axios from 'Utils/axios';
import restUrl from "RestUrl";

import classify_1 from 'Img/classify_1.png';
import classify_2 from 'Img/classify_2.png';
import classify_3 from 'Img/classify_3.png';

import demo_1 from 'Img/demo_1.png';
import demo_2 from 'Img/demo_2.png';
import demo_3 from 'Img/demo_3.png';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topSliderList: [],
            data: ['1', '2', '3'],
            foodData: [{
                id: '1',
                name: '红糖姜枣糕',
                text: '养生秘法',
                img: 'img1'
            }, {
                id: '2',
                name: '古法红糖',
                text: '优质红糖选古法',
                img: 'img1'
            }, {
                id: '3',
                name: '香辣食品',
                text: '好吃不贵',
                img: 'img1'
            }],
            goodsList: [],
            hotelData: [],
            travelData: []
        }
    };

    componentWillMount() {
    }

    componentDidMount() {
        if(!localStorage.userId) {
            const query = this.props.location.query;
            if (query) {
                const {code, state} = query;
                if (code && state === 'STATE') {
                    const params = {code};
                    axios.get('app/login', {params}).then(res => res.data).then(data => {
                        if(data.success) {
                            const userinfo = data.backData && data.backData[0];
                            localStorage.setItem('userId', userinfo.id);
                            localStorage.setItem('headimgurl', userinfo.headimgurl);
                        }
                    });
                }
            }
        }

        this.queryTopSliderList();
        /* 获取最新Top3 特色民宿 */
        this.queryHotelTop3();
        /* 获取最新Top3 主题旅游 */
        this.queryTravelTop3();
    }

    queryTopSliderList = () => {
        this.setState({loading: true});
        axios.get('app/queryTopSliderList').then(res => res.data).then(data => {
            if (data.success) {
                if (data.backData) {
                    const backData = data.backData;
                    backData.map(item => {
                        if (item.File) {
                            item.imgSrc = restUrl.FILE_ASSET + `${item.File.id + item.File.fileType}`;
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
            }
            this.setState({loading: false});
        });
    }

    queryHotelTop3 = () => {
        axios.get('hotel/queryListTop3').then(res => res.data).then(data => {
            if (data.success) {
                if (data.backData) {
                    const backData = data.backData.content || [];
                    backData.map(item => {
                        if (item.File) {
                            item.imgSrc = restUrl.FILE_ASSET + item.File.id + item.File.fileType;
                        }
                    });

                    this.setState({
                        hotelData: backData
                    });
                } else {
                    this.setState({
                        hotelData: []
                    });
                }
            } else {
            }
        });
    }

    queryTravelTop3 = () => {
        axios.get('travel/queryListTop3').then(res => res.data).then(data => {
            if (data.success) {
                if (data.backData) {
                    const backData = data.backData.content || [];
                    backData.map(item => {
                        if (item.File) {
                            item.imgSrc = restUrl.FILE_ASSET + item.File.id + item.File.fileType;
                        }
                    });

                    this.setState({
                        travelData: backData
                    });
                } else {
                    this.setState({
                        travelData: []
                    });
                }
            } else {
            }
        });
    }

    showHotel = id => {
        this.context.router.push(`/hotel/detail/${id}`);
    }

    showTravel = id => {
        this.context.router.push(`/travel/detail/${id}`);
    }

    userCenter = () => {
        this.context.router.push(`/personal`);
    }

    render() {
        const {topSliderList, foodData, travelData, hotelData} = this.state;

        return (
            <DocumentTitle title='无介商城'>
                <Layout className="home">
                    <Layout.Content>
                        {topSliderList.length > 0 ? (
                            <Carousel
                                className='carousel-list'
                                autoplay
                                infinite
                            >
                                {topSliderList.map(item => (
                                    <a
                                        key={item.id}
                                        href={item.foodLink}
                                        style={{display: 'inline-block', width: '100%', height: '2.42rem'}}
                                    >
                                        <img src={item.imgSrc}/>
                                    </a>
                                ))}
                            </Carousel>
                        ) : (
                            <div style={{height: '2.42rem'}}></div>
                        )}
                        <Flex className='classify-list'>
                            <Flex.Item className='classify-list-item'
                                       onClick={() => this.context.router.push(`/food/index`)}>
                                <div><img src={classify_1}/></div>
                                <span>特色食品</span>
                            </Flex.Item>
                            <Flex.Item className='classify-list-item'
                                       onClick={() => this.context.router.push(`/hotel/index`)}>
                                <div><img src={classify_2}/></div>
                                <span>特色民宿</span>
                            </Flex.Item>
                            <Flex.Item className='classify-list-item'
                                       onClick={() => this.context.router.push(`/travel/index`)}>
                                <div><img src={classify_3}/></div>
                                <span>主题旅游</span>
                            </Flex.Item>
                        </Flex>
                        <div className='goods-category'>
                            <div className='goods-category-title'><i className='iconfont icon-teseshipin'></i></div>
                            <div className='goods-category-body food-content'>
                                <div className='left'
                                     onClick={() => this.context.router.push(`/food/detail/${foodData[0].id}`)}>
                                    <div className='food-name'>{foodData[0].name}</div>
                                    <div className='food-text'>{foodData[0].text}</div>
                                    <div className='food-img'>
                                        <img src={demo_1} alt=""/>
                                    </div>
                                </div>
                                <div className='right'>
                                    <Flex
                                        direction='column'
                                        justify='center'
                                        align='start'
                                        onClick={() => this.context.router.push(`/food/detail/${foodData[1].id}`)}
                                    >
                                        <div className='food-name'>{foodData[1].name}</div>
                                        <div className='food-text'>{foodData[1].text}</div>
                                        <div className='food-img'>
                                            <img src={demo_3} alt=""/>
                                        </div>
                                    </Flex>
                                    <Flex
                                        direction='column'
                                        justify='center'
                                        align='start'
                                        onClick={() => this.context.router.push(`/food/detail/${foodData[2].id}`)}
                                    >
                                        <div className='food-name'>{foodData[2].name}</div>
                                        <div className='food-text'>{foodData[2].text}</div>
                                        <div className='food-img'>
                                            <img src={demo_2} alt=""/>
                                        </div>
                                    </Flex>
                                </div>
                            </div>
                        </div>
                        <div className='goods-category'>
                            <div className='goods-category-title'><i className='iconfont icon-teseminsu'></i></div>
                            <div className='goods-category-body'>
                                <Carousel className="hotel"
                                          frameOverflow="visible"
                                          dots={false}
                                          cellSpacing={10}
                                          slideWidth={.6667}
                                          infinite
                                >
                                    {hotelData.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => this.showHotel(item.id)}
                                        >
                                            <div className='hotel-img'>
                                                <img src={item.imgSrc} alt=""/>
                                            </div>
                                            <div className='hotel-name'>{item.hotelName}</div>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                        <div className='goods-category'>
                            <div className='goods-category-title'><i className='iconfont icon-zhutilvyou'></i></div>
                            <div className='goods-category-body travel-content'>
                                {
                                    travelData.map((item, index) => {
                                        return (
                                            <div key={index} className='travel-item'
                                                 onClick={() => this.showTravel(item.id)}>
                                                <div className='travel-img'>
                                                    <img src={item.imgSrc} alt=""/>
                                                </div>
                                                <div className='travel-body'>
                                                    <div className='travel-name'>{item.travelTheme}</div>
                                                    <div className='travel-date iconfont icon-calendar'>
                                                        <span><i
                                                            className='iconfont icon-kaishishijian'></i> {item.travelBeginTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='user-center' onClick={this.userCenter}>
                            <span className='iconfont icon-wode'></span>
                            <p>我的</p>
                        </div>
                    </Layout.Content>
                </Layout>
            </DocumentTitle>
        );
    }
}

Index.contextTypes = {
    router: PropTypes.object
}

export default Index;
