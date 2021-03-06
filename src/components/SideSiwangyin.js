import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;

class SideSiwangyin extends React.Component {
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
                  <SubMenu key="nav" title={<span><Icon type="api" />导航管理</span>}>
                    <Menu.Item key="queryNav">导航查询</Menu.Item>
                    <Menu.Item key="addNav">添加导航</Menu.Item>
                    <Menu.Item key="queryNews">文章导航查询</Menu.Item>
                    <Menu.Item key="addNews">添加文章导航</Menu.Item>
                  </SubMenu>
                
                  <SubMenu key="tags" title={<span><Icon type="tags" />标签管理</span>}>
                    <Menu.Item key="queryTag">标签查询</Menu.Item>
                    <Menu.Item key="addTag">添加标签</Menu.Item>
                  </SubMenu>
                  
                  <SubMenu key="commodity" title={<span><Icon type="book" />商城管理</span>}>
                    <Menu.Item key="queryCommodity">商品查询</Menu.Item>
                    <Menu.Item key="addCommodity">添加商品</Menu.Item>
                  </SubMenu>

                  <SubMenu key="blog" title={<span><Icon type="book" />博客管理</span>}>
                    <Menu.Item key="queryArticleSeries">系列查询</Menu.Item>
                    <Menu.Item key="addArticleSeries">添加系列</Menu.Item>
                    <Menu.Item key="queryArticle">文章查询</Menu.Item>
                    <Menu.Item key="addArticle">添加文章</Menu.Item>
                  </SubMenu>
                </Menu>;
    }
}
export default SideSiwangyin;