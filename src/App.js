import React from "react";
import Board from "./Board";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      history: [
        {
          squares: Array(19 * 19).fill(null),
        },
      ],
      squares: Array(19 * 19).fill(null),
      blakeIsNext: true,
    };
  }

  // 点击事件
  handleClick(i) {
    const { step, history, squares, blakeIsNext } = this.state;

    // 避免重复下棋
    if (squares[i]) {
      return;
    }

    if (winnerIs(squares)) {
      return;
    }
    //用于判断黑白棋
    const newSquares = squares.slice();
    newSquares[i] = blakeIsNext ? "B" : "W";

    this.setState({
      step: step + 1,
      history: history.concat({
        squares: newSquares,
      }),
      squares: newSquares,
      blakeIsNext: !blakeIsNext,
    });
  }
  //重开清空
  handleReset() {
    this.setState({
      step: 0,
      history: [
        {
          squares: Array(19 * 19).fill(null),
        },
      ],
      squares: Array(19 * 19).fill(null),
      blakeIsNext: true,
    });
  }

  render() {
    const { squares, blakeIsNext } = this.state;
    const status = "下一位： " + (blakeIsNext ? "黑棋- " : "白棋- ");
    const winner = winnerIs(squares);

    const block = Array(18 * 18).fill(null);

    return (
      <div>
        <div className="game container my-3">
          <div className="game__title">
            <h2 className="game__title2 ">五子棋</h2>
          </div>
          <div className="game__field">
            <div className="game__board__bg">
              {block.map((item, index) => (
                <div className="block" key={index}>
                  {item}
                </div>
              ))}
            </div>
            <Board squares={squares} onClick={(i) => this.handleClick(i)} />
          </div>
          <div className="game__info my-3">
            <div>{status}</div>
            <div>
              {winner && (
                <span>
                  游戏結束。贏家是：{winner === "B" ? "黑棋" : "白棋"}
                </span>
              )}
            </div>
            <div>
              <button
                type="button"
                className="btn btn-secondary my-3"
                onClick={() => this.handleReset()}
              >
                重新开始
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// 判断胜利
function winnerIs(squares) {
  // 先定义5×5的几种连线方式
  const lines = [
    [0, 1, 2, 3, 4],
    [19, 20, 21, 22, 23],
    [38, 39, 40, 41, 42],
    [57, 58, 59, 60, 61],
    [76, 77, 78, 79, 80],
    [0, 19, 38, 57, 76],
    [1, 20, 39, 58, 77],
    [2, 21, 40, 59, 78],
    [3, 22, 41, 60, 79],
    [4, 23, 42, 61, 80],
    [0, 20, 40, 60, 80],
    [4, 22, 40, 58, 76],
  ];

  for (let i = 0; i <= 14; i++) {
    // 5*5 横坐标

    for (let j = 0; j <= 14; j++) {
      // 5*5 纵坐标
      const newlines = lines.map((line) => {
        const newline = line.map((num) => num + i * 19 + j);
        return newline;
      });

      for (let k = 0; k < newlines.length; k++) {
        const [a, b, c, d, e] = newlines[k];
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c] &&
          squares[a] === squares[d] &&
          squares[a] === squares[e]
        ) {
          return squares[a];
        }
      }
    }
  }
  return null;
}

export default App;