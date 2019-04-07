import React from 'react';
import PropTypes from 'prop-types';
import {Flex, Toast, Accordion} from 'antd-mobile';
import {Layout} from "Comps/zui-mobile";
import '../index.less';
import DocumentTitle from "react-document-title";
import axios from "Utils/axios";
import restUrl from "RestUrl";
import {listToTree} from 'Utils/util';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    };

    componentWillMount() {
    }

    componentDidMount() {
        this.queryCommentList();
    }

    queryCommentList() {
        const params = {
            roomId: this.props.params.id
        };
        Toast.loading('正在查询...', 0);
        axios.get('room/comment', {params}).then(res => res.data).then(data => {
            Toast.hide();
            if (data.success) {
                let backData = data.backData;
                for (let i = 0; i < backData.length; i++) {
                    const comment = backData[i];
                    comment.detailPic.map(item => {
                        item.imgSrc = restUrl.FILE_ASSET + `${item.id + item.fileType}`;
                    });
                }
                backData = listToTree(backData);
                console.log('backData == ', backData);
                this.setState({data: backData});
            } else {
                Toast.fail(data.backMsg, 1);
            }
        });
    }

    render() {
        const {data} = this.state;

        return (
            <DocumentTitle title='评价'>
                <Layout className="room-comment">
                    <Layout.Content>
                        <div className='comment-list'>
                            {
                                data.map(item => {
                                    return (
                                        <div key={item.id} className='comment-list-item'>
                                            <div className='comment-list-item-header'>
                                                <div className='wrap-img'>
                                                    <img/>
                                                </div>
                                                <div className='comment-list-item-header-content'>
                                                    <div className='user-name'>{'张三'}</div>
                                                    <Flex justify='between'>
                                                        <p className='room-name'>{'梦想小屋'}</p>
                                                        <div
                                                            className='date'>{item.created_at.substring(0, 10)}</div>
                                                    </Flex>
                                                </div>
                                            </div>
                                            <div className='comment-list-item-content'>
                                                <div>{item.commentContent}</div>
                                                <div className='detail-pic-list'>
                                                    {
                                                        item.detailPic.map((item, index) => {
                                                            return (
                                                                <div key={index} className='wrap-img'><img
                                                                    src={item.imgSrc}/></div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                {
                                                    item.children && item.children.length > 0 ? (
                                                        <Accordion>
                                                            <Accordion.Panel header="酒店回复">
                                                                <p className='reply-comment'>{item.children[0].commentContent}</p>
                                                            </Accordion.Panel>
                                                        </Accordion>
                                                    ): null
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
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
