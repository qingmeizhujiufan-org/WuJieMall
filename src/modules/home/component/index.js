import React from 'react';
import PropTypes from 'prop-types';
import {Carousel, Grid} from 'antd-mobile';
import '../index.less';
import img1 from 'Img/1.jpg'
import DocumentTitle from "react-document-title";

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
            goodsList: [
                {
                    id: 1,
                    name: '太平鸟',
                    title: '太平鸟那幢冬季短款黑色羽绒服',
                    price: 200,
                    sale: '每400减50'
                },
                {
                    id: 2,
                    name: '太平鸟',
                    title: '太平鸟那幢冬季短款黑色羽绒服',
                    price: 300,
                    sale: '每400减50'
                },
                {
                    id: 3,
                    name: '太平鸟',
                    title: '太平鸟那幢冬季短款黑色羽绒服',
                    price: 400,
                    sale: '每400减50'
                },
                {
                    id: 4,
                    name: '太平鸟',
                    title: '太平鸟那幢冬季短款黑色羽绒服',
                    price: 500,
                    sale: '每400减50'
                }],
            goodsCategory: [{
                icon: img1,
                text: '特色食品',
                id: '1'
            }, {
                icon: img1,
                text: '特色住宿',
                id: '2'
            }, {
                icon: img1,
                text: '主题旅游',
                id: '3'
            }],
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
    }

    queryCategory = (id, index) => {
        if (index === 0) {
            this.context.router.push(`/food/index`);
        } else if (index === 1) {
            this.context.router.push(`/hotel/index`);
        } else {
            this.context.router.push(`/travel/index/`);
        }
    }

    queryGoodsDetail = (id) => {
        this.context.router.push(`/goods/detail/${id}`);
    }

    render() {
        const {data, goodsCategory, foodData, travelData, hotelData} = this.state;

        return (
            <DocumentTitle title='无介商城'>
                <div className="home">
                    <div className="zui-content">
                        <Carousel
                            autoplay
                            infinite
                        >
                            {data.map(val => (
                                <a
                                    key={val}
                                    href="http://www.alipay.com"
                                    style={{display: 'inline-block', width: '100%', height: '40vw'}}
                                >
                                    <img
                                        src={img1}
                                        alt=""
                                        style={{width: '100%', height: '100%', verticalAlign: 'top'}}
                                    />
                                </a>
                            ))}
                        </Carousel>
                        <Grid
                            data={goodsCategory}
                            hasLine={false}
                            columnNum={3}
                            className="not-square-grid"
                            onClick={(item, index) => this.queryCategory(item.id, index)}
                        />
                        <div className='goods-category'>
                            <div className='goods-category-title'>特色食品</div>
                            <div className='goods-category-body food-content'>
                                <div className='left'>
                                    <div className='food-name'>{foodData[0].name}</div>
                                    <div className='food-text'>{foodData[0].text}</div>
                                    <div className='food-img'>
                                        <img src={img1} alt=""/>
                                    </div>
                                </div>
                                <div className='right'>
                                    <div>
                                        <div className='food-name'>{foodData[1].name}</div>
                                        <div className='food-text'>{foodData[1].text}</div>
                                        <div className='food-img'>
                                            <img src={img1} alt=""/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='food-name'>{foodData[2].name}</div>
                                        <div className='food-text'>{foodData[2].text}</div>
                                        <div className='food-img'>
                                            <img src={img1} alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='goods-category'>
                            <div className='goods-category-title'>特色名宿</div>
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
                            <div className='goods-category-title'>主题旅游</div>
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
