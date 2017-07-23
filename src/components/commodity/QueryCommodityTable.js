import { Table, Popconfirm } from 'antd';
import EditableCell from '../EditableCell';
import { dataToEditableData, editableDataToData } from '../../utils/DataFormatter';
import HtmlCell from '../HtmlCell';

class QueryCommodityTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'ID',
      dataIndex: 'id',
      key:'id',
      render: (text, record, index) => (text),
      width:50
    },{
      title: '商品编号',
      dataIndex: 'commodityNumber',
      key:'commodityNumber',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'commodityNumber', text),
    }, {
      title: '商品名称',
      dataIndex: 'name',
      key:'name',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text),
      width:100
    },{
      title: '价格',
      dataIndex: 'price',
      key:'price',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'price', text),
      width:50
    }, {
      title: '商品描述',
      dataIndex: 'description',
      key:'description',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'description', text),
    }, {
      title: '标签名称',
      dataIndex: 'tagNames',
      key:'tagNames',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'tagNames', text),
    }, {
      title: '商品头图',
      dataIndex: 'imgPath',
      key:'imgPath',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'imgPath', text),
    }, {
      title: '商品详情',
      dataIndex: 'detailHtml',
      key:'detailHtml',
      render: (text, record, index) => this.renderHtmlColumns(this.state.data, index, 'detailHtml', text),
    }, {
      title: '加购次数',
      dataIndex: 'cartSale',
      key:'cartSale',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'cartSale', text),
      width:50
    }, {
      title: '销量',
      dataIndex: 'orderSale',
      key:'orderSale',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'orderSale', text),
      width:50
    }, {
      title: '库存',
      dataIndex: 'stock',
      key:'stock',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'stock', text),
      width:50
    }, {
      title: '状态',
      dataIndex: 'state',
      key:'state',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'state', text),
      width:50
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
      width:100
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
  renderHtmlColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<HtmlCell
      editable={editable}
      value={text}
      onChange={value => this.handleHtmlChange(key, index, value)}
      status={status}
      id={data[index].id.value}
    />);
  }
  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }
  handleHtmlChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
      this.props.saveCommodity(editableDataToData(data[index]));
    });
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
      this.props.saveCommodity(editableDataToData(data[index]));
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
    const pagination = {pageSize:20}
    return <Table bordered pagination={false} dataSource={dataSource} columns={columns}  rowKey="id"/>;
  }
}

export default QueryCommodityTable;