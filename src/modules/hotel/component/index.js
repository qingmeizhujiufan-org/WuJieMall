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
        this.context.router.push(`/hotel/detail/${id}`);
    }

    render() {
        const {params} = this.state;
        const row = (rowData, sectionID, rowID) => {
            const obj = rowData;

            return (
                <div
                    key={rowID}
                    className='zui-list-table-cell'
                    onClick={() => this.detail(obj.id)}
                >
                    <div className='hotel-item'>
                        <div className='wrap-thumbnail'>
                            <img src={obj.File ? (restUrl.FILE_ASSET + obj.File.id + obj.File.fileType) : ''}/>
                            <div className='travel-from'>{obj.travelFrom}出发</div>
                        </div>
                        <div className='hotel-item-content'>
                            <div className='hotel-item-content-title'>{obj.hotelName}</div>
                            <div className='hotel-item-content-body'>
                                <Flex justify='between'>
                                    <div className='base-info'>{obj.travelLastTime + ' | 含' + obj.travelHas}</div>
                                    <div className='sign-info'>报名 <span
                                        className='num'>{obj.TravelSigns}</span> /{obj.travelLimiteNumber}人
                                    </div>
                                </Flex>
                            </div>
                            <div className='hotel-item-content-footer'>
                                <Flex justify='between'>
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
                <div className="hotel">
                    <div className="zui-content">
                        <List
                            pageUrl={'hotel/queryList'}
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
