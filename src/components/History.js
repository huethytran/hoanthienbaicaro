import React from 'react';

class History extends React.Component {
  renderHistory(i) {
    if (i === this.props.history.length - 1 + this.props.backStep)
      return (
        <button
          key={i}
          onClick={() => this.props.onClick(i)}
          className="hisIsChosen"
        >
          #{i + 1}: {this.props.history[i].player}(
          {parseInt(this.props.history[i].step / 20, 10)},{' '}
          {parseInt(this.props.history[i].step / 10, 10) % 2 === 0
            ? this.props.history[i].step % 10
            : (this.props.history[i].step % 10) + 10}
          )
        </button>
      );
    return (
      <button key={i} onClick={() => this.props.onClick(i)} className="his">
        #{i + 1}: {this.props.history[i].player}(
        {parseInt(this.props.history[i].step / 20, 10)},{' '}
        {parseInt(this.props.history[i].step / 10, 10) % 2 === 0
          ? this.props.history[i].step % 10
          : (this.props.history[i].step % 10) + 10}
        )
      </button>
    );
  }

  renderAllHistory() {
    const his = Array(this.props.history.length).fill(null);
    if (this.props.history[0].player != null) {
      if (this.props.isAsc === true) {
        for (let i = 0; i < this.props.history.length; i++) {
          his.push(this.renderHistory(i));
        }
      } else {
        for (let i = this.props.history.length - 1; i >= 0; i--) {
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
