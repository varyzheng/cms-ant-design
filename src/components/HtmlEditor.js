import { Input } from 'antd';

class HtmlEditor extends React.Component {
  state = {
    id:this.props.id,
    html:this.props.html,
  }
  componentDidMount() {
    var editor = UM.getEditor(this.state.id);
    editor.addListener("ready", function () {
        editor.setContent(this.state.html);
    });
  }
  render() {
    var style = {
        width:'1000px', height:'300px'
    }
    return <script type="text/plain" id={this.state.id} style={style}></script>;
  }
}
export default HtmlEditor;