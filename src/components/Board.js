import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { numberCell } from '../core/constants';

class Board extends React.Component {
  static propTypes = {
    winner: PropTypes.objectOf(
      PropTypes.shape({
        kq: PropTypes.string.isRequired,
        type: PropTypes.number.isRequired,
        vt: PropTypes.number.isRequired
      }).isRequired
    ).isRequired,
    backStep: PropTypes.number.isRequired,
    preStep: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        player: PropTypes.string.isRequired,
        step: PropTypes.number.isRequired
      }).isRequired
    ).isRequired,
    squares: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
  };

  renderSquare(i) {
    const { winner, preStep, squares, history, backStep, onClick } = this.props;

    if (winner.kq != null) {
      if (
        preStep + winner.vt * winner.type === i ||
        preStep + (winner.vt + 1) * winner.type === i ||
        preStep + (winner.vt + 2) * winner.type === i ||
        preStep + (winner.vt + 3) * winner.type === i ||
        preStep + (winner.vt + 4) * winner.type === i
      )
        return (
          <Square
            value={squares[i]}
            isChosen={false}
            isWin
            onClick={() => onClick(i)}
          />
        );
      return (
        <Square
          value={squares[i]}
          isChosen={false}
          isWin={false}
          onClick={() => onClick(i)}
        />
      );
    }
    if (history[history.length - 1 + backStep].step === i)
      return (
        <Square
          value={squares[i]}
          isChosen
          isWin={false}
          onClick={() => onClick(i)}
        />
      );
    return (
      <Square
        value={squares[i]}
        isChosen={false}
        isWin={false}
        onClick={() => onClick(i)}
      />
    );
  }

  renderAllSquares() {
    const matrixSize = numberCell;
    const board = Array(matrixSize).fill(null);
    for (let i = 0; i < matrixSize; i++) {
      const squares = Array(matrixSize).fill(null);
      for (let j = 0; j < matrixSize; j++) {
        const squareKey = i * matrixSize + j;
        squares.push(
          <span key={squareKey}>{this.renderSquare(squareKey)}</span>
        );
      }
      board.push(<div key={i}>{squares}</div>);
    }
    return board;
  }

  render() {
    return (
      <div>
        <div>{this.renderAllSquares()}</div>
      </div>
    );
  }
}
export default Board;
