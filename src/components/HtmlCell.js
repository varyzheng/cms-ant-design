import { Modal, Button, Icon } from 'antd';
import { connect } from 'dva';
import style from './EditableCell.css';
import { editableDataToData, dataToValueLabelData, clone } from '../utils/DataFormatter';
import HtmlEditor from './HtmlEditor';


class HtmlCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable,
    id:this.props.id
  }
  componentWillReceiveProps(props) {
    if (props.data && this.state.editable) {
      this.setState({data:props.data});
    }
    if (props.value && this.state.editable) {
      this.setState({value:props.value});
    }
  }
  ensure = () => {
    let html = UM.getEditor("htmlEditor_" + this.state.id).getContent();
    this.setState({ editable: false, value:html }, () => {
        if (this.props.onChange) {
        this.props.onChange(this.state.value);
        }
    });
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
          onOk={this.ensure}
          onCancel={this.close}
          okText="确认"
          cancelText="取消"
          width='1050px'
        >
          <HtmlEditor id={"htmlEditor_" + this.state.id} html={value}/>
        </Modal>
      </div>
    );
  }
}

export default connect()(HtmlCell);