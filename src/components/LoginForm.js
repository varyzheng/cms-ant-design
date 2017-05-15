/*定义一个React组件都有哪些属性，此处官方文档上并未引用，在后边的使用过程中，
控制台报错说明需要单独引用’prop-types'*/
import { PropTypes } from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';//从antd引入要用到的组组件
const FormItem = Form.Item; //表单的每一个input都是一个Form.Item

//判断表单域是否有错误
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component {
  componentDidMount() {
    // 初始化让登录按钮为不可用
    this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submit(values);
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    /*只在用户实际输入后才提示错误，原文档中的userName 都被小弟改成了username,使用官方代码的一定注意这块把userName => username,
    或者改model中的代码username => userName 也一样^_^. 后边的一些提示信息被我改成了中文*/
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={usernameError ? 'error' : ''}
          help={usernameError || ''}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名！' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

/*此处定义了登录组件的submit属性为必须，这是一个方法，即表单的格式验证通过后执行的代码*/
LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

/*调用Form.create()API将表单实际创建出来，之前只是定义，现在才是真正的创建，创建后导出以供其他模块调用*/
const HorizontalLoginForm = Form.create()(LoginForm);
export default HorizontalLoginForm;
