import 'antd/dist/antd.css';
import { Button } from 'antd';
import React from 'react';
import Board from './Board';
import History from './History';
import User from '../containers/User';

class Game extends React.Component {
  render() {
    const {
      squares,
      winner,
      status,
      replay,
      preStep,
      history,
      backStep,
      handleSortButtonClick,
      handleClick,
      handleHistoryClick,
      sortHistory
    } = this.props;
    console.log(winner.vt);
    return (
      <div className="app">
        <div className="game-info">
          <p className="title">Caro VN</p>
          <p>{status}</p>
          <Button type="dashed" size="large" shape="round" onClick={replay}>
            Play Again
          </Button>
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
          <User />
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
