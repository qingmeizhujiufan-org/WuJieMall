import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Toast, Flex} from 'antd-mobile';
import {createForm} from 'rc-form';
import '../index.less';
import restUrl from "RestUrl";
import DocumentTitle from "react-document-title";
import axios from "Utils/axios";
import assign from 'lodash/assign';
import {Layout, List, InputItem, BaseInfo, Stepper} from "Comps/zui-mobile";
import moment from 'moment';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    };

    componentDidMount() {
    }

    render() {
        const {getFieldProps} = this.props.form;

        return (
            <DocumentTitle title='报名信息'>
                <Layout className="travel-sign-info" withFooter>
                    <Layout.Content>
                        <Flex className='tip' align='start'>
                            <div className='icon'><span className=''>!</span></div>
                            <div className='text'>
                                <div>自驾游报名须知</div>
                                <ul className='zui-list-unstyled notice-list'>
                                    <li>1、报名后客服会电话联系您。</li>
                                    <li>2、集合地点领队出发前通知。</li>
                                    <li>3、姓名和身份证号用于买保险。</li>
                                    <li>4、车牌号用于排车队号。</li>
                                </ul>
                            </div>
                        </Flex>
                        <List>
                            <List.Item
                                wrap
                                extra={new moment().format('YYYY-MM-DD')}
                            >报名团期</List.Item>
                            <List.Item
                                wrap
                                extra={
                                    <Stepper
                                        min={1}
                                        {...getFieldProps('man', {
                                            initialValue: 1
                                        })}
                                    />}
                            >大人 2550/人</List.Item>
                            <List.Item
                                wrap
                                extra={
                                    <Stepper
                                        min={0}
                                        {...getFieldProps('child', {
                                            initialValue: 0
                                        })}
                                    />}
                            >小孩 1000/人</List.Item>
                            <InputItem
                                {...getFieldProps('contact')}
                                placeholder='（必填）请输入'
                            >联系人</InputItem>
                            <InputItem
                                {...getFieldProps('contactPhone')}
                                placeholder='（必填）请输入'
                            >联系人电话</InputItem>
                            <InputItem
                                {...getFieldProps('plateNumber')}
                                placeholder='（必填）请输入'
                            >车牌号</InputItem>
                        </List>
                        <br/>
                        <List>
                            <InputItem
                                {...getFieldProps('participants[0].name')}
                                placeholder='（必填）请输入'
                            >参与人姓名</InputItem>
                            <InputItem
                                {...getFieldProps('participants[0].card')}
                                placeholder='（必填）请输入'
                            >身份证号码</InputItem>
                        </List>
                    </Layout.Content>
                    <Layout.Footer>
                        <Flex className='footer-btn-group'>
                            <div className='call'>总金额</div>
                            <div className='post-sign' onClick={this.signUp}>提交报名</div>
                        </Flex>
                    </Layout.Footer>
                </Layout>
            </DocumentTitle>
        );
    }
}

Index.contextTypes = {
    router: PropTypes.object
}

const WrapIndex = createForm()(Index);

export default WrapIndex;
