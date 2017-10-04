import React, { Component } from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(msg => {
      return <Message key={msg.id} message={msg.content} username={msg.username} />;
    });

    return <main className="messages">{messages}</main>;
  }
}

export default MessageList;