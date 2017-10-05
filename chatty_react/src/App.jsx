import React, { Component } from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      currentUser: { name: '' },
      messages: [],
      userCount: 0,
      style: { background: '#8ed1fc' }
    };
  }

  componentDidMount() {
    // use location.hostname and location.port for other users(clients) on their own comp
    this.socket = new WebSocket(`ws://${location.hostname}:${Number(location.port) + 1}`);

    // on server open
    this.socket.onopen = () => {
      console.log('Connected to the server');
      this.setState({ connected: true });
    };

    // on server close
    this.socket.onclose = () => {
      this.setState({ connected: false });
    };

    // receiving messages from the server
    this.socket.onmessage = event => {
      console.info(`Received ${event.data}`);
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'incomingMessage':
          this.setState({
            messages: this.state.messages.concat(data)
          });
          break;
        case 'incomingNotification':
          this.setState({
            messages: this.state.messages.concat(data)
          });
          break;
        case 'userCount':
          this.setState({
            userCount: data.count
          });
          break;
          console.log('Error');
          throw new Error(`Unknown event type ${data.type}`);
      }
    };
  }

  // onNewMessage function takes msg and takes msg object and appends
  // to this.state.messages array (which then passes to MessageList)
  addMessage = (username, msg) => {
    const message = {
      type: 'postMessage',
      username: username ? username : 'Anonymous',
      content: msg,
      color: this.state.style.background
    };
    this.socket.send(JSON.stringify(message));
  };

  addNotification = newName => {
    const name = this.state.currentUser.name ? this.state.currentUser.name : 'Anonymous';
    const notification = {
      type: 'postNotification',
      content: `${name} has changed their name to ${newName}`
    };
    this.socket.send(JSON.stringify(notification));
  };

  updateName = newName => {
    console.log(`UPDATE NAME ${newName}`);
    this.setState({
      currentUser: { name: newName ? newName : 'Anonymous' }
    });
  };

  updateColor = color => {
    console.log(color);
    this.setState({
      style: {
        background: color
      }
    });
  };

  render() {
    return (
      <div>
        <nav className="navbar" style={this.state.style}>
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <p className="user-count">{this.state.userCount} user(s) online</p>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          style={this.state.style}
          currentUser={this.state.currentUser.name}
          addMessage={this.addMessage}
          addNotification={this.addNotification}
          updateName={this.updateName}
          updateColor={this.updateColor}
        />
      </div>
    );
  }
}

export default App;
// export default class App extends Component ??
