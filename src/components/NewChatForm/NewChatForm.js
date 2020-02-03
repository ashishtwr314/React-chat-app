import React, { Component } from "react";
import { Form, Checkbox, Button } from "semantic-ui-react";
import firebase from "firebase";

class NewChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      receiverEmail: "",
      userExists: null
    };
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  chatExists = receiverEmail => {
    let chatIndex = -1;
    this.props.chats.forEach((chat, i) => {
      if (chat.users.includes(this.state.receiverEmail)) {
        chatIndex = i;
      }
    });
    return chatIndex;
  };

  generateDocname = (userEmail, receiverEmail) => {
    return [userEmail, receiverEmail].sort().join(":");
  };

  sendNewMessage = async (message, receiverEmail) => {
    const chatIndex = this.chatExists(receiverEmail);
    const docname = this.generateDocname(
      this.props.userEmail,
      this.state.receiverEmail
    );

    if (chatIndex >= 0) {
      await this.props.onContactSelect(chatIndex);
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
    } else {
      firebase
        .firestore()
        .collection("chats")
        .doc(docname)
        .set({
          messages: [
            {
              message: message,
              sender: this.props.userEmail
            }
          ],
          hasRead: false,
          users: [this.props.userEmail, receiverEmail]
        })
        .then(result => {
          this.props.onContactSelect(this.chatExists(receiverEmail));
        })
        .catch(err => {});
    }
  };

  onSubmitHandler = e => {
    e.preventDefault();
    if (this.state.receiverEmail == this.props.userEmail) {
      console.log("You cannot send message to yoursef");
      return;
    }
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(result => {
        const users = result.docs.map(doc => {
          return doc.data().email;
        });

        if (users.includes(this.state.receiverEmail)) {
          this.setState({ userExists: true }, () => {
            this.sendNewMessage(this.state.message, this.state.receiverEmail);
          });
        } else {
          this.setState({ userExists: false }, () => {
            console.log("No user Exists");
          });
        }
      })
      .catch(err => {});
  };

  render() {
    return (
      <Form onSubmit={e => this.onSubmitHandler(e)}>
        <Form.Field>
          <label>Email Id</label>
          <input
            value={this.state.receiverEmail}
            onChange={e => this.onChangeHandler(e)}
            name="receiverEmail"
            placeholder="Email Id"
          />
        </Form.Field>
        <Form.Field>
          <label>Message</label>
          <input
            value={this.state.message}
            onChange={e => this.onChangeHandler(e)}
            name="message"
            placeholder="Message"
          />
        </Form.Field>
        <Button primary type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default NewChatForm;
