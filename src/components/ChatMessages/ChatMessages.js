import React from "react";
import { Segment, Header } from "semantic-ui-react";
import "./ChatMessages.css";

const ChatMessages = props => {
  if (props.chats[props.activeIndex]) {
    return (
      <React.Fragment>
        <Segment fluid inverted color="blue" className="convo-label">
          Conversation with:
          <b>
            {props.chats[props.activeIndex].users.filter(
              user => user !== props.userEmail
            )}
          </b>
        </Segment>
        {props.chats[props.activeIndex].messages.map((chat, i) => {
          return (
            <Segment
              key={i}
              compact
              className={
                chat.sender == props.userEmail ? "user-sent" : "friend-sent"
              }
            >
              {chat.message}
            </Segment>
          );
        })}
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default ChatMessages;
