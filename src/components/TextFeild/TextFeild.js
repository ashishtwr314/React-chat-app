import React, { Component } from "react";
import { Input, Icon } from "semantic-ui-react";
import "./TextFeild.css";
import firebase from "firebase";

class TextFeild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  onMessageTypeHandler = e => {
    if (e.keyCode == 13) {
      this.sendMessage(this.state.message);
      this.setState({ message: "" });
    } else {
      this.setState({
        message: e.target.value
      });
    }
  };

  generateDocName = () => {
    const users = this.props.chats[this.props.activeIndex].users;
    return users.sort().join(":");
  };

  isMessageValid = message => {
    message = message.trim();
    if (message.length == 0) {
      return false;
    } else {
      return true;
    }
  };

  sendMessage = message => {
    console.log(message);

    if (this.isMessageValid(message)) {
      const docname = this.generateDocName();
      firebase
        .firestore()
        .collection("chats")
        .doc(docname)
        .update({
          messages: firebase.firestore.FieldValue.arrayUnion({
            message: message,
            sender: this.props.userEmail
          }),
          hasRead: false
        });
    }
  };

  render() {
    return (
      <Input
        value={this.state.message}
        onKeyUp={e => this.onMessageTypeHandler(e)}
        onChange={e => this.onMessageTypeHandler(e)}
        onFocus={this.props.messageRead}
        fluid
        className="messageInput"
        icon={
          <Icon
            className="send-icon"
            onClick={() => this.sendMessage(this.state.message)}
            name="send"
            circular
            link
          />
        }
        placeholder="Type a Message"
      />
    );
  }
}

export default TextFeild;
