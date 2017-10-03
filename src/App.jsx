import React, { Component } from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: 'Bob' },
      nextId: 4, 
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?'
        },
        {
          id: 2,
          username: 'Anonymous',
          content:
            'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
    this.onNewMessage = this.onNewMessage.bind(this);
  }

  // componentDidMount invoked immediately after component is mounted
  componentDidMount() {
    // setTimeout delays following code
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: 'Michelle',
        content: 'Hello there!'
      }
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
  }

  // onNewMessage function takes msg and takes msg object and appends
  // to this.state.messages array (which then passes to MessageList)
  onNewMessage(msg) {
    const message = {
      id: this.state.nextId,
      username: this.state.currentUser.name,
      content: msg
    }
    this.setState({
      nextId: this.state.nextId + 1,
      messages: this.state.messages.concat(message)
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList messages={ this.state.messages } />
        <ChatBar
          currentUser={ this.state.currentUser.name }
          addMessage={ this.onNewMessage }
        />
      </div>
    );
  }
}

export default App;
// export default class App extends Component ??
