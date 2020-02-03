import React, { Component } from "react";
import ContactList from "../ContactList/ContactList";
import Navbar from "../Navbar/Navbar";
import ChatMessages from "../ChatMessages/ChatMessages";
import "./Dashboard.css";
import { Button, Icon } from "semantic-ui-react";

import firebase, { firestore } from "firebase";
import TextFeild from "../TextFeild/TextFeild";
import NewChatForm from "../NewChatForm/NewChatForm";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      chats: [],
      hasRead: false,
      users: [],
      activeIndex: null,
      showChats: null,
      showNewChatForm: false
    };
  }

  componentDidUpdate = () => {
    const chatsContainer = document.getElementById("chats");
    chatsContainer.scrollTo(0, chatsContainer.scrollHeight);
  };

  newChat = () => {
    this.setState({
      showNewChatForm: true,
      showChats: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="dashboard-main">
          <div className="contact-list">
            <ContactList
              activeIndex={this.state.activeIndex}
              chats={this.state.chats}
              userEmail={this.state.email}
              onContactSelect={this.onContactSelect}
            />
            <div className="new-chat-btn">
              <Button onClick={this.newChat} primary icon>
                <Icon name="add" />
              </Button>
            </div>
          </div>
          <div className="chatMessages">
            <div id="chats" className="chats">
              {this.state.showChats ? (
                <ChatMessages
                  activeIndex={this.state.activeIndex}
                  chats={this.state.chats}
                  userEmail={this.state.email}
                />
              ) : this.state.showNewChatForm ? (
                <NewChatForm
                  onContactSelect={this.onContactSelect}
                  chats={this.state.chats}
                  userEmail={this.state.email}
                  activeIndex={this.state.activeIndex}
                  showNewChatForm={this.state.showNewChatForm}
                />
              ) : (
                <h1>Tap on a Contact to Start Chatting</h1>
              )}
            </div>
            <div className="messageInput">
              {this.state.showChats ? (
                <div className="text-feild">
                  <TextFeild
                    activeIndex={this.state.activeIndex}
                    userEmail={this.state.email}
                    chats={this.state.chats}
                    messageRead={this.messageRead}
                    sendMessage={this.sendMessage}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.history.push("/login");
      } else {
        firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", user.email)
          .onSnapshot(result => {
            const chats = result.docs.map(doc => {
              return doc.data();
            });
            this.setState({
              email: user.email,
              chats: chats
            });
          });
      }
    });
  };

  onContactSelect = index => {
    this.setState(
      {
        activeIndex: index,
        showChats: true,
        showNewChatForm: false
      },
      () => {
        if (this.whoSentLastMessage()) {
          this.messageRead();
        } else {
          console.log("Tunehi bheja hai bro");
        }
      }
    );
  };

  messageRead = () => {
    const docKey = this.state.chats[this.state.activeIndex].users
      .sort()
      .join(":");
    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({ hasRead: true });
  };

  whoSentLastMessage = index => {
    console.log(this.state.activeIndex);
    return (
      this.state.chats[this.state.activeIndex].messages[
        this.state.chats[this.state.activeIndex].messages.length - 1
      ].sender !== this.state.email
    );
  };
}

export default Dashboard;
