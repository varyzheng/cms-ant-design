import { PropTypes } from 'prop-types';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon, Table } from 'antd';
import SidePublic from './SidePublic';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class IndexContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    user:this.props.user,
    features:null,
    data:null
  }
  componentWillReceiveProps(props) {
    this.setState({user:props.user, features:props.features, data:props.data});
  }
  render() {
    let indexContent = "未选中功能，或该功能暂未开放!";
    let features = this.state.features;
    if (features != null) {
      switch(features) {
        case 'queryUser':
          const columns = [{
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
          }, {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
          }, {
            title: '账号等级',
            dataIndex: 'accountLevel',
            key: 'accountLevel',
          }, {
            title: '默认系统',
            dataIndex: 'system',
            key: 'system',
          }, {
            title: '默认模块',
            dataIndex: 'module',
            key: 'module',
          }, {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
          }];
          indexContent = <Table dataSource={this.state.data} columns={columns} />;
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
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user:state.index.user,
    features:state.index.features,
    data:state.index.data
  };
}

export default connect(mapStateToProps)(IndexContainer);
