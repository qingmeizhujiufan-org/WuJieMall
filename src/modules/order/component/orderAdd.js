import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd-mobile';
import {Layout} from 'Comps/zui-mobile';
import '../index.less';
import DocumentTitle from "react-document-title";
import axios from "Utils/axios";
import restUrl from "RestUrl";

const Item = List.Item;

class OrderAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: [],
      loading: false,
      detailData: {},
      topSliderList: [],
      detailPicList: [],
      goodsDetail: {},
      shopDetail: {},
      recommandList: [],
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

  componentWillMount() {}

  componentDidMount() {}

  render() {
    const {} = this.state;
    return (
      <DocumentTitle title='确认订单'>
        <div id="orderAdd">
          <Layout withFooter>
            <Layout.Content>

            </Layout.Content>
            <Layout.Footer className='footer'>
              <div className='total'>客服</div>
              <div className='submit'>提交订单</div>
            </Layout.Footer>
          </Layout>
        </div>
      </DocumentTitle>
    );
  }
}

OrderAdd.contextTypes = {
  router: PropTypes.object
}

export default OrderAdd;
