import 'antd/dist/antd.css';
import { Button } from 'antd';
import React from 'react';

import Board from './Board';
import History from './History';
import User from '../containers/User';
import Chat from '../containers/Chat';

class Game extends React.Component {
  render() {
    const {
      squares,
      winner,
      status,
      preStep,
      history,
      backStep,
      handleSortButtonClick,
      handleClick,
      handleHistoryClick,
      sortHistory,
      requestReplay,
      requestUndo,
      sendMessage,
      competitor,
      onLogout
    } = this.props;

    return (
      <div className="app">
        <div className="game-info">
          <p className="title">Caro VN</p>
          <div className="competitor">
            Competitor: &nbsp; <div className="username">{competitor}</div>
          </div>
          <p>{status}</p>
          <Button
            type="dashed"
            size="default"
            shape="round"
            onClick={requestReplay}
            style={{ width: '100px' }}
          >
            Play Again
          </Button>
          &nbsp; &nbsp; &nbsp;
          <Button
            type="dashed"
            size="default"
            shape="round"
            onClick={requestUndo}
            style={{ width: '100px' }}
          >
            Undo
          </Button>
          <Chat sendMessage={message => sendMessage(message)} />
        </div>
        <div className="game">
          <Board
            preStep={preStep}
            squares={squares}
            history={history}
            backStep={backStep}
            winner={winner}
            onClick={i => handleClick(i, winner.kq)}
          />
        </div>

        <div className="divhistory">
          <User onLogout={onLogout} />
          <div className="divhistory1">
            <p>&nbsp;&nbsp;History</p>
            <Button
              className="btnSort"
              type="primary"
              size="large"
              onClick={handleSortButtonClick}
            >
              Sort
            </Button>
          </div>
          <div className="history">
            <History
              history={history}
              backStep={backStep}
              sortHistory={sortHistory}
              onClick={i => handleHistoryClick(i)}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Game;
