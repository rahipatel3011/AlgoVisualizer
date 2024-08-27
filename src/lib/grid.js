import {
  animateAlgorithm,
  bfs,
  dijkstra,
  removeDijkstraAnimation,
} from "@/Algorithyms/GraphAlgorithms";
import { MAZE_PROMPT } from "./constant";
import AIchatSession from "./OpenAIModal";
import { randomInt } from "./utils";

export function createInitialGrid(startNodeCoord, finishNodeCoord) {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push({
        col: col,
        row: row,
        isStart: row === startNodeCoord.row && col === startNodeCoord.col,
        isFinish: row === finishNodeCoord.row && col === finishNodeCoord.col,
        isVisited: false,
        distance:
          row === startNodeCoord.row && col === startNodeCoord.col
            ? 0
            : Infinity,
        isWall: false,
        weight: 1,
      });
    }
    grid.push(currentRow);
  }
  return grid;
}

export function updateGrid(grid, row, col, nodeType) {
  const newGrid = grid.slice();
  let currNode = { ...newGrid[row][col] }; // copying current node
  if (!currNode.isStart && !currNode.isFinish) {
    if (currNode.isWall || currNode.weight === 2 || currNode.weight === 3) {
      currNode = { ...currNode, weight: 1, isWall: false };
    } else if (nodeType.toLowerCase() === "block") {
      currNode = { ...currNode, isWall: true };
    } else if (nodeType.toLowerCase() === "light") {
      currNode = { ...currNode, weight: 2 };
    } else if (nodeType.toLowerCase() === "heavy") {
      currNode = { ...currNode, weight: 3 };
    } else {
      currNode = { ...currNode, weight: 1, isWall: false };
    }
  }
  //updated current node in grid
  newGrid[row][col] = currNode;
  return newGrid;
}

export function createRandomGrid(grid) {
  let tempGrid;
  let nodesInOrder;
  let shortestPath;

  do {
    tempGrid = structuredClone(grid);

    clearMaze(tempGrid);
    createWall(tempGrid, tempGrid.length, tempGrid[0].length);

    const startRow = randomInt(2, tempGrid.length - 2);
    const startCol = randomInt(2, tempGrid[0].length - 2);
    let finishRow;
    let finishCol;

    do {
      finishRow = randomInt(2, tempGrid.length - 2);
      finishCol = randomInt(2, tempGrid[0].length - 2);
    } while (
      (finishCol === startCol && finishRow === startRow) ||
      Math.abs(finishRow - startRow) < 5 ||
      Math.abs(finishCol - startCol) < 15
    );

    tempGrid[startRow][startCol].isStart = true;
    tempGrid[startRow][startCol].distance = 0;
    tempGrid[finishRow][finishCol].isFinish = true;

    for (let i = 1; i < tempGrid.length - 1; i++) {
      for (let j = 1; j < tempGrid[i].length - 1; j++) {
        if (!tempGrid[i][j].isStart && !tempGrid[i][j].isFinish) {
          tempGrid[i][j].isWall = randomInt(0, 3) === 0;
          if (!tempGrid[i][j].isWall) {
            tempGrid[i][j].weight = randomInt(1, 4);
          }
        }
      }
    }

    [nodesInOrder, shortestPath] = dijkstra(tempGrid);
  } while (!nodesInOrder);

  return tempGrid;
}

function clearMaze(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].isWall = false;
      grid[i][j].isStart = false;
      grid[i][j].isFinish = false;
      grid[i][j].distance = Infinity;
    }
  }
  removeDijkstraAnimation();
}

function createWall(grid, rows, cols) {
  for (let row = 0; row < rows; row++) {
    grid[row][0].isWall = true;
    grid[row][cols - 1].isWall = true;
  }
  for (let col = 0; col < cols; col++) {
    grid[0][col].isWall = true;
    grid[rows - 1][col].isWall = true;
  }
}
