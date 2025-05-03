import { Node } from "./Node.js";

class Board {
  constructor() {
    this.board = [];
  }

  createBoard() {
    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) {
        row.push(new Node([i, j]));
      }

      this.board.push(row);
    }
  }

  printBoard() {
    for (let i = 7; i >= 0; i--) {
      const row = this.board[i]
        .map((cell) => {
          const [x, y] = cell.vertex;
          return `[${x},${y}]`;
        })
        .join(" ");
      console.log(row);
    }
  }

  possibleMoves(current) {
    let possibleMoves = [
      [2, 1],
      [2, -1],
      [1, 2],
      [1, -2],
      [-1, -2],
      [-1, 2],
      [-2, 1],
      [-2, -1],
    ];

    for (let next of possibleMoves) {
      const currentValue = this.board[current[0]][current[1]].vertex;
      if (
        currentValue[0] + next[0] >= 0 &&
        currentValue[0] + next[0] <= 7 &&
        currentValue[1] + next[1] >= 0 &&
        currentValue[1] + next[1] <= 7
      ) {
        this.board[current[0]][current[1]].edges.push([
          currentValue[0] + next[0],
          currentValue[1] + next[1],
        ]);
      }
    }

    return this.board[[current[0]]][current[1]].edges;
  }

  knightMove(current, to) {
    this.possibleMoves(current);
    console.log(to);
    for (let x of this.board) {
      for (let j of x) {
        if (j.edges.some((edge) => edge[0] === to[0] && edge[1] === to[1])) {
          console.log("Edge found");
        } else {
          console.log("Edge not found");
        }
      }
    }
  }
}

const board = new Board();
board.createBoard();
console.log(board.possibleMoves([0, 0]));
