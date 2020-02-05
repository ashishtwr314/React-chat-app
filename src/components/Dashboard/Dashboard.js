import React, { Component } from "react";
import ContactList from "../ContactList/ContactList";
import Navbar from "../Navbar/Navbar";
import ChatMessages from "../ChatMessages/ChatMessages";
import "./Dashboard.css";
import { Button, Icon, Header, Grid, Segment } from "semantic-ui-react";

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

  logout = () => {
    firebase.auth().signOut();
  };

  toggleSidebar = () => {
    const itemsToToggle = document.querySelectorAll(
      ".navbar .item:not(.dont-hide)"
    );
    const contactList = document.getElementById("contact-list");
    const chatMessages = document.getElementById("chatMessages");
    const newChatButton = document.getElementsByClassName("new-chat-btn")[0];

    if (contactList.style.width !== "0px") {
      contactList.style.width = 0;
      chatMessages.style.marginLeft = 0;
      newChatButton.style.display = "none";
      itemsToToggle.forEach(item => {
        item.style.display = "none";
      });
    } else {
      contactList.style.width = "250px";
      chatMessages.style.marginLeft = "250px";
      newChatButton.style.display = "inline-block";
      itemsToToggle.forEach(item => {
        item.style.display = "flex";
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Navbar
          toggleSidebar={this.toggleSidebar}
          email={this.state.email}
          logout={this.logout}
        />
        <div className="dashboard-main">
          <div id="contact-list" className="contact-list">
            <ContactList
              toggleSidebar={this.toggleSidebar}
              activeIndex={this.state.activeIndex}
              chats={this.state.chats}
              userEmail={this.state.email}
              onContactSelect={this.onContactSelect}
            />
          </div>

          <div id="chatMessages" className="chatMessages">
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
                <React.Fragment>
                  <Header as="h1">
                    Start a new Chat <br /> by clicking on the "New chat" Button
                  </Header>
                  <Segment basic className="mobile-only">
                    <Header textAlign="center" color="black" as="h3">
                      OR
                    </Header>

                    <Button toggle primary onClick={this.toggleSidebar}>
                      Select From Existing Chats
                    </Button>
                  </Segment>
                </React.Fragment>
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

          <div className="new-chat-btn">
            <Button circular size="huge" onClick={this.newChat} primary icon>
              <Icon name="add" />
            </Button>
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
