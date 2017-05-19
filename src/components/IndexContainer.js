import { PropTypes } from 'prop-types';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import SidePublic from './SidePublic';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class IndexContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    user:this.props.user
  }
  componentWillReceiveProps(props) {
    this.setState({user:props.user});
  }
  render() {
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
                <SidePublic module={this.state.user.module}/>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                  Content
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
    user:state.index.user
  };
}

export default connect(mapStateToProps)(IndexContainer);
