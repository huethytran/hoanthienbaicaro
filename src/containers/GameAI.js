import React from 'react';
import { connect } from 'react-redux';
import GameComponent from '../components/GameAI';
import * as actions from '../actions/index';
import { players, sort } from '../core/constants';
import { calculateWinner } from '../algorithm/main';
// import ai from 'gomokuai';
import * as ai from '../algorithm/AI';

class GameAI extends React.Component {
  onLogout = () => {
    const { logout } = this.props;
    logout();
  };

  replay = () => {
    const { replay, setWinner } = this.props;
    replay();
    const Winner = {
      kq: null,
      type: 0,
      vt: 0
    };
    setWinner(Winner);
  };

  handleSortButtonClick = () => {
    const { sortHistory, switchSort } = this.props;
    if (sortHistory === sort.Asc) switchSort(sort.Desc);
    else switchSort(sort.Asc);
  };

  AIMove = () => {
    const {
      squares,
      history,
      numOfStep,
      switchPlayer,
      currentPlayer,
      addStep,
      addHistory,
      setWinner,
      isEasyLevel
    } = this.props;
    const History = [...history];
    const Squares = [...squares];
    let NumOfStep = numOfStep;
    const Squares1 = Array(400).fill(null);

    let best = { x: 0, y: 0 };
    if (isEasyLevel === true) best = ai.bestMove(squares, 20, 1);
    else {
      for (let j = 0; j < 400; j++) {
        if (squares[j] === 'X') Squares1[j] = 1;
        else if (squares[j] === 'O') Squares1[j] = 2;
        else Squares1[j] = 0;
      }
      best = ai.bestMove(Squares1, 20, 2);
    }
    console.log(best);
    if (history.length === 1) {
      if (parseInt(history[0].step / 20, 10) - 1 >= 0)
        best.y = parseInt(history[0].step / 20, 10) - 1;
      if (parseInt(history[0].step % 20, 10) - 1 >= 0)
        best.x = parseInt(history[0].step % 20, 10) - 1;
    }
    Squares[best.x + best.y * 20] = currentPlayer;
    switchPlayer(players.X);
    const PreStep = best.x + best.y * 20;
    History[NumOfStep] = {
      player: currentPlayer,
      step: best.x + best.y * 20
    };
    NumOfStep += 1;
    addStep(Squares, PreStep);
    addHistory(NumOfStep, 0, History);
    setWinner(calculateWinner(Squares, PreStep));
  };

  handleClick(i) {
    const {
      numOfStep,
      backStep,
      history,
      squares,
      currentPlayer,
      winner,
      switchPlayer,
      addStep,
      addHistory,
      setWinner
    } = this.props;

    let NumOfStep = numOfStep - Math.abs(backStep);
    const History = [...history];
    History.splice(NumOfStep, Math.abs(backStep));
    const BackStep = 0;
    const Squares = [...squares];
    if (
      squares[i] === null &&
      winner.kq === null &&
      currentPlayer === players.X
    ) {
      Squares[i] = currentPlayer;
      switchPlayer(players.O);
      const PreStep = i;
      History[NumOfStep] = {
        player: currentPlayer,
        step: i
      };
      NumOfStep += 1;
      addStep(Squares, PreStep);
      addHistory(NumOfStep, BackStep, History);
      setWinner(calculateWinner(Squares, PreStep));
    }
  }

  handleHistoryClick(i) {
    const {
      backStep,
      history,
      squares,
      switchPlayer,
      goToStep,
      preStep,
      setWinner
    } = this.props;
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
    if (History[i].player === 'X')
      Squares[History[i + 1].step] = History[i + 1].player;
    switchPlayer(players.X);
    goToStep(BackStep, Squares);
    setWinner(calculateWinner(Squares, preStep));
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
      competitor,
      getUser,
      winner,
      switchLevel
    } = this.props;

    const Squares = squares.slice();
    let status;
    if (winner.kq) {
      status = `Winner is: ${winner.kq}`;
    }
    // Nếu winner có giá trị thì sẽ hiển thị người thắng cuộc
    else {
      status = `Next player is: ${currentPlayer}`;
      if (currentPlayer === players.O) this.AIMove();
    }
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
        competitor={competitor}
        getUser={getUser}
        onLogout={this.onLogout}
        replay={this.replay}
        switchLevel={switchLevel}
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
  winner: state.game.winner,
  competitor: state.user.competitor,
  username: state.user.username,
  isEasyLevel: state.game.isEasyLevel
});
const mapDispatchToProps = dispatch => {
  return {
    switchPlayer: data => {
      dispatch(actions.switchPlayer(data));
    },
    goToStep: (step, newArr) => {
      dispatch(actions.goToStep(step, newArr));
    },
    addStep: (newArr, preStep) => {
      dispatch(actions.addStep(newArr, preStep));
    },
    addHistory: (numOfStep, backStep, history) => {
      dispatch(actions.addHistory(numOfStep, backStep, history));
    },
    setWinner: data => {
      dispatch(actions.setWinner(data));
    },
    replay: data => {
      dispatch(actions.replay(data));
    },
    switchSort: data => {
      dispatch(actions.switchSort(data));
    },
    logout: () => {
      dispatch(actions.logOut());
    },
    switchLevel: () => {
      dispatch(actions.switchLevel());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameAI);
