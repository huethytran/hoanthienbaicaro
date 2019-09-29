import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    if (this.props.winner.kq != null) {
      if (
        this.props.preStep + this.props.winner.vt * this.props.winner.type ===
          i ||
        this.props.preStep +
          (this.props.winner.vt + 1) * this.props.winner.type ===
          i ||
        this.props.preStep +
          (this.props.winner.vt + 2) * this.props.winner.type ===
          i ||
        this.props.preStep +
          (this.props.winner.vt + 3) * this.props.winner.type ===
          i ||
        this.props.preStep +
          (this.props.winner.vt + 4) * this.props.winner.type ===
          i
      )
        return (
          <Square
            value={this.props.squares[i]}
            isChosen={false}
            isWin
            onClick={() => this.props.onClick(i)}
          />
        );
      return (
        <Square
          value={this.props.squares[i]}
          isChosen={false}
          isWin={false}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
    if (
      this.props.history[this.props.history.length - 1 + this.props.backStep]
        .step === i
    )
      return (
        <Square
          value={this.props.squares[i]}
          isChosen
          isWin={false}
          onClick={() => this.props.onClick(i)}
        />
      );
    return (
      <Square
        value={this.props.squares[i]}
        isChosen={false}
        isWin={false}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderAllSquares() {
    const matrixSize = Math.sqrt(this.props.squares.length);
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
