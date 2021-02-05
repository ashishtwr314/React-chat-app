import React, { Component } from "react";
import {
  Form,
  Checkbox,
  Button,
  Header,
  Segment,
  Search,
  Label,
  List,
  Image,
  Card,
} from "semantic-ui-react";
import firebase from "firebase";
import "./NewChatFrom.css";

const resultRenderer = ({ title }) => <Label content={title} />;

class NewChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      receiverEmail: "",
      userExists: null,
      allUsers: [],
      showDropCard: false,
      showUsers: [],
    };
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (e.target.name == "message") return;

    if (e.target.value.length > 0) {
      this.setState({
        showDropCard: true,
      });
      const allUsersCopy = [...this.state.allUsers];
      const filteredUsers = allUsersCopy.filter((user) => {
        return user.includes(e.target.value);
      });
      this.setState({
        showUsers: filteredUsers,
      });
    } else {
      this.setState({
        showDropCard: false,
      });
    }
  };

  chatExists = (receiverEmail) => {
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
            sender: this.props.userEmail,
          }),
          hasRead: false,
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
              sender: this.props.userEmail,
            },
          ],
          hasRead: false,
          users: [this.props.userEmail, receiverEmail],
        })
        .then((result) => {
          this.props.onContactSelect(this.chatExists(receiverEmail));
        })
        .catch((err) => {});
    }
  };

  handleUserSelect = (user) => {
    this.setState({
      showDropCard: false,
      receiverEmail: user,
    });
    console.log(user);
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    if (this.state.receiverEmail == this.props.userEmail) {
      console.log("You cannot send message to yoursef");
      return;
    }
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((result) => {
        const users = result.docs.map((doc) => {
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
      .catch((err) => {});
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((result) => {
        const users = result.docs.map((doc) => {
          return doc.data().email;
        });

        this.setState({
          allUsers: users,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={(e) => this.onSubmitHandler(e)}>
          <Form.Field>
            <label>Email Id</label>

            <input
              value={this.state.receiverEmail}
              onChange={(e) => this.onChangeHandler(e)}
              name="receiverEmail"
              placeholder="Email Id"
            />
            {this.state.showDropCard ? (
              <Card className="drop-card">
                <List divided verticalAlign="middle">
                  {this.state.showUsers.length ? (
                    this.state.showUsers.map((user, idx) => (
                      <List.Item
                        onClick={() => this.handleUserSelect(user)}
                        key={idx}
                      >
                        <Image
                          avatar
                          src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
                        />
                        <List.Content>
                          <List.Header as="a">{user}</List.Header>
                        </List.Content>
                      </List.Item>
                    ))
                  ) : (
                    <List.Item>No Results found</List.Item>
                  )}
                </List>
              </Card>
            ) : null}
          </Form.Field>
          <Form.Field>
            <label>Message</label>
            <input
              value={this.state.message}
              onChange={(e) => this.onChangeHandler(e)}
              name="message"
              placeholder="Message"
            />
          </Form.Field>
          <Button primary type="submit">
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default NewChatForm;
