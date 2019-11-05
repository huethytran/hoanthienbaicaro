import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Modal, Spin } from 'antd';
import GameComponent from '../components/Game';
import * as actions from '../actions/index';
import { players, sort } from '../core/constants';
import { calculateWinner } from '../algorithm/main';

class Game extends React.Component {
  socket = io('http://btcn06-1612685.herokuapp.com')
    .on('Already-found-player', (data, playFirst) => {
      this.alreadyFoundPlayer(data, playFirst);
    })
    .on('Competitor-had-ticked', data => {
      this.competitorHadTicked(data);
    })

    .on('Competitor-out-game', () => {
      this.info();
    })
    .on('Competitor-request-undo', () => {
      this.requestUndoModal();
    })
    .on('Competitor-accept-undo', () => {
      this.AcceptUndo();
      this.requestUndoSuccess();
    })
    .on('Competitor-reject-undo', () => {
      this.requestUndoFailed();
    })
    .on('Competitor-reject-replay', () => {
      this.requestReplayFailed();
    })

    .on('Competitor-accept-replay', () => {
      this.requestReplaySuccess();
    })
    .on('Competitor-request-replay', () => {
      this.replayModal();
    })
    .on('Send-username-failed', () => {
      this.sendUsernameFailed();
    })
    .on('Competitor-send-message', data => {
      this.addCompetitorMessage(data);
    })
    .on('Competitor-request', type => {
      console.log('heloooooo', type);
      if (type === 1) this.surrenderModal();
      else this.drawModal();
    })
    .on('Competitor-accept-request', type => {
      this.requestSuccess(type);
    })
    .on('Competitor-reject-request', () => {
      this.requestFailed();
    });

  sendUsernameFailed = () => {
    const { switchIsSearching } = this.props;
    switchIsSearching(true);
    this.searchCompetitor();
  };

  requestSuccess = type => {
    const { competitor, setRequest, setWinner } = this.props;
    setRequest(false);
    let winner = {};
    if (type === 1) winner = { kq: competitor, type: 0, vt: 0 };
    else winner = { kq: 'undefined', type: 0, vt: 0 };
    setWinner(winner);
    Modal.success({
      content: `Player ${competitor} accepts your request.`
    });
  };

  requestFailed = () => {
    const { competitor, setRequest } = this.props;
    setRequest(false);
    Modal.error({
      content: `Player ${competitor} rejects your request.`
    });
  };

  acceptRequest = type => {
    const { setWinner, username } = this.props;
    let winner = {};
    if (type === 1) winner = { kq: username, type: 0, vt: 0 };
    else winner = { kq: 'undefined', type: 0, vt: 0 };
    setWinner(winner);
  };

  surrenderModal = () => {
    const { competitor } = this.props;
    const { confirm } = Modal;
    confirm({
      title: 'Ask For Surrender',
      content: `Player ${competitor} wants to surrender. Do you agree?`,
      okText: 'Agree',
      cancelText: 'Disagree',
      onOk: () => {
        this.acceptRequest(1);
        this.socket.emit('Client-send-accept-request', 1);
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel: () => {
        this.socket.emit('Client-send-reject-request', 1);
      }
    });
  };

  drawModal = () => {
    const { competitor } = this.props;
    const { confirm } = Modal;
    confirm({
      title: 'Ask For Draw',
      content: `Player ${competitor} wants to draw. Do you agree?`,
      okText: 'Agree',
      cancelText: 'Disagree',
      onOk: () => {
        this.acceptRequest(2);
        this.socket.emit('Client-send-accept-request', 2);
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel: () => {
        this.socket.emit('Client-send-reject-request', 2);
      }
    });
  };

  request = type => {
    console.log('requyest', type);
    const { setRequest, isRequest } = this.props;
    if (isRequest === false) {
      this.socket.emit('Client-send-request', type);
      setRequest(true);
    }
  };

  onLogout = () => {
    const { logout } = this.props;
    this.socket.emit('Client-logout');
    logout();
    window.location.assign('/');
  };

  requestUndoSuccess = () => {
    const { competitor } = this.props;

    Modal.success({
      content: `Player ${competitor} agreed to undo.`
    });
  };

  requestUndoFailed = () => {
    const { competitor, setRequestUndo } = this.props;
    Modal.error({
      content: `Player ${competitor} disagreed to undo.`
    });
    setRequestUndo(false);
  };

  requestReplaySuccess = () => {
    const { competitor, winner, username, setRequestReplay } = this.props;
    const playFirst = winner.kq === null ? username : winner.kq;
    this.replay(playFirst);
    setRequestReplay(false);
    Modal.success({
      content: `Player ${competitor} accepts to replay.`
    });
  };

  requestReplayFailed = () => {
    const { competitor, setRequestReplay } = this.props;
    setRequestReplay(false);
    Modal.error({
      content: `Player ${competitor} rejects to replay.`
    });
  };

  acceptReplay = () => {
    const { winner, competitor } = this.props;
    const playFirst = winner.kq === null ? competitor : winner.kq;
    this.replay(playFirst);
  };

  replayModal = () => {
    const { competitor } = this.props;
    const { confirm } = Modal;
    confirm({
      title: 'Replay',
      content: `Player ${competitor} wants to replay. Do you agree?`,
      okText: 'Agree',
      cancelText: 'Disagree',
      onOk: () => {
        this.acceptReplay();
        this.socket.emit('Client-send-accept-replay');
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel: () => {
        this.socket.emit('Client-send-reject-replay');
      }
    });
  };

  requestReplay = () => {
    const { setRequestReplay, isRequestReplay } = this.props;
    if (isRequestReplay === false) {
      this.socket.emit('Client-send-request-replay');
      setRequestReplay(true);
    }
  };

  requestUndoModal = () => {
    const { competitor } = this.props;
    const { confirm } = Modal;
    const modal = confirm({
      title: 'Request Undo',
      content: `Player ${competitor} requests to undo previous step. Do you agree?`,
      okText: 'Agree',
      cancelText: 'Disagree',
      onOk: () => {
        this.AcceptUndo();

        this.socket.emit('Client-send-accept-undo');
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel: () => {
        this.socket.emit('Client-send-reject-undo');
      }
    });
    this.socket.on('Competitor-cancel-request-undo', function() {
      modal.destroy();
    });
  };

  searchCompetitor = () => {
    const { username, isSearching } = this.props;
    console.log('send username', username, isSearching);
    this.socket.emit('Client-send-username', username);

    if (isSearching === true) {
      const modal = Modal.info({
        title: 'Looking for player',
        content: (
          <div>
            <Spin className="example" />
          </div>
        ),
        okText: 'Cancel',
        onOk: () => {
          window.location.assign('/');
        }
      });
      this.socket.on('Already-found-player', () => {
        modal.destroy();
      });
      this.socket.on('Send-username-failed', () => {
        modal.destroy();
      });
    }
  };

  replay = playFirst => {
    const { replay, setWinner } = this.props;
    replay(playFirst);
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

  componentDidUpdate = () => {
    const { username, callbackLink } = this.props;
    if (username === null) {
      callbackLink('/login');
      window.location.assign('/login');
    }
  };

  AcceptUndo = () => {
    const {
      squares,
      history,
      username,
      competitor,
      switchPlayerOnline,
      acceptUndo,
      switchPlayer,
      goToStep,
      setRequestUndo
    } = this.props;
    const Squares = [...squares];
    Squares[history[history.length - 1].step] = null;
    const History = [...history];
    History.splice(history.length - 1, 1);
    if (History[History.length - 1].player === 'X') switchPlayer(players.O);
    else switchPlayer(players.X);
    if (History[History.length - 1].playerOnline === username)
      switchPlayerOnline(competitor);
    else switchPlayerOnline(username);
    goToStep(0, Squares);
    acceptUndo(History);
    setRequestUndo(false);
  };

  requestUndo = () => {
    const { setRequestUndo, isRequestUndo } = this.props;
    if (isRequestUndo === false) {
      this.socket.emit('Client-send-request-undo');
      setRequestUndo(true);
    }
  };

  cancelRequestUndo = () => {
    const { setRequestUndo } = this.props;
    this.socket.emit('Client-send-cancel-request-undo');
    setRequestUndo(false);
  };

  info() {
    const { competitor, removeCompetitor, switchIsSearching } = this.props;
    Modal.info({
      title: `Player ${competitor} had left`,
      content: (
        <div>
          <p>Press OK to find another player.</p>
        </div>
      ),
      onOk: () => {
        removeCompetitor();
        switchIsSearching(true);
        this.socket.emit('Client-send-leave-room');
      }
    });
  }

  alreadyFoundPlayer(data, playFirst) {
    const {
      replay,
      switchPlayerOnline,
      username,
      setCompetitor,
      switchIsSearching,
      removeChat
    } = this.props;
    if (data !== username) {
      replay(null);
      if (playFirst === true) switchPlayerOnline(username);
      else switchPlayerOnline(data);
      console.log('Already found', data);
      setCompetitor(data);
      switchIsSearching(false);
      removeChat();
    }
  }

  addCompetitorMessage(data) {
    console.log('message', data);
    const { addMessage, competitor } = this.props;
    data.author = competitor;
    addMessage(data);
  }

  sendMessage(message) {
    const { addMessage } = this.props;
    this.socket.emit('Client-send-message', message);
    addMessage(message);
  }

  handleClick(i) {
    const {
      numOfStep,
      backStep,
      history,
      squares,
      currentPlayer,
      winner,
      username,
      switchPlayerOnline,
      competitor,
      isRequestUndo,
      currentPlayerOnline,
      switchPlayer,
      addStep,
      addHistory,
      setWinner
    } = this.props;
    let NumOfStep = numOfStep;
    const History = [...history];
    const BackStep = 0;
    const Squares = [...squares];
    if (
      squares[i] === null &&
      winner.kq === null &&
      currentPlayerOnline === username &&
      backStep === 0 &&
      isRequestUndo === false
    ) {
      Squares[i] = currentPlayer;
      switchPlayer(currentPlayer === players.X ? players.O : players.X);
      switchPlayerOnline(competitor);
      const PreStep = i;
      History[NumOfStep] = {
        player: currentPlayer,
        step: i,
        playerOnline: currentPlayerOnline
      };
      NumOfStep += 1;
      addStep(Squares, PreStep);
      addHistory(NumOfStep, BackStep, History);
      const Winner = calculateWinner(Squares, PreStep);
      console.log('Are you win', Winner);
      if (Winner.kq !== null) Winner.kq = currentPlayerOnline;
      setWinner(Winner);
      this.socket.emit('Client-send-tick-move', i);
    }
  }

  handleHistoryClick(i) {
    const {
      backStep,
      history,
      squares,
      switchPlayer,
      goToStep,
      winner,
      username,
      currentPlayerOnline
    } = this.props;
    if (winner === null && username === currentPlayerOnline) {
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
      if (History[i].player === 'X') switchPlayer(players.O);
      else switchPlayer(players.X);
      goToStep(BackStep, Squares);
    }
  }

  competitorHadTicked(data) {
    const {
      numOfStep,
      history,
      squares,
      currentPlayer,
      username,
      switchPlayerOnline,
      currentPlayerOnline,
      switchPlayer,
      addStep,
      addHistory,
      setWinner
    } = this.props;
    let NumOfStep = numOfStep;
    const History = [...history];
    const BackStep = 0;
    const Squares = [...squares];
    console.log('current player', currentPlayer);
    Squares[data] = currentPlayer;
    const PreStep = data;
    History[NumOfStep] = {
      player: currentPlayer,
      step: data,
      playerOnline: currentPlayerOnline
    };
    NumOfStep += 1;
    addStep(Squares, PreStep);
    switchPlayer(currentPlayer === players.X ? players.O : players.X);
    switchPlayerOnline(username);
    addHistory(NumOfStep, BackStep, History);
    const Winner = calculateWinner(Squares, PreStep);
    console.log(Winner);
    if (Winner.kq != null) {
      Winner.kq = currentPlayerOnline;
      setWinner(Winner);
    }
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
      isRequestReplay,
      isRequestUndo,
      currentPlayerOnline
    } = this.props;

    const Squares = squares.slice();
    let status;
    if (winner.kq) {
      status = `Winner is: ${winner.kq}`;
    }
    // Nếu winner có giá trị thì sẽ hiển thị người thắng cuộc
    else status = `Next player is: ${currentPlayerOnline}`;
    if (competitor === null) {
      console.log('alululululu');
      this.searchCompetitor();
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
        requestUndo={this.requestUndo}
        requestReplay={this.requestReplay}
        isRequestReplay={isRequestReplay}
        isRequestUndo={isRequestUndo}
        sendMessage={message => this.sendMessage(message)}
        onLogout={this.onLogout}
        sendRequest={type => this.request(type)}
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
  isRequestUndo: state.game.isRequestUndo,
  isRequestReplay: state.game.isRequestReplay,
  currentPlayerOnline: state.game.currentPlayerOnline,
  isSearching: state.game.isSearching,
  isRequest: state.game.isRequest
});
const mapDispatchToProps = dispatch => {
  return {
    setCompetitor: username => {
      dispatch(actions.setCompetitor(username));
    },
    removeCompetitor: () => {
      dispatch(actions.removeCompetitor());
    },
    switchPlayerOnline: data => {
      dispatch(actions.switchPlayerOnline(data));
    },
    acceptUndo: history => {
      dispatch(actions.acceptUndo(history));
    },
    setRequestUndo: data => {
      dispatch(actions.setRequestUndo(data));
    },
    setRequestReplay: data => {
      dispatch(actions.setRequestReplay(data));
    },
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
    switchIsSearching: data => {
      dispatch(actions.switchIsSearching(data));
    },
    addMessage: data => {
      dispatch(actions.addMessage(data));
    },
    removeChat: () => {
      dispatch(actions.removeChat());
    },
    logout: () => {
      dispatch(actions.logOut());
    },
    setRequest: data => {
      dispatch(actions.setRequest(data));
    },
    callbackLink: cbl => {
      dispatch(actions.callbackLink(cbl));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
