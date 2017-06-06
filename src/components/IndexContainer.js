import { PropTypes } from 'prop-types';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import SidePublic from './SidePublic';
import QueryTable from './user/QueryTable';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class IndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:props.user,
      features:props.features,
      data:props.data
    }
  }
  
  componentWillReceiveProps(props) {
    alert(1);
    this.setState({user:props.user, features:props.features, data:props.data});
  }
  componentDidMount
  render() {
    console.log(this.state);
    let indexContent = "未选中功能，或该功能暂未开放!";
    let features = this.state.features;
    if (features != null) {
      switch(features) {
        case 'queryUser':
          indexContent = <QueryTable data={this.state.data} saveUser={(user) => {this.props.saveUser(user)}}/>;
          break;
      }
    }
    return <Layout>
            <Header className="header">
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[this.state.user.system]}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="public">公共系统</Menu.Item>
                <Menu.Item key="siwangyin">黑光避难所</Menu.Item>
                <Menu.Item key="letspogo">Let's Pogo</Menu.Item>
              </Menu>
            </Header>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <SidePublic module={this.state.user.module} changeFeatures={(features) => {this.props.changeFeatures(features)}}/>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 680 }}>
                  {indexContent}
                </Content>
              </Layout>
            </Layout>
          </Layout>;
  }
}
IndexContainer.propTypes = {
  user: PropTypes.object,
  features:PropTypes.string,
  data:PropTypes.array
};

function mapStateToProps(state) {
  console.log(state);
  return {
    user:state.index.user,
    features:state.index.features,
    data:state.index.data
  };
}

export default connect(mapStateToProps)(IndexContainer);
