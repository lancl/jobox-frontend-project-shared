import React from "react";
import {
  ThemeProvider,
  MessageList,
  Message,
  MessageText
} from "@livechat/ui-kit";

class AllMessages extends React.Component {
  constructor(props) {
    super(props);

    // this.renderMsgs = this.renderMsgs.bind(this);
  }

  renderMsgs() {
    const msgsList = this.props.msgsList;

    if (msgsList.length > 0) {
      const output = [];
      for (let i = 0; i < msgsList.length; i++) {
        let msg = msgsList[i];
        output.push(
          <Message
            key={i + msg.timeStamp}
            authorName={msg.user}
            date={msg.time}
            isOwn={msg.isHost}
          >
            <MessageText>{msg.message}</MessageText>
          </Message>
        );
      }
      return output;
    }

    return ""; // Length as 7
  }

  render() {
    const msgItems = this.renderMsgs();

    if (msgItems.length > 0) {
      return (
        <ThemeProvider>
          <MessageList>{msgItems}</MessageList>
        </ThemeProvider>
      );
    } else {
      return <div />;
    }
  }
}

export default AllMessages;
