import React from 'react';

class History extends React.Component {
  renderHistory(i) {
    const { history } = this.props;
    const { backStep } = this.props;
    const { onClick } = this.props;

    if (i === history.length - 1 + backStep)
      return (
        <button key={i} onClick={() => onClick(i)} className="hisIsChosen">
          #{i + 1}: {history[i].player}({parseInt(history[i].step / 20, 10)},{' '}
          {parseInt(history[i].step / 10, 10) % 2 === 0
            ? history[i].step % 10
            : (history[i].step % 10) + 10}
          )
        </button>
      );
    return (
      <button key={i} onClick={() => onClick(i)} className="his">
        #{i + 1}: {history[i].player}({parseInt(history[i].step / 20, 10)},{' '}
        {parseInt(history[i].step / 10, 10) % 2 === 0
          ? history[i].step % 10
          : (history[i].step % 10) + 10}
        )
      </button>
    );
  }

  renderAllHistory() {
    const { history } = this.props;
    const { isAsc } = this.props;

    const his = Array(history.length).fill(null);
    if (history[0].player != null) {
      if (isAsc === true) {
        for (let i = 0; i < history.length; i++) {
          his.push(this.renderHistory(i));
        }
      } else {
        for (let i = history.length - 1; i >= 0; i--) {
          his.push(this.renderHistory(i));
        }
      }
    }
    return his;
  }

  render() {
    return (
      <div>
        <div>{this.renderAllHistory()}</div>
      </div>
    );
  }
}

export default History;
