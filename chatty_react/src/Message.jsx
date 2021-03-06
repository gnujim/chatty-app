import React, { Component } from 'react';

class Message extends Component {
  render() {
    const color = { color: this.props.color };
    return (
      <div className="message">
        <span className="message-username" style={color}>
          {this.props.username}
        </span>
        <span className="message-content">{this.props.message}</span>
      </div>
    );
  }
}

export default Message;
