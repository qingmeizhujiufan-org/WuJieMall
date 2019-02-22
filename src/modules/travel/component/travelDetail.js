import React from 'react';
import PropTypes from 'prop-types';
import {NavBar, Carousel, List, Icon, Flex} from 'antd-mobile';
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
            data: {},
            topSliderList: [],
            currentIndex: 0,
            restTimer: '--'
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
        axios.get('travel/queryDetail', {
            params: param
        }).then(res => res.data).then(data => {
            if (data.success) {
                if (data.backData) {
                    const backData = data.backData;
                    const headerPic = backData.headerPic || [];
                    const detailPic = backData.detailPic || [];

                    headerPic.map(item => {
                        item.imgSrc = restUrl.FILE_ASSET + `${item.id + item.fileType}`;
                    });

                    detailPic.map(item => {
                        item.imgSrc = restUrl.FILE_ASSET + `${item.id + item.fileType}`;
                    });
                    this.setTimer(backData.travelBeginTime);

                    this.setState({
                        topSliderList: headerPic,
                        currentIndex: 1,
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

    setTimer = time => {
        const that = this;
        const travelBeginTime = time && new Date(time.substring(0, 10) + ' 00:00:00').getTime() || new Date().getTime();
        let restTime = travelBeginTime - new Date().getTime();
        let id = setInterval(timeTicker, 1000);

        function timeTicker() {
            if (restTime > 0) {
                let day = 0,
                    hour = 0,
                    min = '00',
                    s = '00';
                const _s = 1000,
                    _min = 60 * _s,
                    _h = 60 * _min,
                    _d = 24 * _h;
                if (restTime > 0) {
                    day = Math.floor(restTime / _d);
                    hour = Math.floor((restTime - day * _d) / _h);
                    min = Math.floor((restTime - day * _d - hour * _h) / _min);
                    s = Math.floor((restTime - day * _d - hour * _h - min * _min) / _s);

                    const format_time = `${day}天 ${hour < 10 ? ('0' + hour) : hour}:${min < 10 ? ('0' + min) : min}:${s < 10 ? ('0' + s) : s}`;
                    that.setState({restTimer: format_time});

                    restTime -= 1000;
                }
            } else {
                clearInterval(id);
                that.setState({restTimer: '已结束'});
            }
        }
    }

    render() {
        const {data, topSliderList, currentIndex, restTimer} = this.state;

        return (
            <DocumentTitle title='主题旅游'>
                <div className="travel-detail">
                    <div className="zui-content">
                        <div className='wrap-carousel'>
                            <Carousel
                                dots={false}
                                beforeChange={(from, to) => this.setState({currentIndex: to + 1})}
                            >
                                {topSliderList.map((item, index) => (
                                    <div key={index} style={{height: '60vw'}}>
                                        <img
                                            src={item.imgSrc}
                                            alt=""
                                            style={{width: '100%', height: '100%', verticalAlign: 'top'}}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                            <div className='dot'>{currentIndex} / {topSliderList.length}</div>
                        </div>
                        <div className='sign-up'>
                            <Flex justify='between'>
                                <div className='sign-info'>报名 {5} /{data.travelLimiteNumber || 0}人</div>
                                <div className='rest-time-ticker'>距结束：{restTimer}</div>
                            </Flex>
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
