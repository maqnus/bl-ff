import "regenerator-runtime/runtime.js";
import React, { Component } from "react";
import ReactDOM from "react-dom";

console.log('room script');
const jsonNode = document.querySelector("script[type='application/json']");
const jsonText = jsonNode.textContent;
const jsonData = JSON.parse(jsonText);

class RoomApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false
    }
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }

  render() {
    console.log(jsonData);
    return (
      <div>
        <input type="text" />
        <button>Send</button>
      </div>
    )
  }
}

ReactDOM.render(
  <RoomApp />,
  document.getElementById('room-app')
);
