import { Form, Input, Radio, Icon, Checkbox, Button, AutoComplete } from 'antd';
import { editableDataToData, dataToValueLabelData, clone } from '../../utils/DataFormatter';
import { connect } from 'dva';
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;


class AddArticleSeriesForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.addArticleSeries(values);
        this.props.form.resetFields();
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

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
          label="系列名"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [ {
              required: true, message: '请输入系列名'
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述"
          hasFeedback
        >
          {getFieldDecorator('description', {
            rules: [{
              required: true, message: '请输入描述'
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
const AddArticleSeriesFormCreated = Form.create()(AddArticleSeriesForm);

export default connect()(AddArticleSeriesFormCreated);