import React from 'react';
import Board from '../board';
import { calculateWinner } from '../../utils/calculate-winner';

interface GameProps {
    value: string;
}
interface State {
    history: {}[];
    xIsNext: boolean;
    stepNumber: number;
}

export default class Game extends React.Component<GameProps, State> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),

            }],
            stepNumber: 0,
            xIsNext: true
        }
    }
    handleClick(i: any) {
        const history = this.state.history;
        const current: any = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
        history: history.concat([{
            squares: squares,
        }]),
        xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step: number) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }


    render() {
        const history = this.state.history;
        const current: any = history[history.length - 1];
        const winner = calculateWinner(current.squares);
    
        const moves = history.map((step, move) => {
          const desc = move ?
            'Go to move #' + move :
            'Go to game start';
          return (
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
        });
    
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
    
        return (
          <div className="game">
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={(i: any) => this.handleClick(i)}
              />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <ol>{moves}</ol>
            </div>
          </div>
        );
      }
}