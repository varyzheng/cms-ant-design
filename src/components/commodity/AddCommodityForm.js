import { Form, Input, Radio, Icon, Checkbox, Button, AutoComplete } from 'antd';
import { editableDataToData, dataToValueLabelData, clone } from '../../utils/DataFormatter';
import { connect } from 'dva';
import HtmlEditor from '../HtmlEditor';
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;


class AddCommodityForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    dispatch:this.props.dispatch,
    tagList:[],
    tagValue:null
  };
  componentWillMount() {
    this.state.dispatch({
      type:'index/queryAllTags'
    })
  }
  componentWillReceiveProps(props) {
      this.setState({tagList:props.tagList});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.tagNames = values.tagNames.join("-");
        values.detailHtml = UM.getEditor('addCommodityHtmlEditor').getContent();
        this.props.addCommodity(values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  onTagChange = (checkedValues) => {
      this.setState({tagValue: JSON.stringify(checkedValues)});
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    const { tagList, tagValue } = this.state;

    const tagOptions = dataToValueLabelData(tagList, "name", "text");
    let selectArray = JSON.parse(tagValue);

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="商品编号"
          hasFeedback
        >
          {getFieldDecorator('commodityNumber', {
            rules: [ {
              required: true, message: '请输入商品编号'
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="商品名称"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [ {
              required: true, message: '商品名称'
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="商品描述"
          hasFeedback
        >
          {getFieldDecorator('description', {
            rules: [ {
              required: true, message: '商品描述'
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="价格"
          hasFeedback
        >
          {getFieldDecorator('price', {
            rules: [ {
              required: true, message: '价格'
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="标签组"
          hasFeedback
        >
          {getFieldDecorator('tagNames', {
            rules: [{ required: true, message: '请选择标签组'}],
          })(
            <CheckboxGroup options={tagOptions} defaultValue={selectArray} onChange={this.onTagChange} value={selectArray}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图片路径"
          hasFeedback
        >
          {getFieldDecorator('imgPath', {
            rules: [{ required: true, message: '请输入图片路径'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="商品详情"
          hasFeedback
        >
          <HtmlEditor id="addCommodityHtmlEditor"/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="库存"
          hasFeedback
        >
          {getFieldDecorator('stock', {
            rules: [ {
              required: true, message: '请输入库存'
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="状态"
          hasFeedback
        >
          {getFieldDecorator('state', {
            rules: [{ required: true, message: '请输入状态'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">添加</Button>
        </FormItem>
      </Form>
    );
  }
}
const AddCommodityFormCreated = Form.create()(AddCommodityForm);

function mapStateToProps(state) {
  return {
    tagList:state.index.tagList
  };
}

export default connect(mapStateToProps)(AddCommodityFormCreated);