import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;

class SidePublic extends React.Component {
    state = {
        module:this.props.module,
    };
    componentWillReceiveProps(props) {
        this.setState({module:props.module});
    }
    render() {
        return <Menu
                  mode="inline"
                  defaultSelectedKeys={[]}
                  defaultOpenKeys={[this.state.module]}
                  style={{ height: '100%' }}
                  onClick={(target) => {this.props.changeFeatures(target.key)}}
                >
                  <SubMenu key="user" title={<span><Icon type="user" />用户管理</span>}>
                    <Menu.Item key="queryUser">用户查询</Menu.Item>
                    <Menu.Item key="addUser">添加用户</Menu.Item>
                  </SubMenu>
                </Menu>;
    }
}
export default SidePublic;