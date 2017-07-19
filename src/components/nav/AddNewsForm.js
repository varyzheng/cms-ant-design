import { Form, Input, Radio, Icon, Checkbox, Button, AutoComplete } from 'antd';
import { editableDataToData, dataToValueLabelData, clone } from '../../utils/DataFormatter';
import { connect } from 'dva';
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;


class AddNewsForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    dispatch:this.props.dispatch,
    tagList:[],
    tagValue:null
  };
  componentWillMount() {
    this.state.dispatch({
      type:'index/queryNews'
    })
  }
  componentWillReceiveProps(props) {
      this.setState({tagList:props.tagList});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.addNews(values);
        this.props.form.resetFields();
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  onTagChange = (e) => {
    const value = e.target.value;
    this.setState({ tagValue: value });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    const { tagList, tagValue } = this.state;
    console.log(tagList);
    let parentList = [];
    for (let tag of tagList) {
        if (tag.parentId === 0 || tag.parentId.value === 0) {
            parentList.push(tag);
        }
    }
    const options = dataToValueLabelData(parentList, "id", "text");
    options.unshift({label:"根元素", value:0});

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
          label="拼音名"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [ {
              required: true, message: '请输入拼音名'
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="中文名"
          hasFeedback
        >
          {getFieldDecorator('text', {
            rules: [{
              required: true, message: '请输入中文名'
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="跳转路径"
          hasFeedback
        >
          {getFieldDecorator('href', {
            rules: [{
              required: true, message: '请输入跳转路径'
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="父级"
          hasFeedback
        >
          {getFieldDecorator('parentId', {
            rules: [{ required: true, message: '请选择父级'}],
          })(
            <RadioGroup options={options} onChange={this.onTagChange} value={this.state.tagValue}/>
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
const AddNewsFormCreated = Form.create()(AddNewsForm);

function mapStateToProps(state) {
  return {
    tagList:state.index.tagList
  };
}

export default connect(mapStateToProps)(AddNewsFormCreated);