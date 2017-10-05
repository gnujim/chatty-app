import React, { Component } from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(msg => {
      if (msg.type === 'incomingMessage') {
        return (
          <Message key={msg.id} message={msg.content} username={msg.username} color={msg.color} />
        );
      } else if (msg.type === 'incomingNotification') {
        return (
          <div key={msg.id} className="message system">
            {msg.content}
          </div>
        );
      }
    });

    return <main className="messages">{messages}</main>;
  }
}

export default MessageList;
