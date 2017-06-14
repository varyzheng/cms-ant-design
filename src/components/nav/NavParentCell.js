import { Modal, Button, Icon, Radio } from 'antd';
const RadioGroup = Radio.Group;
import { connect } from 'dva';
import style from '../EditableCell.css';
import { editableDataToData, dataToValueLabelData, clone } from '../../utils/DataFormatter';


class NavParentCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable,
    data:this.props.data
  }
  componentWillReceiveProps(props) {
    if (props.data && this.state.editable) {
      this.setState({data:props.data});
    }
    if (props.value && this.state.editable) {
      this.setState({value:props.value});
    }
  }
  onChange = (e) => {
    this.setState({value:e.target.value});
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  close = () => {
    this.setState({ editable: false, value: this.cacheValue });
    if (this.props.onChange) {
      this.props.onChange(this.cacheValue);
    }
  }
  edit = () => {
    this.cacheValue = this.state.value;
    this.setState({ editable: true });
  }
  render() {
    const { value, editable, data } = this.state;
    const cloneData = editableDataToData(clone(data));
    let parentList = [];
    for (let nav of cloneData) {
        if (nav.parentId === 0 || nav.parentId.value === 0) {
            parentList.push(nav);
        }
    }
    const options = dataToValueLabelData(parentList, "id", "text");
    options.unshift({label:"根元素", value:0});
    return (
      <div className={style.editableCell + " editable-cell"}>
        <div className={style.editableCellTextWrapper + " editable-cell-text-wrapper"}>
          {value === 0 ? 0 : value || ' '}
          <Icon
            type="edit"
            className={style.editableCellIcon + " editable-cell-icon"}
            onClick={this.edit}
          />
        </div>
        <Modal
          title={this.state.title}
          wrapClassName="vertical-center-modal"
          visible={this.state.editable}
          onOk={this.check}
          onCancel={this.close}
          okText="确认"
          cancelText="取消"
        >
          <RadioGroup options={options} onChange={this.onChange} value={value}/>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tagList:state.index.tagList
  };
}

export default connect(mapStateToProps)(NavParentCell);