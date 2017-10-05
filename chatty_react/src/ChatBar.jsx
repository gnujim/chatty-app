import React, { Component } from 'react';
import { CirclePicker } from 'react-color';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.currentUser,
      chatMessage: '',
      background: this.props.style.background
    };
  }

  handleChange = (color, event) => {
    this.props.updateColor(color.hex);
    this.setState({
      background: color.hex
    });
  };

  onNameChange = event => {
    this.setState({
      username: event.target.value
    });
  };

  // onMessageChange function listens for changes in input
  // and sets chatMessage state to current input value
  onMessageChange = event => {
    this.setState({
      chatMessage: event.target.value
    });
  };

  // onSubmitMessage function listens for enter keypress and
  // invokes addMessage function from APP to add msg to MessageList
  onSubmitMessage = event => {
    if (event.key === 'Enter') {
      this.props.addMessage(this.state.username, this.state.chatMessage);
      this.setState({
        username: this.state.username,
        chatMessage: ''
      });
    }
  };

  onSubmitName = event => {
    if (event.key === 'Enter') {
      this.props.addNotification(this.state.username);
      this.props.updateName(this.state.username);
    }
  };

  render() {
    return (
      <footer className="chatbar" style={this.props.style}>
        <CirclePicker
          onChange={this.handleChange}
          width="176px"
          colors={['#FF6900', '#FCB900', '#7BDCB5', '#8ED1FC']}
          circleSize={30}
          circleSpacing={10}
        />
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onInput={this.onNameChange}
          onKeyPress={this.onSubmitName}
          value={this.state.username}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onInput={this.onMessageChange}
          onKeyPress={this.onSubmitMessage}
          value={this.state.chatMessage}
        />
      </footer>
    );
  }
}

export default ChatBar;
