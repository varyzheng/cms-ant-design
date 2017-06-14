import { Table, Popconfirm } from 'antd';
import EditableCell from '../EditableCell';
import { dataToEditableData, editableDataToData } from '../../utils/DataFormatter';

class QueryUserTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '用户名',
      dataIndex: 'username',
      key:'username',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'username', text),
    }, {
      title: '密码',
      dataIndex: 'password',
      key:'password',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'password', text),
    }, {
      title: '账号等级',
      dataIndex: 'accountLevel',
      key:'accountLevel',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'accountLevel', text),
    }, {
      title: '默认系统',
      dataIndex: 'system',
      key:'system',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'system', text),
    }, {
      title: '默认模块',
      dataIndex: 'module',
      key:'module',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'module', text),
    }, {
      title: '状态',
      dataIndex: 'state',
      key:'state',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'state', text),
    }, {
      title: '操作',
      dataIndex: 'operation',
      key:'operation',
      render: (text, record, index) => {
        const { editable } = this.state.data[index].state;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.editDone(index, 'save')}>保存</a>&nbsp;&nbsp;
                  <Popconfirm title="确定取消吗?" onConfirm={() => this.editDone(index, 'cancel')}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
                :
                <span>
                  <a onClick={() => this.edit(index)}>编辑</a>
                </span>
            }
          </div>
        );
      },
    }];
    this.state = {
      data:props.data
    };
  }
  componentWillReceiveProps(props){
    this.setState({data:props.data});
  }
  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
      editable={editable}
      value={text}
      onChange={value => this.handleChange(key, index, value)}
      status={status}
    />);
  }
  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }
  edit(index) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
  }
  editDone(index, type) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
      this.props.saveUser(editableDataToData(data[index]));
    });
  }
  render() {
    const { data } = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    const columns = this.columns;
    return <Table bordered dataSource={dataSource} columns={columns}  rowKey="id"/>;
  }
}

export default QueryUserTable;