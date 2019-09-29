import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    const { winner } = this.props;
    const { preStep } = this.props;
    const { squares } = this.props;
    const { history } = this.props;
    const { backStep } = this.props;
    const { onClick } = this.props;
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
    const { squares } = this.props;
    const matrixSize = Math.sqrt(squares.length);
    const board = Array(matrixSize).fill(null);
    for (let i = 0; i < matrixSize; i++) {
      const squrs = Array(matrixSize).fill(null);
      for (let j = 0; j < matrixSize; j++) {
        const squareKey = i * matrixSize + j;
        squrs.push(<span key={squareKey}>{this.renderSquare(squareKey)}</span>);
      }
      board.push(<div key={i}>{squrs}</div>);
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
