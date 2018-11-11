import React from 'react';
import PropTypes from 'prop-types';
import {NavBar, Carousel, WingBlank, Grid, Icon,Card} from 'antd-mobile';
import '../index.less';
import img1 from 'Img/1.jpg'
import img2 from 'Img/2.jpg'
import img3 from 'Img/3.jpg'

const goodCart = ({ className = '', ...restProps }) => (
  <div className={`${className} goodCart`} {...restProps}>
    <div>
      <img src={img1} alt=""/>
    </div>
    <Card>
      <Card.Header
        title="This is title"
        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
        extra={<span>this is extra</span>}
      />
      <Card.Body>
        <div>This is content of `Card`</div>
      </Card.Body>
      <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
    </Card>
  </div>
);

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ['1', '2', '3'],
    }
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    const {data} = this.state;
    const girdData = Array.from(new Array(10)).map((_val, i) => ({
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
      text: `name${i}`,
    }));
    return (
      <div className="home">
        <NavBar
          mode="light"
          rightContent={[
            <Icon key="0" type="search" style={{marginRight: '16px'}}/>,
            <Icon key="1" type="ellipsis"/>,
          ]}
        >商城首页</NavBar>
        <div className='zui-scroll-wrapper'>
          <div className="zui-scroll">
            <Carousel
              autoplay
              infinite
            >
              {data.map(val => (
                <a
                  key={val}
                  href="http://www.alipay.com"
                  style={{display: 'inline-block', width: '100%', height: '60vw'}}
                >
                  <img
                    src={img1}
                    alt=""
                    style={{width: '100%', height: '100%', verticalAlign: 'top'}}
                  />
                </a>
              ))}
            </Carousel>
            <Grid data={girdData} hasLine={false} columnNum={5}/>
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
