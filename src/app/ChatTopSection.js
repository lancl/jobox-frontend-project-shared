import React from "react";
import Avatar from "@material-ui/core/Avatar";

class ChatTopSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: "Banana", // "Lobby"
      roomIcon: "./assets/banana.png",
      topic: "Banana plus peanut butter is the best snack!"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderList() {
    const list = [];
    const rooms = this.props.rooms;

    for (let i = 0; i < rooms.length; i++) {
      let roomName = rooms[i].roomName;
      list.push(<option value={roomName}>{roomName}</option>);
    }

    return list;
  }

  handleChange(event) {
    const rooms = this.props.rooms;
    let roomName = event.target.value;
    let roomIcon, topic;
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].roomName === roomName) {
        roomIcon = rooms[i].icon;
        topic = rooms[i].topic;
        break;
      }
    }
    this.setState({
      roomName: roomName,
      roomIcon: roomIcon,
      topic: topic
    });
  }

  // Send the updated room value back to parent component, ChatLayout
  handleSubmit(event) {
    event.preventDefault();
    this.props.selectRoom(this.state.roomName); // let roomName = event.target.value;
  }

  render() {
    let roomTopic = "";
    if (!this.props.isLobby) {
      roomTopic = "Topic: " + this.state.topic;
    }

    return (
      <div className="topSection">
        <div className="innerContainer">
          <Avatar className="containerAlign" src={this.state.roomIcon} />
          <form onSubmit={this.handleSubmit}>
            <label>
              Q&A Session:
              <select
                className="reactSelect"
                value={this.state.roomName}
                onChange={this.handleChange}
              >
                {this.renderList()}
              </select>
            </label>
            <input className="reactButton" type="submit" value="Go" />
          </form>
        </div>

        <div className="containerAlign">User: {this.props.user}</div>

        <div className="containerAlign">
          <h2> {roomTopic}</h2>
        </div>
      </div>
    );
  }
}

export default ChatTopSection;
