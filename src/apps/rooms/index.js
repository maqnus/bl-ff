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
    this.state.socket.on("chat message", message => {
      console.log('socket mottok meldingen: ', message);
      let array = [...this.state.array];
      array.push({ user: message.user, text: message.text });
      this.setState({ array });
    });
  }

  handleMessageChange = message => this.setState({ message });

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      user: jsonData.user,
      text: this.state.message
    };
    console.log(data);
    this.state.socket.emit('chat message', data);
    this.setState({ message: '' });
  }

  renderMessages = () => {
    return this.state.array
      .map((item, key) => (
        <li>
          <div className="row comments mb-2">
            <div className="col-md-2 col-sm-2 col-3 text-center user-img">
              <img src="/images/profile-picture.png" alt="user thumbnail profile picture" />
            </div>
            <div className="col-md-9 col-sm-9 col-9 comment rounded mb-2">
          <h4 className="m-0"><a href={`/user/${item.user.uid}`}>{item.user.email}</a></h4>
              <time className="text-white ml-3">1 hours ago</time>
              <p className="mb-0 text-white">{item.text}</p>
            </div>
          </div>
        </li>
      ));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="container">
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-12 comments-main pt-4 rounded">
            <ul className="p-0">
              {this.renderMessages()}
            </ul>
            <div className="row comment-box-main p-3 rounded-bottom">
              <div className="col-md-9 col-sm-9 col-9 pr-0 comment-box">
                <input
                  className="form-control"
                  type="text"
                  // placeholder=""
                  value={this.state.message}
                  onChange={event => this.handleMessageChange(event.currentTarget.value)}
                />
              </div>
              <div className="col-md-3 col-sm-2 col-2 pl-0 text-center send-btn">
                <button className="btn btn-info" type="submit">Send</button>
              </div>
            </div>

          </div>
        </div>
      </form>
    )
  }
}

ReactDOM.render(
  <RoomApp />,
  document.getElementById('room-app')
);
