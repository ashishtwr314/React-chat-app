import React, { Component } from "react";
import { List, Image, Loader, Placeholder } from "semantic-ui-react";
import "./ContactList.css";

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  userIsSender = chat => {
    return (
      chat.messages[chat.messages.length - 1].sender == this.props.userEmail
    );
  };

  render() {
    return (
      <List selection className="contactList">
        {this.props.chats.length > 0 ? (
          this.props.chats.map((chat, index) => {
            return (
              <List.Item
                active={this.props.activeIndex == index}
                onClick={() => {
                  this.props.onContactSelect(index);
                }}
                className="contact"
                key={index}
              >
                <Image
                  className="contact-avatar"
                  avatar
                  src="https://react.semantic-ui.com/images/avatar/small/rachel.png"
                />
                <List.Content className="contact-info">
                  <List.Header as="a">
                    {chat.users.filter(user => user !== this.props.userEmail)}
                  </List.Header>
                  <List.Description className="contact-info_message">
                    {!chat.hasRead && !this.userIsSender(chat) ? (
                      <b>Unread Messages...</b>
                    ) : (
                      chat.messages[chat.messages.length - 1].message
                    )}
                  </List.Description>
                </List.Content>
              </List.Item>
            );
          })
        ) : (
          <React.Fragment>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          </React.Fragment>
        )}
      </List>
    );
  }
}

export default ContactList;
