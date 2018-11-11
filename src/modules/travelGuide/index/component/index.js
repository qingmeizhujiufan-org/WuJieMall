import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import '../index.less';
//引入自定义组件
import MenuList from '../../../../containers/menuList';
//引入图片
import segmentedNavigation from 'Img/segmented-navigation.jpg';
import busInformation from 'Img/bus-information.jpg';
import entertainmentNavigation from 'Img/entertainment-navigation.jpg';
import live from 'Img/live.jpg';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                title: '出行指南',
                tabContent: [
                    {
                        title: '到段导航',
                        desc: '轻松找到去训练段的回家路',
                        preview: segmentedNavigation,
                        path: '/travelGuide/segmentedNavigation/'
                    }, {
                        title: '班车信息',
                        desc: '及时有用的班车信息，快来查阅吧',
                        preview: busInformation,
                        path: '/travelGuide/busInformation'
                    }, {
                        title: '生活导航',
                        desc: '武汉这么大，我想去看看',
                        preview: entertainmentNavigation,
                        path: '/travelGuide/entertainmentNavigation'
                    }, {
                        title: '训练段动态',
                        desc: '训练段动态了解一下',
                        preview: live,
                        path: '/live/liveList'
                    }
                ]
            }
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
    }

    btnClick = (url) => {
        this.context.router.push(url);
    }

    render() {
        let {data} = this.state;

        return (
            <div className="travelGuide">
                <div className='zui-scroll-wrapper'>
                    <div className="zui-scroll">
                        <MenuList data={data}/>
                    </div>
                </div>
            </div>
        );
    }
}

Index.contextTypes = {
    router: PropTypes.object
}

export default Index;
