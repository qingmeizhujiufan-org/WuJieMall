import React from 'react';
import {List, InputItem, Switch, Picker, Toast, TextareaItem} from 'antd-mobile';
import {Layout} from 'Comps/zui-mobile';
import {createForm} from 'rc-form';
import DocumentTitle from "react-document-title";
import {district, provinceLite} from 'antd-mobile-demo-data';
import '../index.less';
import axios from "Utils/axios";
import PropTypes from "prop-types";
const Item = List.Item;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      pickerValue: ''
    }
  }
  componentWillMount() {
    this.state.id = this.props.params.id;
  }

  onSubmit = () => {
    this.props.form.validateFields({force: true}, (error) => {
      if (!error) {
        const values = this.props.form.getFieldsValue();
        values.ownerId = this.state.id;
        values.region = this.state.pickerValue;
        values.regionCode = values.regionCode.join(',');
        axios.post('address/add', values).then(res => res.data).then(data => {
          if (data.success) {
            Toast.success('保存成功', 1);
            this.context.router.push(`/address/list/${this.state.id}`);
          } else {
            Toast.fail('保存失败', 1);
          }
        })
      } else {
        let errors = [];
        for(let key in error) {
          errors.push(error[key].errors[0].message)
        }
        Toast.fail(errors[0], 1);
      }
    });
  }

  validatePhone = (rule, value, callback) => {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (value && value !== '' && !reg.test(value)) {
      callback(new Error('手机号格式不正确'));
    } else {
      callback();
    }
  }

  getSel(labels) {
    const region = labels.join('')
    this.state.pickerValue = region;
    return region;
  }

  render() {
    const {getFieldProps, getFieldError} = this.props.form;

    return (
      <DocumentTitle title='添加收货地址'>
        <div className="address">
          <Layout withFooter>
            <Layout.Content>
              <form>
                <List
                  renderFooter={
                    () =>
                      getFieldError('receiver')
                      && getFieldError('phone')
                      && getFieldError('region')
                      && getFieldError('subArea')
                  }
                >
                  <InputItem
                    {...getFieldProps('receiver', {
                      rules: [
                        {required: true, message: '请输入收货人'}
                      ]
                    })}
                    clear
                    error={!!getFieldError('receiver')}
                    onErrorClick={() => {
                      Toast.info(getFieldError('receiver').join('、'));
                    }}
                    placeholder="请输入收货人"
                  />
                  <InputItem
                    {...getFieldProps('phone', {
                      rules: [
                        {required: true, message: '请输入手机号码'},
                        {validator: this.validatePhone},
                      ],
                    })}
                    clear
                    error={!!getFieldError('phone')}
                    onErrorClick={() => {
                      Toast.info(getFieldError('phone').join('、'));
                    }}
                    placeholder="请输入手机号码"/>
                  <Picker
                    data={district}
                    title="请选择地区"
                    {...getFieldProps('regionCode', {
                      rules: [
                        {required: true, message: '请选择地区'}
                      ]
                    })}
                    format={val => this.getSel(val)}
                  >
                    <Item arrow="horizontal">省、市、区</Item>
                  </Picker>
                  <TextareaItem
                    {...getFieldProps('subArea', {
                      rules: [
                        {required: true, message: '请输入详细地址'}
                      ]
                    })}
                    rows={3}
                    clear
                    error={!!getFieldError('subArea')}
                    onErrorClick={() => {
                      Toast.info(getFieldError('subArea').join('、'));
                    }}
                    placeholder="详细地址，如道路i、小区、单元、门牌号等"
                  />
                  <Item
                    extra={<Switch {...getFieldProps('isDefault', {initialValue: true, valuePropName: 'checked'})} />}
                    style={{marginTop: '10px'}}
                  >是否设置为默认地址</Item>
                </List>
              </form>
            </Layout.Content>
            <Layout.Footer className='footer'>
              <div className='submit' onClick={this.onSubmit}>保存</div>
            </Layout.Footer>
          </Layout>
        </div>
      </DocumentTitle>
    )
  }
}

Index.contextTypes = {
  router: PropTypes.object
}

const AddressAdd = createForm()(Index);

export default AddressAdd;
