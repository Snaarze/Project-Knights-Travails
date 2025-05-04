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

  possibleMoves() {
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

    for (let board of this.board) {
      for (let piece of board) {
        for (let next of possibleMoves) {
          if (
            piece.vertex[0] + next[0] >= 0 &&
            piece.vertex[0] + next[0] <= 7 &&
            piece.vertex[1] + next[1] >= 0 &&
            piece.vertex[1] + next[1] <= 7
          ) {
            piece.edges.push(
              this.board[piece.vertex[0] + next[0]][piece.vertex[1] + next[1]]
            );
          }
        }
      }
    }

    return this.board[3][3].edges;
  }

  knightMove(current, to) {
    //  get the current position
    let currentKnight = this.board[current[0]][current[1]];
    let queue = [];
    let visited = [];
    let isFound = false;
    // push it to the queue
    queue.push(currentKnight);
    // create a while loop as long as the queue has values or the move is not found continue looping
    while (queue.length !== 0) {
      currentKnight = queue[0];
      // pushes the current node to the queue if there are edges

      for (let currents of currentKnight.edges) {
        // this ensures that the there are no multiple entries and prevent infinite loop
        // the condition is if there are any existing values inside those two arrays that matches the current iteration
        // skips the current iteraton
        if (visited.includes(currents.vertex) || queue.includes(currents)) {
          continue;
        }

        // if those values doesnt exist yet we pushed it to the array and reassigned their parent
        currents.parent = currentKnight;
        queue.push(currents);
      }

      // if current Knight equals to the destination logs the found
      // if found stop the loop and return to where the root vertex
      if (
        currentKnight.vertex[0] === to[0] &&
        currentKnight.vertex[1] === to[1]
      ) {
        isFound = true;
        let path = [];
        // push the path from the start to end of the destination
        do {
          path.unshift(currentKnight.vertex);
          // change the currentKnight to the parent
          currentKnight = currentKnight.parent;
          // check the conidition if true or false
        } while (currentKnight.parent);
        path.unshift(current);
        console.log(
          "You made it in " + path.length + " moves! Here's your path"
        );
        for (let x of path) {
          console.log(x);
        }
        return console.log(current + "moved to " + to);
      }
      // remove the first element on the array
      queue.shift();

      // if visited array includes this connections simply return to do nothing
      if (visited.includes(currentKnight.vertex)) {
        continue;
      }
      // push the parent vertex so we know that the current has been visited already
      // then remove the first index that has been visited
      visited.push(currentKnight.vertex);
    }
    if (!isFound) {
      console.log("Cannot move from " + current + " to " + to);
    }
  }
}

const board = new Board();
board.createBoard();
board.possibleMoves([3, 3]);
board.knightMove([0, 0], [7, 7]);

//  > knightMoves([3,3],[4,3])
// => You made it in 3 moves!  Here's your path:
// [3,3]
// [4,5]
// [2,4]
// [4,3]
