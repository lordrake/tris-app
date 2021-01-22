import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {

    return (
      <button className="cell" onClick={() => {props.onClick()}}>
        {props.value}
      </button>
    );

}

class Board extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
    this.resetGame = this.resetGame.bind(this);

  }

  handleClick(i) {

    //copio l'array
    const squares = this.state.squares.slice();
    if (!squares[i]) {
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState(
        {
          squares: squares,
          xIsNext: !this.state.xIsNext
        }
      );
    }

  }

  renderSquare(i) {
    return (<Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)} />
    );
  }

  resetGame () {
    this.setState(
      {
        squares: Array(9).fill(null),
        xIsNext: true
      }
    );
  }

  render() {

    const winner = calculateWinner(this.state.squares);

    let status;
    if (winner) {
      status = "Ha vinto " + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{ status }</div>
        <div id="game-screen" class="center hidden">
          <table class="center">
            <tr>
              <td>{this.renderSquare(0)}</td>
              <td>{this.renderSquare(1)}</td>
              <td>{this.renderSquare(2)}</td>
            </tr>
            <tr>
              <td>{this.renderSquare(3)}</td>
              <td>{this.renderSquare(4)}</td>
              <td>{this.renderSquare(5)}</td>
            </tr>
            <tr>
              <td>{this.renderSquare(6)}</td>
              <td>{this.renderSquare(7)}</td>
              <td>{this.renderSquare(8)}</td>
            </tr>
          </table>
        </div>
        <button className="rigioca" onClick={this.resetGame}>Gioca ancora!</button>
      </div>

    );
  }
}

class Game extends React.Component {



  render () {
    return (
      <div className="game">
        <div className="game-info">
        </div>
          <Board />
      </div>
    );
  }
}

/* ----------------- */
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const linesToCheck = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  for (let i = 0; i< linesToCheck.length; i++) {
    const [a, b, c] = linesToCheck[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
