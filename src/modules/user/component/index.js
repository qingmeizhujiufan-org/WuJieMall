import React from 'react';
import PropTypes from 'prop-types';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    const {data} = this.state;

    return (
      <div className="home">
        <div className='zui-scroll-wrapper'>
          <div className="zui-scroll">
            dada
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
