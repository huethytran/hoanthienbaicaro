import React from 'react';
import { Launcher } from 'react-chat-window';

class Chat extends React.Component {
  _onMessageWasSent(message) {
    const { sendMessage } = this.props;
    sendMessage(message);
  }

  render() {
    const { messages, competitor } = this.props;

    return (
      <div>
        <Launcher
          agentProfile={{
            teamName: `${competitor}`,
            imageUrl:
              'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={messages}
          showEmoji
        />
      </div>
    );
  }
}

export default Chat;
