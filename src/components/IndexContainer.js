import { PropTypes } from 'prop-types';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import SidePublic from './SidePublic';
import SideSiwangyin from './SideSiwangyin';
import QueryUserTable from './user/QueryUserTable';
import AddUserForm from './user/AddUserForm';
import QueryNavTable from './nav/QueryNavTable';
import AddNavForm from './nav/AddNavForm';
import QueryTagTable from './tag/QueryTagTable';
import AddTagForm from './tag/AddTagForm';
import QueryCommodityTable from './commodity/QueryCommodityTable';
import AddCommodityForm from './commodity/AddCommodityForm';
import QueryArticleSeriesTable from './article/QueryArticleSeriesTable';
import AddArticleSeriesForm from './article/AddArticleSeriesForm';
import QueryArticleTable from './article/QueryArticleTable';
import AddArticleForm from './article/AddArticleForm';
import QueryNewsTable from './nav/QueryNewsTable';
import AddNewsForm from './nav/AddNewsForm';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class IndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:props.user,
      system:props.system || props.user.system,
      module:props.module || props.user.module,
      features:props.features,
      data:props.data
    }
  }
  componentWillReceiveProps(props) {
    this.setState({user:props.user, features:props.features, data:props.data, system:props.system, module:props.module});
  }
  chooseSystem(system, module){
    switch(system) {
      case 'public':
        return <SidePublic module={module} changeFeatures={(features) => {this.props.changeFeatures(features)}}/>;
      case 'siwangyin':
        return <SideSiwangyin module={module} changeFeatures={(features) => {this.props.changeFeatures(features)}}/>;
      case 'letspogo':
        return <SideLetspogo module={module} changeFeatures={(features) => {this.props.changeFeatures(features)}}/>;
      default:
        return '错误';
    }
  }
  chooseContent(features){
    switch(features) {
      case 'queryUser':
        return <QueryUserTable data={this.state.data} saveUser={(user) => {this.props.saveUser(user)}}/>;
      case 'addUser':
        return <AddUserForm addUser={(user) => {this.props.addUser(user)}}/>;
      case 'queryNav':
        return <QueryNavTable data={this.state.data} saveNav={(nav) => {this.props.saveNav(nav)}}/>;
      case 'addNav':
        return <AddNavForm addNav={(nav) => {this.props.addNav(nav)}} navList={this.state.data}/>;  
      case 'queryTag':
        return <QueryTagTable data={this.state.data} saveTag={(tag) => {this.props.saveTag(tag)}}/>;
      case 'addTag':
        return <AddTagForm addTag={(tag) => {this.props.addTag(tag)}} />; 
      case 'queryCommodity':
        return <QueryCommodityTable data={this.state.data} saveCommodity={(commodity) => {this.props.saveCommodity(commodity)}}/>;
      case 'addCommodity':
        return <AddCommodityForm addCommodity={(commodity) => {this.props.addCommodity(commodity)}} />;
      case 'queryArticleSeries':
        return <QueryArticleSeriesTable data={this.state.data} saveArticleSeries={(series) => {this.props.saveArticleSeries(series)}}/>;
      case 'addArticleSeries':
        return <AddArticleSeriesForm addArticleSeries={(series) => {this.props.addArticleSeries(series)}} />;
      case 'queryArticle':
        return <QueryArticleTable data={this.state.data} saveArticles={(article) => {this.props.saveArticle(article)}}/>;
      case 'addArticle':
        return <AddArticleForm addArticle={(article) => {this.props.addArticle(article)}} />;
      case 'queryNews':
        return <QueryNewsTable data={this.state.data} saveNews={(news) => {this.props.saveNews(news)}}/>;
      case 'addNews':
        return <AddNewsForm addNews={(news) => {this.props.addNews(news)}} />;
      default:
        return "未选中功能，或该功能暂未开放!";
    }
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
                onClick={(item) => {this.props.changeSystem(item.key)}}
              >
                <Menu.Item key="public">公共系统</Menu.Item>
                <Menu.Item key="siwangyin">黑光避难所</Menu.Item>
                <Menu.Item key="letspogo">Let's Pogo</Menu.Item>
              </Menu>
            </Header>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                {this.chooseSystem(this.state.system, this.state.module)}
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 680 }}>
                  {this.chooseContent(this.state.features)}
                </Content>
              </Layout>
            </Layout>
          </Layout>;
  }
}
IndexContainer.propTypes = {
  user: PropTypes.object,
  system:PropTypes.string,
  module:PropTypes.string,
  features:PropTypes.string,
  data:PropTypes.array
};

function mapStateToProps(state) {
  return {
    user:state.index.user,
    system:state.index.system,
    module:state.index.module,
    features:state.index.features,
    data:state.index.data
  };
}

export default connect(mapStateToProps)(IndexContainer);
