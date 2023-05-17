import React, { Component } from "react";

import "./ManageDoctor.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: "",
      description: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
    console.log("handleEditorChange", html, text);
  };

  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
  };
  handleOnchangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  handleSaveContentMarkdown = () => {
    console.log(this.state);
  };
  render() {
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tao them thong tin bac si</div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label htmlFor="">Chọn bác sĩ:</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChange}
              options={options}
            />
          </div>
          <div className="content-right form-group">
            <label htmlFor="">Thông tin giới thiệu :</label>
            <textarea
              name=""
              id=""
              cols="6"
              rows="5"
              className="form-control"
              onChange={(e) => this.handleOnchangeDescription(e)}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            // truyen props xuong tu cha sang con, 1 function
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          className="save-content-doctor"
          onClick={() => this.handleSaveContentMarkdown()}
        >
          LUU THONG TIN
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserRedux: (userId) => dispatch(actions.deleteAUser(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
