import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {ListView, Tabs, Toast, SearchBar} from 'antd-mobile';
import '../index.less';
import img1 from 'Img/1.jpg'
import img from 'Img/IMG_1624.png'
import DocumentTitle from "react-document-title";
import axios from "Utils/axios";
import assign from 'lodash/assign';

const GoodsCart = ({className = '', data, ...restProps}) => (
  <div className={`${className} goodsCart`} {...restProps}>
    <div className='goodsImg'>
      <img src={img1} alt=""/>
    </div>
    <div className='goodsBody'>
      <div className='goodsHeader'>
        {data.isTop ? <div className='isTop'>精品</div> : null}
        {data.title}
      </div>
      <div className='goodsContent'>
        <div className='goodsLabel'>【{data.productName}】</div>
        <div className='goodsAddress'>{data.address}</div>
      </div>
      <div className='goodsFooter'>
        <div><span>￥</span><span>{data.price}</span></div>
      </div>
    </div>
  </div>
);

function RenderContent(props) {
  return (<div className='tab-body am-list-body'>
    {props.children}
  </div>);
}

let pageIndex = 1;
const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];

function genData(pIndex = 0) {

  const sectionName = `Section ${pIndex}`;
  sectionIDs.push(sectionName);
  dataBlobs[sectionName] = sectionName;
  rowIDs[pIndex] = [];

  const rowName = `S${pageIndex}, R${pageIndex}`;
  rowIDs[pIndex].push(rowName);
  dataBlobs[rowName] = rowName;

  sectionIDs = [...sectionIDs];
  rowIDs = [...rowIDs];
}

class Index extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      isLoading: false,
      dataSource,
      height: document.documentElement.clientHeight * 3 / 4,
      params: {
        pageNumber: 1,
        pageSize: 10,
      },
      keyWords: '',
      categoryList: [{
        title: '全部'
      }],
      goodsList: [
        // {
        //   id: 1,
        //   name: '太平鸟',
        //   title: '太平鸟那幢冬季短款黑色羽绒服',
        //   address: '杭州',
        //   price: 200,
        //   isTop: true
        // },
        // {
        //   id: 2,
        //   name: '太平鸟',
        //   title: '太平鸟那幢冬季短款黑色羽绒服',
        //   address: '杭州',
        //   price: 300,
        //   isTop: false
        // },
        // {
        //   id: 3,
        //   name: '太平鸟',
        //   title: '太平鸟那幢冬季短款黑色羽绒服',
        //   address: '杭州',
        //   price: 400,
        //   isTop: true
        // },
        // {
        //   id: 4,
        //   name: '太平鸟',
        //   title: '太平鸟那幢冬季短款黑色羽绒服',
        //   address: '杭州',
        //   price: 500,
        //   isTop: false
        // }
      ]
    }
  };

  componentWillMount() {
    this.queryFoodsCategory();
    this.queryFoods();
  }

  componentDidMount() {
    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    // simulate initial Ajax
    setTimeout(() => {
      genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs),
        isLoading: false,
        height: hei,
      });
    }, 600);
  }

  queryFoodsCategory = () => {
    const {categoryList} = this.state
    axios.get('product/queryAllCategoryList')
      .then(res => res.data).then(data => {
      if (data.success) {
        let list = data.backData.map(item => {
          return {
            ...item,
            title: item.productCategoryName
          }
        })
        this.setState({
          categoryList: categoryList.concat(list)
        })
      } else {
        Toast.fail(data.backMsg);
      }
    });
  }

  queryFoods = () => {
    const {params, keyWords} = this.state;
    const param = assign({}, params, {keyWords});
    axios.get('product/queryList', {
      params: param
    }).then(res => res.data).then(data => {
      if (data.success && data.backData && data.backData.content) {
        this.setState({
          goodsList: data.backData.content
        })
      } else {
        Toast.fail(data.backMsg);
      }
      this.setState({initLoading: false});
    });
  }

  tabChange = (tab, index) => {
    // console.log(tab, index)
  }

  detail = (id) => {
    this.context.router.push(`/food/detail/${id}`);
  }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }

    this.setState({
      isLoading: true,
      params: {
        pageSize:10,
        pageNumber: this.state.params.pageNumber
      }
    });
    setTimeout(() => {
      genData(this.state.params.pageNumber);
      this.queryFoods();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    const {dataSource, categoryList, height, params, goodsList, isLoading} = this.state;
    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID} style={{'display': 'flex', 'flexWrap':'wrap'}}>
          {
            goodsList.map((item) => (
              <GoodsCart key={item.id} data={item} onClick={() => this.detail(item.id)}/>
            ))
          }
        </div>
      );
    }

    return (
      <DocumentTitle title='特色食品'>
        <div className="food">
          <div className="zui-content">
            <SearchBar placeholder="请输入要搜索的商品" maxLength={16}/>
            <Tabs
              tabs={categoryList}
              swipeable={false}
              onChange={this.tabChange}
              renderTabBar={props => <Tabs.DefaultTabBar {...props} page={6}/>}
            >
              <ListView
                ref={el => this.lv = el}
                dataSource={dataSource}
                renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
                  {isLoading ? '正在加载...' : '加载完成'}
                </div>)}
                renderBodyComponent={() => <RenderContent/>}
                renderRow={row}
                style={{
                  height: height,
                  overflow: 'auto',
                }}
                pageSize={1}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
              />
            </Tabs>
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
