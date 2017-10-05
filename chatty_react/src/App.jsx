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
      userCount: 0
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
        default:
          console.log('Error');
          throw new Error(`Unknown event type ${data.type}`);
      }
    };
  }

  // componentDidMount invoked immediately after component is mounted
  // componentDidMount() {
  //   // setTimeout delays following code
  //   setTimeout(() => {
  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {
  //       id: 3,
  //       username: 'Michelle',
  //       content: 'Hello there!'
  //     }
  //     const messages = this.state.messages.concat(newMessage);
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //     this.setState({ messages: messages });
  //   }, 3000);
  // }

  // onNewMessage function takes msg and takes msg object and appends
  // to this.state.messages array (which then passes to MessageList)
  addMessage = (username, msg) => {
    const message = {
      type: 'postMessage',
      username: username ? username : 'Anonymous',
      content: msg
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

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <p className="user-count">{this.state.userCount} user(s) online</p>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser.name}
          addMessage={this.addMessage}
          addNotification={this.addNotification}
          updateName={this.updateName}
        />
      </div>
    );
  }
}

export default App;
// export default class App extends Component ??
