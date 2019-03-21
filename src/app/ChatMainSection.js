import React from "react";

import AllMessages from "./AllMessages.js";
import InputBox from "./InputBox.js";

// Note: use socket, on client's side
import io from "socket.io-client";

/**
 *
 * Connect to socket.io-client, for live messages
 * Event names: "username", "message"
 *
 */
class ChatMainSection extends React.Component {
  // Note: add socket.io-client directly, inside React component's constructor
  constructor(props) {
    super(props);

    // Note: no need to put server address, because the
    // Express server is already serving the client files
    // this.socket = io("http://localhost:8000");
    this.socket = io();

    var retrievedObject = sessionStorage.getItem("userInfo");
    retrievedObject = JSON.parse(retrievedObject);
    this.socket.emit("username", retrievedObject.username);

    // Note on username: this.props.user is null, because parent's value is only passed down in render()
    // window.alert("Find username: " + retrievedObject.username);

    this.sendMessage = this.sendMessage.bind(this);
  }

  // Note: listening on event "message", to update
  // this component's messages live (with one's own messages)
  componentDidMount() {
    // Connect to socket
    this.socket.on("message", msg => {
      // const item = {};
      msg = JSON.parse(msg);

      // Call back function from parent component
      // this.props.addNewMsg(msg);
      this.addNewMsg(msg); // Note: this component's own method
    });
  }

  addNewMsg(newItem) {
    this.props.addNewMsg(newItem);
  }

  // This function converts a new message into a new object (for DB)
  sendMessage(msg) {
    let date = new Date();
    let localTime = date.toLocaleTimeString();
    date = localTime.replace(/:\d+ /, " "); // Note: this is actually local time (not date)

    const msgObj = JSON.stringify({
      user: this.props.user,
      isHost: this.props.isHost,
      message: msg,
      roomName: this.props.roomName,
      time: date,
      timeStamp: new Date().getTime().toString()
    });

    this.socket.emit("message", msgObj, ack => {
      console.log(ack);
    });
    // this.socket.emit("message", msgObj); // Does not work, no cb function
  }

  // Conditionally render, based on variable isLobby
  render() {
    if (this.props.isLobby) {
      return (
        <div>
          <img className="lobbyImg" src="./assets/Lobby.jpg" />
        </div>
      );
    } else {
      return (
        <div className="mainSection">
          <div>
            <AllMessages msgsList={this.props.msgsList} />
          </div>

          <InputBox sendMessage={this.sendMessage} />
        </div>
      );
    }
  }
}

export default ChatMainSection;
