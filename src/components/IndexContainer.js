import { PropTypes } from 'prop-types';
// import { Form, Icon, Input, Button } from 'antd';
// const FormItem = Form.Item;

class IndexContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    user:this.props.user,
    system:this.props.system,
    module:this.props.module,
    data:this.props.data
  }
  componentWillMount() {
    this.props.checkLogin();
  }
  render() {
    console.log("IndexContainer--------system,module,data");
    console.log(this.state);
    return <div>1</div>;
  }
}
IndexContainer.propTypes = {
  system: PropTypes.string.isRequired,
  module: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
};
export default IndexContainer;
