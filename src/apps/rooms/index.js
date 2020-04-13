import "regenerator-runtime/runtime.js";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import socketIOClient from "socket.io-client";

const jsonNode = document.querySelector("script[type='application/json']");
const jsonText = jsonNode.textContent;
const jsonData = JSON.parse(jsonText);

class RoomApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: socketIOClient(jsonData.room.endpoint),
      response: false,
      array: [],
      message: ''
    }
  }

  componentDidMount = () => {
    this.state.socket.on("chat message", msg => {
      console.log('socket mottok meldingen: ' + msg);
      let array = [...this.state.array];
      array.push({ text: msg });
      this.setState({ array });
    });
  }

  handleMessageChange = (message) => {
    console.log(message);
    this.setState({ message });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.message);
    this.state.socket.emit('chat message', this.state.message);
    this.setState({ message: '' });
  }

  renderMessages = () => {
    return this.state.array
      .map((item, key) => (
        <li>
          {item.text}
        </li>
      ));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderMessages()}
        <p></p>
        <input
          type="text"
          value={this.state.message}
          onChange={event => this.handleMessageChange(event.currentTarget.value)}
        />
        <button type="submit">Send</button>
      </form>
    )
  }
}

ReactDOM.render(
  <RoomApp />,
  document.getElementById('room-app')
);
