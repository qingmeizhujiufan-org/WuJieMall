import React from 'react';
import PropTypes from 'prop-types';
import {Tabs} from 'antd-mobile';
import '../index.less';
import {Layout} from "Comps/zui-mobile";
import DocumentTitle from "react-document-title";
import {List} from 'Comps';

const stateList = [{
    title: '待出行'
}, {
    title: '已结束'
}, {
    title: '待评价'
}];

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            params: {
                pageNumber: 1,
                pageSize: 10,
            },
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        const {params} = this.state;
        const row = (rowData, sectionID, rowID) => {
            const obj = rowData;

            return (
                <div key={rowID} style={{float: 'left', width: '50%'}}>
                </div>
            );
        }

        return (
            <DocumentTitle title='民宿订单'>
                <Layout>
                    <Layout.Content>
                        <Tabs
                            tabs={stateList}
                            swipeable={false}
                            onChange={this.tabChange}
                            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={6}/>}
                        >
                            <List
                                pageUrl={'/travelKeeper/queryOrderList'}
                                params={params}
                                row={row}
                            />
                        </Tabs>
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
