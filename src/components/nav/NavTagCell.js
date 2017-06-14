import { Modal, Button, Icon, Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
import { connect } from 'dva';
import style from '../EditableCell.css';
import { dataToValueLabelData } from '../../utils/DataFormatter';


class NavTagCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable,
    dispatch:this.props.dispatch,
    tagList:[]
  }
  componentWillReceiveProps(props) {
    if (props.tagList && this.state.editable) {
      this.setState({tagList:props.tagList});
    }
    if (props.value && this.state.editable) {
      this.setState({value:props.value});
    }
  }
  onChange = (checkedValues) => {
    this.setState({value:JSON.stringify(checkedValues)});
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
    this.state.dispatch({
      type:'index/queryNavTags'
    })
  }
  render() {
    const { value, editable } = this.state;
    const options = dataToValueLabelData(this.state.tagList, "id", "text");
    let selectArray = JSON.parse(value);
    return (
      <div className={style.editableCell + " editable-cell"}>
        <div className={style.editableCellTextWrapper + " editable-cell-text-wrapper"}>
          {value || ' '}
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
          <CheckboxGroup options={options} defaultValue={selectArray} onChange={this.onChange} value={selectArray}/>
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

export default connect(mapStateToProps)(NavTagCell);