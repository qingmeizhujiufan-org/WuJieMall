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

const TravelItem = ({className = '', data, ...restProps}) => (
    <div className={`${className} travel-item`} {...restProps}>
        <div className='travel-img'>
            <img src={`https://zos.alipayobjects.com/rmsportal/${data.url}.png`} alt=""/>
        </div>
        <div className='travel-body'>
            <div className='travel-name'>{data.name}</div>
            <div className='travel-date iconfont icon-calendar'>
                <span>{data.date}</span>
            </div>
        </div>
    </div>
);

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
            hotelData: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
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
    }

    componentDidMount() {
        this.queryTopSliderList();
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
                Message.error('查询列表失败');
            }
            this.setState({loading: false});
        });
    }

    queryGoodsDetail = (id) => {
        this.context.router.push(`/goods/detail/${id}`);
    }

    render() {
        const {topSliderList, foodData, travelData, hotelData} = this.state;

        return (
            <DocumentTitle title='无介商城'>
                <Layout className="home">
                    <Layout.Content>
                        <Carousel
                            autoplay
                            infinite
                        >
                            {topSliderList.map(item => (
                                <a
                                    key={item.id}
                                    href={item.productLink}
                                    style={{display: 'inline-block', width: '100%', height: '32.27vw'}}
                                >
                                    <img
                                        src={item.imgSrc}
                                        alt=""
                                        style={{width: '100%', height: '100%', verticalAlign: 'top'}}
                                    />
                                </a>
                            ))}
                        </Carousel>
                        <Flex className='classify-list'>
                            <Flex.Item className='classify-list-item'
                                       onClick={() => this.context.router.push(`/food/index`)}>
                                <div><img src={classify_1}/></div>
                                <span>特色食品</span>
                            </Flex.Item>
                            <Flex.Item className='classify-list-item'
                                       onClick={() => this.context.router.push(`/hotel/index`)}>
                                <div><img src={classify_2}/></div>
                                <span>特色住宿</span>
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
                                        <img src={classify_1} alt=""/>
                                    </div>
                                </div>
                                <div className='right'>
                                    <div onClick={() => this.context.router.push(`/food/detail/${foodData[1].id}`)}>
                                        <div className='food-name'>{foodData[1].name}</div>
                                        <div className='food-text'>{foodData[1].text}</div>
                                        <div className='food-img'>
                                            <img src={classify_1} alt=""/>
                                        </div>
                                    </div>
                                    <div onClick={() => this.context.router.push(`/food/detail/${foodData[2].id}`)}>
                                        <div className='food-name'>{foodData[2].name}</div>
                                        <div className='food-text'>{foodData[2].text}</div>
                                        <div className='food-img'>
                                            <img src={classify_1} alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='goods-category'>
                            <div className='goods-category-title'><i className='iconfont icon-teseminsu'></i></div>
                            <div className='goods-category-body'>
                                <Carousel className="space-carousel"
                                          frameOverflow="visible"
                                          dots={false}
                                          cellSpacing={10}
                                          slideWidth={0.8}
                                          infinite
                                >
                                    {hotelData.map((val) => (
                                        <a
                                            key={val}
                                            onClick={() => this.queryGoodsDetail(val)}
                                        >
                                            <img
                                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                                alt=""
                                                onLoad={() => {
                                                    // fire window resize event to change height
                                                    window.dispatchEvent(new Event('resize'));
                                                    this.setState({imgHeight: 'auto'});
                                                }}
                                            />
                                            <div>优美山水游</div>
                                        </a>
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
                                            <TravelItem key={index} data={item}/>
                                        )
                                    })
                                }
                            </div>
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
