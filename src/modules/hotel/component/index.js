import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Toast, Flex} from 'antd-mobile';
import '../index.less';
import restUrl from "RestUrl";
import img from 'Img/IMG_1624.png'
import DocumentTitle from "react-document-title";
import axios from "Utils/axios";
import assign from 'lodash/assign';

import {List} from 'Comps';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            goodsList: []
        }
    };

    componentDidMount() {
    }

    detail = (id) => {
        this.context.router.push(`/travel/detail/${id}`);
    }

    render() {
        const {params} = this.state;
        const row = (rowData, sectionID, rowID) => {
            const obj = rowData;
            let travelBeginTime = obj.travelBeginTime && new Date(obj.travelBeginTime.substring(0, 10) + ' 00:00:00').getTime() || new Date().getTime();
            let restTime = travelBeginTime - new Date().getTime();
            let day = 0, hour = 0;
            if (restTime > 0) {
                day = Math.floor(restTime / (3600 * 1000 * 24));
                hour = Math.floor((restTime - (day * 3600 * 1000 * 24)) / (3600 * 1000));
            }

            return (
                <div
                    key={rowID}
                    className='zui-list-table-cell'
                    onClick={() => this.detail(obj.id)}
                >
                    <div className='travel-item'>
                        <div className='wrap-thumbnail'>
                            <img src={obj.File ? (restUrl.FILE_ASSET + obj.File.id + obj.File.fileType) : ''}/>
                            <div className='travel-from'>{obj.travelFrom}出发</div>
                        </div>
                        <div className='travel-item-content'>
                            <div className='travel-item-content-title'>{obj.travelTheme}</div>
                            <div className='travel-item-content-body'>
                                <Flex justify='between'>
                                    <div className='base-info'>{obj.travelLastTime + ' | 含' + obj.travelHas}</div>
                                    <div className='sign-info'>报名 <span
                                        className='num'>{obj.TravelSigns.length}</span> /{obj.travelLimiteNumber}人
                                    </div>
                                </Flex>
                            </div>
                            <div className='travel-item-content-footer'>
                                <Flex justify='between'>
                                    <div className='rest-sign-time'><span
                                        className='rest-time'>{day}天{hour}小时</span> 报名结束
                                    </div>
                                    <div className='sign-price'>￥ <span className='price'>{obj.manPrice}</span></div>
                                </Flex>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <DocumentTitle title='特色民宿'>
                <div className="travel">
                    <div className="zui-content">
                        <List
                            pageUrl={'travel/queryList'}
                            params={params}
                            row={row}
                        />
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
