import React from "react";
import axios from "axios";
import ChatTopSection from "./ChatTopSection.js";
import ChatMainSection from "./ChatMainSection.js";

class ChatLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userIcon: "",
      rooms: [], // List of all rooms
      roomName: "Banana", //"Lobby",
      isLobby: false,
      isHost: false,
      msgsPerRoom: []
    };

    this.selectRoom = this.selectRoom.bind(this);
    this.getMsgsPerRoom = this.getMsgsPerRoom.bind(this);
    this.addNewMsg = this.addNewMsg.bind(this);
  }

  componentDidMount() {
    var retrievedObject = sessionStorage.getItem("userInfo");
    if (retrievedObject === null) {
      window.alert("Invalid login! Please log in again.");
      window.location = "/login";
    }
    // Get all rooms/sessions
    else {
      retrievedObject = JSON.parse(retrievedObject);

      // Check host status, of the logged-in user
      let isHost = false;
      if (retrievedObject.username === this.state.roomName) {
        isHost = true;
      }

      // First axios request
      axios
        .get("/qa")
        .then(res => {
          this.setState({
            username: retrievedObject.username,
            rooms: res.data,
            isHost: isHost
          });
        })
        .catch(error => {
          console.log(error);
        });

      // Second axios request
      // Load messages, if not in Lobby
      if (!this.state.isLobby) {
        this.getMsgsPerRoom(this.state.roomName);
      }
    }
  }

  // About: get all messages, in the selected room/session
  // Note: use axios; then pass the server response to
  // child component
  getMsgsPerRoom(room) {
    axios
      .get(`/qa/${room}`)
      .then(res => {
        this.setState({
          msgsPerRoom: res.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  selectRoom(room) {
    // Determine isLobby status
    // No main section, with room as Lobby
    if (room === "Lobby") {
      this.setState({
        isLobby: true,
        roomName: room,
        isHost: false
      });
    } else if (room === this.state.username) {
      this.setState({
        isLobby: false,
        roomName: room,
        isHost: true
      });
    } else {
      this.setState({
        isLobby: false,
        roomName: room,
        isHost: false
      });
    }

    // In addition, update state msgsPerRoom
    this.getMsgsPerRoom(room);
  }

  // Add the newest message (that a user typed) to message list
  addNewMsg(newItem) {
    this.setState({
      // msgsPerRoom: copy
      msgsPerRoom: this.state.msgsPerRoom.concat(newItem)
    });
  }

  render() {
    return (
      <div className="outerSections">
        <ChatTopSection
          user={this.state.username}
          rooms={this.state.rooms}
          selectRoom={this.selectRoom}
          isLobby={this.state.isLobby}
        />

        <ChatMainSection
          user={this.state.username}
          roomName={this.state.roomName}
          isLobby={this.state.isLobby}
          isHost={this.state.isHost}
          msgsList={this.state.msgsPerRoom}
          addNewMsg={this.addNewMsg}
        />
      </div>
    );
  }
}

export default ChatLayout;
