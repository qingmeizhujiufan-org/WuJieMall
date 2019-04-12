import React from 'react';
import PropTypes from 'prop-types';
import {Carousel, List} from 'antd-mobile';
import {Layout, BaseInfo} from 'Comps/zui-mobile';
import '../index.less';
import img from 'Img/IMG_1624.png'
import DocumentTitle from "react-document-title";
import axios from "Utils/axios";
import restUrl from "RestUrl";

const Item = List.Item;

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.params.id,
            loading: false,
            detailData: {},
            topSliderList: [],
            detailPicList: [],
            goodsDetail: {},
            shopDetail: {},
            recommandList: [],
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
        this.queryDetail();
    }

    queryDetail = () => {
        this.setState({loading: true});
        const param = {
            id: this.props.params.id
        }
        axios.get('food/queryDetail', {
            params: param
        }).then(res => res.data).then(data => {
            if (data.success) {
                if (data.backData) {
                    const backData = data.backData;
                    const headerPic = backData.headerPic;
                    const detailPic = backData.detailPic;

                    this.queryShopDetail(backData.shopId);
                    this.queryListByShopId(backData.shopId);
                    headerPic.map(item => {
                        item.imgSrc = restUrl.FILE_ASSET + `${item.id + item.fileType}`;
                    });

                    detailPic.map(item => {
                        item.imgSrc = restUrl.FILE_ASSET + `${item.id + item.fileType}`;
                    });

                    this.setState({
                        topSliderList: headerPic,
                        detailPicList: detailPic,
                        goodsDetail: backData
                    });
                } else {
                    this.setState({
                        topSliderList: [],
                        detailPicList: []
                    });
                }
            } else {
                Message.error('查询列表失败');
            }
            this.setState({loading: false});
        });
    }

    queryShopDetail = (id) => {
        const param = {
            id
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

    queryListByShopId = (id) => {
        const param = {
            id,
            pageSize: 3,
            pageNumber: 1
        };
        axios.get('food/queryListByShopId', {
            params: param
        }).then(res => res.data).then(data => {
            if (data.success) {
                if (data.backData) {
                    let backData = data.backData.content;
                    backData.map(item => {
                        item.headerPic.imgSrc = restUrl.FILE_ASSET + `${item.headerPic.id + item.headerPic.fileType}`;
                    });
                    this.setState({
                        recommandList: backData
                    });
                }
            }
        });
    }

    detail = (id) => {
        this.context.router.push(`/food/detail/${id}`);
    }

    toBuy = () => {
        const id = this.state.id;
        this.context.router.push(`/order/add/${id}`);
    }

    toGoodsCar = () => {
        const id = this.state.id;
        this.context.router.push(`/order/add/${id}`);
    }

    render() {
        const {topSliderList, detailPicList, goodsDetail, shopDetail, recommandList, travelData} = this.state;
        return (
            <DocumentTitle title='食品介绍'>
                <div id="goodsDetail">
                    <Layout withFooter>
                        <Layout.Content>
                            <Carousel
                                autoplay
                                infinite
                            >
                                {topSliderList.map(item => (
                                    <a
                                        key={item.id}
                                        style={{display: 'inline-block', width: '100%', height: '60vw'}}
                                    >
                                        <img
                                            src={item.imgSrc}
                                            alt=""
                                            style={{width: '100%', height: '100%', verticalAlign: 'top'}}
                                        />
                                    </a>
                                ))}
                            </Carousel>
                            <div className="goods-detail">
                                <div className='goods-header'>
                                    {goodsDetail.isTop ? <div className='is-top'>精品</div> : null}
                                    {goodsDetail.foodName}
                                </div>
                                <div className='goods-subscribe'>
                                    <div className='goods-price'>
                                        <span>￥</span><span>{goodsDetail.foodSellingprice}</span></div>
                                    <div className='goods-number'>
                                        {
                                            goodsDetail.number ? (
                                                <div>
                                                    <span>【现货】</span><span>&nbsp;&nbsp;&nbsp;</span><span>库存{goodsDetail.number}件</span>
                                                </div>
                                            ) : (
                                                <span>缺货</span>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='goods-vip'>
                                </div>
                            </div>
                            <div className="goods-comments">
                                <List className="my-list">
                                    <Item arrow="horizontal" multipleLine onClick={() => {
                                    }}>
                                        商品评价&nbsp;
                                        <span style={{color: 'red', fontSize: '14px'}}>{goodsDetail.comments}</span>
                                    </Item>
                                </List>
                            </div>
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
                                        <div>{shopDetail.shopName}</div>
                                        <div>{shopDetail.mark}</div>
                                    </div>
                                    <div className='goods-store-into'
                                         onClick={() => this.context.router.push(`/shop/detail/${goodsDetail.shopId}`)}>
                                        进入店铺
                                    </div>
                                </div>
                                <div className='goods-store-body'>
                                    {
                                        recommandList.map((item, index) => {
                                            return (
                                                <div key={index} className='food-item'
                                                     onClick={() => this.showFood(item.id)}>
                                                    <div className='food-img'>
                                                        <img src={restUrl.FILE_ASSET + item.headerPic.id + item.headerPic.fileType} alt=""/>
                                                    </div>
                                                    <div className='food-body'>
                                                        <div className='food-name'>{item.foodName}</div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='sub-title'>食品基本信息</div>
                            <BaseInfo
                                baseInfoList={[
                                    {
                                        label: '生产日期',
                                        value: goodsDetail.foodDate
                                    }, {
                                        label: '生产许可证编号',
                                        value: goodsDetail.foodCode
                                    }, {
                                        label: '厂址',
                                        value: goodsDetail.foodStorage
                                    }, {
                                        label: '产地省份',
                                        value: goodsDetail.foodOrigin
                                    }, {
                                        label: '保质期',
                                        value: goodsDetail.foodStorage
                                    }, {
                                        label: '净含量',
                                        value: goodsDetail.foodNetWeight
                                    }, {
                                        label: '成分及配料',
                                        value: goodsDetail.foodBatching
                                    }
                                ]}
                            />
                            <div className="goods-info">
                                <div className='goods-info-pic'>
                                    {detailPicList.map(val => (
                                        <div key={val.id} style={{width: '100%', height: '50vw', padding: '10px 15px'}}
                                        >
                                            <img
                                                src={val.imgSrc}
                                                alt=""
                                                style={{width: '100%', height: '100%'}}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Layout.Content>
                        <Layout.Footer className='footer'>
                            <div className='service' onClick={this.toServer}>客服</div>
                            <div className='add' onClick={this.toGoodsCar}>加入购物车</div>
                            <div className='buy' onClick={this.toBuy}>立即购买</div>
                        </Layout.Footer>
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
