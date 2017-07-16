import { Form, Input, Radio, Icon, Checkbox, Button, AutoComplete } from 'antd';
import { editableDataToData, dataToValueLabelData, clone } from '../../utils/DataFormatter';
import { connect } from 'dva';
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;


class AddNavForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    navList:this.props.navList,
    navValue:null,
    dispatch:this.props.dispatch,
    tagList:[],
    tagValue:null,
    href:'hah'
  };
  componentWillMount() {
    this.state.dispatch({
      type:'index/queryNavTags'
    })
  }
  componentWillReceiveProps(props) {
      this.setState({navList:props.navList, tagList:props.tagList});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //     this.props.addNav(values);
    //     this.props.form.resetFields();
    //   }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  onNavChange = (e) => {
    const value = e.target.value;
    this.setState({ navValue: value, href:'' });
  }
  onTagChange = (checkedValues) => {
      this.setState({tagValue: JSON.stringify(checkedValues)});
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    const { navList, tagList, navValue, tagValue, href } = this.state;
    
    const cloneData = editableDataToData(clone(navList));
    let parentList = [];
    for (let nav of cloneData) {
        if (nav.parentId === 0 || nav.parentId.value === 0) {
            parentList.push(nav);
        }
    }
    const options = dataToValueLabelData(parentList, "id", "text");
    options.unshift({label:"根元素", value:0});

    const tagOptions = dataToValueLabelData(tagList, "id", "text");
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
          label="所属分类"
          hasFeedback
        >
          {getFieldDecorator('parentId', {
            rules: [{ required: true, message: '请选择分类'}],
          })(
            <RadioGroup options={options} onChange={this.onNavChange} value={this.state.navValue}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="标签组"
          hasFeedback
        >
          {getFieldDecorator('tagIds', {
            rules: [{ required: true, message: '请选择标签组'}],
          })(
            <CheckboxGroup options={tagOptions} defaultValue={selectArray} onChange={this.onTagChange} value={selectArray}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="跳转路径"
          hasFeedback
        >
          {getFieldDecorator('href', {
            rules: [{ required: true, message: '请输入跳转路径'}],
          })(
            <Input value={href}/>
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
const AddNavFormCreated = Form.create()(AddNavForm);

function mapStateToProps(state) {
  return {
    tagList:state.index.tagList
  };
}

export default connect(mapStateToProps)(AddNavFormCreated);