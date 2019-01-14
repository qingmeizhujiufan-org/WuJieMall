/**
 * Created by zhongzhenga on 2018/12/27.
 */
import React, {Component} from 'react';
import Content from './part/content';
import Footer from './part/footer';
import './index.less';

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            className,
            withFooter,
            children
        } = this.props;
        const [Content, Footer] = [...children];
        return (
            <div className={`zui-layout${className ? (' ' + className) : ''}${withFooter ? ' with-footer' : ''}`}>
                {Content}
                {withFooter ? Footer : null}
            </div>
        )
    }
}

Index.Content = Content;
Index.Footer = Footer;

Index.defaultProps = {
    withFooter: false
};

module.exports = Index;
