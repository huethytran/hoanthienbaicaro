import React from 'react';
import { connect } from 'react-redux';
import GameComponent from '../components/Game';
import * as actions from '../actions/index';
import { players, sort } from '../core/constants';
import { calculateWinner } from '../algorithm/main';

class Game extends React.Component {
  replay = () => {
    const { dispatch } = this.props;
    dispatch(actions.replay());
    const Winner = {
      kq: null,
      type: 0,
      vt: 0
    };
    dispatch(actions.setWinner(Winner));
  };

  handleSortButtonClick = () => {
    const { sortHistory, dispatch } = this.props;
    if (sortHistory === sort.Asc) dispatch(actions.switchSort(sort.Desc));
    else dispatch(actions.switchSort(sort.Asc));
  };

  handleClick(i) {
    const {
      numOfStep,
      backStep,
      history,
      squares,
      currentPlayer,
      dispatch,
      winner
    } = this.props;
    let NumOfStep = numOfStep - Math.abs(backStep);
    const History = [...history];
    History.splice(NumOfStep, Math.abs(backStep));
    const BackStep = 0;
    const Squares = [...squares];
    if (squares[i] === null && winner.kq === null) {
      Squares[i] = currentPlayer;
      dispatch(
        actions.switchPlayer(
          currentPlayer === players.X ? players.O : players.X
        )
      );
      const PreStep = i;
      History[NumOfStep] = {
        player: currentPlayer,
        step: i
      };
      NumOfStep += 1;
      dispatch(actions.addStep(Squares, PreStep));
      dispatch(actions.addHistory(NumOfStep, BackStep, History));
      dispatch(actions.setWinner(calculateWinner(Squares, PreStep)));
    }
  }

  handleHistoryClick(i) {
    const { backStep, history, squares, dispatch, preStep } = this.props;
    let BackStep = backStep;
    const History = [...history];
    const Squares = [...squares];
    if (i < history.length - 1 + backStep) {
      BackStep = -History.length + i + 1;
      for (let j = History.length - 1; j > i; j--)
        Squares[History[j].step] = null;
    }
    if (i > History.length - 1 + BackStep) {
      for (let j = History.length + BackStep; j <= i; j++)
        Squares[History[j].step] = History[j].player;
      BackStep = -History.length + i + 1;
    }
    if (History[i].player === 'X') dispatch(actions.switchPlayer(players.O));
    else dispatch(actions.switchPlayer(players.X));
    dispatch(actions.goToStep(BackStep, Squares));
    dispatch(actions.setWinner(calculateWinner(Squares, preStep)));
  }

  render() {
    const {
      squares,
      preStep,
      currentPlayer,
      numOfStep,
      backStep,
      history,
      sortHistory,
      winner
    } = this.props;
    const Squares = squares.slice();
    let status;
    if (winner.kq) {
      status = `Winner is: ${winner.kq}`;
    }
    // Nếu winner có giá trị thì sẽ hiển thị người thắng cuộc
    else status = `Next player is: ${currentPlayer}`;
    return (
      <GameComponent
        squares={Squares}
        preStep={preStep}
        currentPlayer={currentPlayer}
        winner={winner}
        status={status}
        numOfStep={numOfStep}
        backStep={backStep}
        history={history}
        sortHistory={sortHistory}
        handleClick={i => this.handleClick(i, winner.kq)}
        handleSortButtonClick={this.handleSortButtonClick}
        handleHistoryClick={i => this.handleHistoryClick(i)}
        replay={this.replay}
      />
    );
  }
}
const mapStateToProps = state => ({
  numOfStep: state.history.numOfStep,
  backStep: state.history.backStep,
  preStep: state.game.preStep,
  history: state.history.history,
  squares: state.game.squares,
  currentPlayer: state.game.currentPlayer,
  sortHistory: state.history.sortHistory,
  winner: state.game.winner
});

export default connect(mapStateToProps)(Game);
