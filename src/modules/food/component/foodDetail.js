import React from 'react';
import PropTypes from 'prop-types';
import {Carousel, List, WhiteSpace} from 'antd-mobile';
import {Layout} from 'Comps/zui-mobile';
import '../index.less';
import img1 from 'Img/1.jpg'
import img from 'Img/IMG_1624.png'
import DocumentTitle from "react-document-title";
import axios from "Utils/axios";
import restUrl from "RestUrl";

const Item = List.Item;

const GoodsItem = ({className = '', data, ...restProps}) => (
    <div className={`${className} goods-item`} {...restProps}>
        <div className='goods-item-img'>
            <img src={`https://zos.alipayobjects.com/rmsportal/${data.url}.png`} alt=""/>
        </div>
        <div className='goods-item-name'>{data.name}</div>
    </div>
);

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productId: '',
            loading: false,
            detailData: {},
            topSliderList: [],
            detailPicList: [],
            goodsDetail: {},
            shopDetail: {},
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
        axios.get('product/queryDetail', {
            params: param
        }).then(res => res.data).then(data => {
            if (data.success) {
                if (data.backData) {
                    const backData = data.backData;
                    const headerPic = backData.headerPic;
                    const detailPic = backData.detailPic;

                    this.queryShopDetail(backData.shopId);
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

    render() {
        const {topSliderList, detailPicList, goodsDetail, shopDetail, travelData} = this.state;
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
                                    {goodsDetail.productName}
                                </div>
                                <div className='goods-subscribe'>
                                    <div className='goods-price'>
                                        <span>￥</span><span>{goodsDetail.productSellingprice}</span></div>
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
                                        <img src={shopDetail.shopPic && shopDetail.shopPic.imgSrc} alt=""/>
                                    </div>
                                    <div className='goods-store-info'>
                                        <div>{shopDetail.shopName}</div>
                                        <div>{shopDetail.mark}</div>
                                    </div>
                                    <div className='goods-store-into'
                                         onClick={() => this.context.router.push(`/shop/detail/${id}`)}>
                                        进入店铺
                                    </div>
                                </div>
                                <div className='goods-store-body'>
                                    {
                                        travelData.map((item, index) => {
                                            return (
                                                <GoodsItem key={index} data={item}/>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="goods-info">
                                <List renderHeader={() => '食品基本信息'} className="goods-info-list">
                                    <Item extra={goodsDetail.productDate}>生产日期</Item>
                                    <Item extra={goodsDetail.productCode}>生产许可证编号</Item>
                                    <Item extra={goodsDetail.productStorage}>厂址</Item>
                                    <Item extra={goodsDetail.productOrigin}>产地省份</Item>
                                    <Item extra={goodsDetail.productStorage}>保质期</Item>
                                    <Item extra={goodsDetail.productNetWeight}>净含量</Item>
                                    <Item extra={goodsDetail.productBatching}>成分及配料</Item>
                                </List>
                                <WhiteSpace/>
                                <div className='goods-info-pic'>
                                    {detailPicList.map(val => (
                                        <div key={val.id} style={{width: '100%', height: '60vw'}}
                                        >
                                            <img
                                                src={val.imgSrc}
                                                alt=""
                                                style={{width: '100%', height: '100%', verticalAlign: 'top'}}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Layout.Content>
                        <Layout.Footer className='footer'>
                            <div className='service'>客服</div>
                            <div className='add'>加入购物车</div>
                            <div className='buy'>立即购买</div>
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
