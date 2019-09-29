import 'antd/dist/antd.css';
import { Button } from 'antd';
import React from 'react';
import Board from './Board';
import History from './History';

function isBlocked(squares, preStep, block1, block2) {
  if (block1 === -1)
    if (squares[block2] && squares[block2] !== squares[preStep]) return true;
  if (block2 === -1)
    if (squares[block1] && squares[block1] !== squares[preStep]) return true;
  if (
    squares[block1] &&
    squares[block2] &&
    squares[block2] === squares[block1] &&
    squares[block2] !== squares[preStep]
  )
    return true;
  return false;
}

function calculateWinner(squares, preStep) {
  // xet hang ngang
  for (let i = -4; i <= 0; i++) {
    if (preStep + i - parseInt(preStep / 20, 10) * 20 >= 0) {
      if (
        squares[preStep + i] === squares[preStep + i + 1] &&
        squares[preStep + i] === squares[preStep + i + 2] &&
        squares[preStep + i] === squares[preStep + i + 3] &&
        squares[preStep + i] === squares[preStep + i + 4]
      )
        if (
          isBlocked(
            squares,
            preStep,
            preStep + i - 1 - parseInt(preStep / 20, 10) * 20 >= 0
              ? preStep + i - 1
              : -1,
            (preStep + i + 5) / 20 === parseInt((preStep + i + 5) / 20, 10)
              ? -1
              : preStep + i + 5
          ) === false
        )
          return { kq: squares[preStep], type: 1, vt: i };
    }
  }
  // xet hang doc
  for (let i = -4; i <= 0; i++) {
    if (preStep + i * 20 >= 0) {
      if (
        squares[preStep + i * 20] === squares[preStep + (i + 1) * 20] &&
        squares[preStep + i * 20] === squares[preStep + (i + 2) * 20] &&
        squares[preStep + i * 20] === squares[preStep + (i + 3) * 20] &&
        squares[preStep + i * 20] === squares[preStep + (i + 4) * 20]
      )
        if (
          isBlocked(
            squares,
            preStep,
            preStep + (i - 1) * 20 >= 0 ? preStep + (i - 1) * 20 : -1,
            preStep + (i + 5) * 20 >= 400 ? -1 : preStep + (i + 5) * 20
          ) === false
        )
          return { kq: squares[preStep], type: 20, vt: i };
    }
  }
  // xet hang cheo thu 1
  for (let i = -4; i <= 0; i++) {
    if (preStep + i * 21 >= 0) {
      if (
        squares[preStep + i * 21] === squares[preStep + (i + 1) * 21] &&
        squares[preStep + i * 21] === squares[preStep + (i + 2) * 21] &&
        squares[preStep + i * 21] === squares[preStep + (i + 3) * 21] &&
        squares[preStep + i * 21] === squares[preStep + (i + 4) * 21]
      ) {
        if (
          isBlocked(
            squares,
            preStep,
            preStep + (i - 1) * 21 >= 0 &&
              parseInt((preStep + (i - 1) * 21) / 10, 10) + 2 ===
                parseInt((preStep + i * 21) / 10, 10)
              ? preStep + (i - 1) * 21
              : -1,
            preStep + (i + 5) * 21 < 400 &&
              parseInt((preStep + (i + 5) * 21) / 10, 10) - 2 ===
                parseInt((preStep + (i + 4) * 21) / 10, 10)
              ? preStep + (i + 5) * 21
              : -1
          ) === false
        )
          return { kq: squares[preStep], type: 21, vt: i };
      }
    }
  }
  // xet hang cheo thu 2
  for (let i = -4; i <= 0; i++) {
    if (preStep + i * 19 >= 0) {
      if (
        squares[preStep + i * 19] === squares[preStep + (i + 1) * 19] &&
        squares[preStep + i * 19] === squares[preStep + (i + 2) * 19] &&
        squares[preStep + i * 19] === squares[preStep + (i + 3) * 19] &&
        squares[preStep + i * 19] === squares[preStep + (i + 4) * 19]
      ) {
        if (
          isBlocked(
            squares,
            preStep,
            preStep + (i - 1) * 19 >= 0 &&
              parseInt((preStep + (i - 1) * 19) / 10, 10) + 2 ===
                parseInt((preStep + i * 19) / 10, 10)
              ? preStep + (i - 1) * 19
              : -1,
            preStep + (i + 5) * 19 < 400 &&
              parseInt((preStep + (i + 5) * 19) / 10, 10) - 2 ===
                parseInt((preStep + (i + 4) * 19) / 10, 10)
              ? preStep + (i + 5) * 19
              : -1
          ) === false
        )
          return { kq: squares[preStep], type: 19, vt: i };
      }
    }
  }
  return {
    kq: null,
    type: 0,
    vt: 0
  };
}
class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(400).fill(null),
      xIsNext: true,
      preStep: -1,
      history: [{ player: null, step: 0 }],
      numOfStep: 0,
      backStep: 0,
      isAsc: true
    };
    this.replay = this.replay.bind(this);
    this.handleHistoryClick = this.handleHistoryClick.bind(this);
    this.handleSortButtonClick = this.handleSortButtonClick.bind(this);
  }

  handleClick(i, winner) {
    const { squares } = this.state;
    const { xIsNext } = this.state;
    const { history } = this.state;
    let { numOfStep } = this.state;
    const { backStep } = this.state;
    numOfStep -= Math.abs(backStep);
    history.splice(numOfStep, Math.abs(backStep));
    this.setState({ backStep: 0 });
    if (squares[i] === null && winner === null) {
      squares[i] = xIsNext ? 'X' : 'O';
      xIsNext
        ? this.setState({ xIsNext: false })
        : this.setState({ xIsNext: true });
      this.setState({ preStep: i });
      history[numOfStep] = {
        player: xIsNext ? 'X' : 'O',
        step: i
      };
      numOfStep += 1;
    }
  }

  handleSortButtonClick() {
    const { isAsc } = this.state;
    if (isAsc === true) this.setState({ isAsc: false });
    else this.setState({ isAsc: true });
  }

  handleHistoryClick(i) {
    const { history } = this.state;
    const { squares } = this.state;
    let { backStep } = this.state;
    if (i < history.length - 1 + backStep) {
      backStep = -history.length + i + 1;
      for (let j = history.length - 1; j > i; j--)
        squares[history[j].step] = null;
    }
    if (i > history.length - 1 + backStep) {
      for (let j = history.length + backStep; j <= i; j++)
        squares[history[j].step] = history[j].player;
      backStep = -history.length + i + 1;
    }
    if (history[i].player === 'X') this.setState({ xIsNext: false });
    else this.setState({ xIsNext: true });
  }

  replay() {
    this.setState({
      squares: Array(400).fill(null),
      xIsNext: true,
      preStep: -1,
      history: [{ player: null, step: 0 }],
      numOfStep: 0,
      backStep: 0
    });
  }

  render() {
    const { squares } = this.state;
    const { xIsNext } = this.state;
    const { history } = this.state;
    const { backStep } = this.state;
    const { preStep } = this.state;
    const { isAsc } = this.state;
    const squrs = squares.slice();
    const winner = calculateWinner(squrs, preStep);
    let status;
    if (winner.kq) status = `Winner is: ${winner.kq}`;
    // Nếu winner có giá trị thì sẽ hiển thị người thắng cuộc
    else status = `Next player is: ${xIsNext ? 'X' : 'O'}`;
    return (
      <div className="app">
        <div className="game-info">
          <p className="title">Caro VN</p>
          <p>{status}</p>
          <Button
            type="dashed"
            size="large"
            shape="round"
            onClick={this.replay}
          >
            Play Again
          </Button>
        </div>
        <div className="game">
          <Board
            preStep={preStep}
            squares={squrs}
            history={history}
            backStep={backStep}
            winner={winner}
            onClick={i => this.handleClick(i, winner.kq)}
            xIsNext={xIsNext}
          />
        </div>
        <div className="divhistory">
          <div className="divhistory1">
            <p>&nbsp;&nbsp;History</p>
            <Button
              className="btnSort"
              type="primary"
              size="large"
              onClick={this.handleSortButtonClick}
            >
              Sort
            </Button>
          </div>
          <div className="history">
            <History
              history={history}
              backStep={backStep}
              isAsc={isAsc}
              onClick={i => this.handleHistoryClick(i)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
