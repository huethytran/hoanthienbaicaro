import React from 'react';

class Square extends React.Component {
  render() {
    const { value, isChosen, isWin, onClick } = this.props;
    if (value === 'X' && isChosen === false && isWin === true) {
      return (
        <button className="square x isWin" onClick={onClick}>
          {value}
        </button>
      );
    }
    if (value === 'O' && isChosen === false && isWin === true) {
      return (
        <button className="square o isWin" onClick={onClick}>
          {value}
        </button>
      );
    }
    if (value === 'X' && isChosen === true && isWin === false) {
      return (
        <button className="square x isChosen" onClick={onClick}>
          {value}
        </button>
      );
    }
    if (value === 'X' && isChosen === false && isWin === false) {
      return (
        <button className="square x" onClick={onClick}>
          {value}
        </button>
      );
    }
    if (value === 'O' && isChosen === true && isWin === false) {
      return (
        <button className="square o isChosen" onClick={onClick}>
          {value}
        </button>
      );
    }
    return (
      <button className="square o" onClick={onClick}>
        {value}
      </button>
    );
  }
}

export default Square;
