import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Tabs, Toast, SearchBar} from 'antd-mobile';
import '../index.less';
import restUrl from "RestUrl";
import img from 'Img/IMG_1624.png'
import DocumentTitle from "react-document-title";
import axios from "Utils/axios";
import assign from 'lodash/assign';

import {CardList} from 'Comps';

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
        this.context.router.push(`/food/detail/${id}`);
    }

    render() {
        const {params} = this.state;
        const row = (rowData, sectionID, rowID) => {
            const obj = rowData;

            return (
                <div key={rowID} onClick={() => this.detail(obj.id)}>
                    <div className='travel-item'>
                        <div className='wrap-thumbnail'>
                            <img src={obj.File ? (restUrl.FILE_ASSET + obj.File.id + obj.File.fileType) : ''}/>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <DocumentTitle title='主题旅游'>
                <div className="travel">
                    <div className="zui-content">
                        <CardList
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
