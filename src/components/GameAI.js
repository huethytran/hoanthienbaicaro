import 'antd/dist/antd.css';
import { Button, Radio } from 'antd';
import React from 'react';

import Board from './Board';
import History from './History';
import User from '../containers/User';

class GameAI extends React.Component {
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
      replay,
      onLogout,
      switchLevel
    } = this.props;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
      color: 'white',
      fontSize: '20px'
    };
    return (
      <div className="app">
        <div className="game-info">
          <p className="title">Caro VN</p>
          <p>{status}</p>
          <Button type="dashed" size="large" shape="round" onClick={replay}>
            Play Again
          </Button>
          <br />
          <br />
          <p>Choose level:</p>
          <Radio.Group
            defaultValue={1}
            size="default"
            buttonStyle="solid"
            onChange={switchLevel}
          >
            <Radio style={radioStyle} value={1}>
              Easy Level
            </Radio>
            <br />
            <Radio style={radioStyle} value={2}>
              Hard Level
            </Radio>
          </Radio.Group>
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
export default GameAI;
