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

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    };

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {

        return (
            <DocumentTitle title='评价'>
                <Layout className="room-comment">
                    <Layout.Content>

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
