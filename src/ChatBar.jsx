import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatMessage: ''
    }
    this.onMessageChange = this.onMessageChange.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
  }

  // onMessageChange function listens for changes in input
  // and sets chatMessage state to current input value
  onMessageChange(event) {
    this.setState({
      chatMessage: event.target.value
    })
  }

  // onSubmitMessage function listens for enter keypress and
  // invokes addMessage function from APP to add msg to MessageList
  onSubmitMessage(event) {
    if (event.key == 'Enter'){
      this.props.addMessage(this.state.chatMessage);
      this.setState({
        chatMessage: ''
      })
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={ this.props.currentUser }
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onInput={ this.onMessageChange }
          onKeyPress={ this.onSubmitMessage }
          value={ this.state.chatMessage }
        />
      </footer>
    );
  }
}

export default ChatBar;
