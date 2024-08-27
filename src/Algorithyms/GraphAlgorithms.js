export function bfs(grid, startNode) {
  const newGrid = structuredClone(grid);
  const nodesInOrder = [];
  const { row, col } = startNode;
  // console.log(startNode);
  const queue = [newGrid[row][col]];

  while (queue.length > 0) {
    const currNode = queue.shift();
    nodesInOrder.push(currNode);
    currNode.isVisited = true;
    const { row, col } = currNode;
    newGrid[row][col] = currNode;
    if (currNode.isFinish) {
      return nodesInOrder;
    }

    const neighbourNodes = getClosestNodes(newGrid, currNode, queue);
    queue.push(...neighbourNodes);
  }
  return undefined;
}

export function dfs(grid, startNode) {
  const newGrid = structuredClone(grid);
  const nodesInOrder = [];
  const { row, col } = startNode;
  let stack = [newGrid[row][col]];

  while (stack.length > 0) {
    const currNode = stack.pop();
    nodesInOrder.push(currNode);
    currNode.isVisited = true;
    const { row, col } = currNode;
    newGrid[row][col] = currNode;

    if (currNode.isFinish) {
      //   setGrid(newGrid); // Ensure the final state is set
      return nodesInOrder;
    }

    const neighbourNodes = getClosestNodes(newGrid, currNode, stack);
    stack.push(...neighbourNodes);
  }
  return undefined;
}

export function dijkstra(grid) {
  //find startNode
  let startNode;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].isStart) {
        startNode = grid[i][j];
        break;
      }
    }
  }

  const newGrid = structuredClone(grid);
  const nodesInOrder = [];
  startNode.distance = 0;
  const { row, col } = startNode;
  // console.log(startNode);
  let queue = [newGrid[row][col]];

  while (queue.length > 0) {
    queue = queue.sort((a, b) => a.distance - b.distance);
    const currNode = queue.shift();
    currNode.isVisited = true;    
    nodesInOrder.push(currNode);

    
    if (currNode.isFinish) {
      const shortestPath = findShortestPath(nodesInOrder);
      return [nodesInOrder, shortestPath];
    }

    const neighbourNodes = getClosestNodes(newGrid, currNode, queue);
    
    queue.push(...neighbourNodes);
  }
  // return undefine if there is no path from start to finish node
  return [undefined, undefined];
}

function findShortestPath(inOrderNodeList) {
  const shortestPath = [];
  // NOTE: here i am not adding start's parent, as it will undefine
  let lastNode = inOrderNodeList[inOrderNodeList.length - 1];
  while (lastNode) {
    shortestPath.push(lastNode);

    // traversing backward to find path from finish to start
    lastNode = lastNode.parent;
  }
  return shortestPath;
}

function getClosestNodes(grid, node, list) {
  const neighbours = [];
  const { row, col } = node;
  if (row > 0) {
    const upperNode = grid[row - 1][col];
    list = updateNeighbours(list, upperNode, node, neighbours);
  }
  if (row < grid.length - 1) {
    const lowerNode = grid[row + 1][col];
    list = updateNeighbours(list, lowerNode, node, neighbours);
  }

  if (col < grid[0].length - 1) {
    const rightNode = grid[row][col + 1];
    list = updateNeighbours(list, rightNode, node, neighbours);
  }
  if (col > 0) {
    const leftNode = grid[row][col - 1];
    list = updateNeighbours(list, leftNode, node, neighbours);
  }
  const unvisitedNeighbours = neighbours.filter(
    (neighbour) => !neighbour.isVisited
  );

  //updating parent node to each neighbour
  unvisitedNeighbours.forEach((neighbour) => (neighbour.parent = node));
  return unvisitedNeighbours;
}

function updateNeighbours(list, neighbourNode, node, neighbours) {
  if (!neighbourNode.isWall && !neighbourNode.isStart && !neighbourNode.isVisited) {
    if (
      isInList(neighbourNode, list) &&
      node.distance + neighbourNode.weight < neighbourNode.distance
    ) {
      list.forEach((item) => item === neighbourNode? item.distance=node.distance + neighbourNode.weight: item.distance);
      neighbourNode.distance = node.distance + neighbourNode.weight;
      neighbours.push(neighbourNode);
    } else if (!isInList(neighbourNode, list)) {
      neighbourNode.distance = node.distance + neighbourNode.weight;
      neighbours.push(neighbourNode);
    }
  }
  return list;
}

export async function animateAlgorithm(inOrderNodeList, shortestPath) {
  return new Promise((resolve) => {
    for (let i = 0; i < inOrderNodeList.length; i++) {
      if (i === inOrderNodeList.length - 1 && shortestPath) {
        setTimeout(() => {
          animateShortestPath(shortestPath);
        }, 10 * i);
      }
      const currNode = inOrderNodeList[i];
      const { row, col } = currNode;
      setTimeout(() => {
        document
          .getElementById(`node-${row}-${col}`)
          .classList.add("node-visited");
      }, 10 * i);
    }
    let delay = inOrderNodeList.length - 1;
    if (shortestPath) {
      delay = inOrderNodeList.length - 1 + shortestPath.length - 1;
    }
    setTimeout(() => {
      resolve();
    }, 10 * delay);
  });
}

export function animateShortestPath(shortestPath) {
  for (let i = shortestPath.length - 1; i >= 0; i--) {
    const currNode = shortestPath[i];
    const { row, col } = currNode;
    setTimeout(() => {
      document
        .getElementById(`node-${row}-${col}`)
        .classList.add("node-shortest-path");
    }, 10 * (shortestPath.length - 1 - i));
  }
}

export function removeDijkstraAnimation() {
  const allVisitedNode = document.querySelectorAll(".node-visited");
  for (let i = 0; i < allVisitedNode.length; i++) {
    allVisitedNode[i].classList.remove("node-visited", "node-shortest-path");
  }
}

// misc functions

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isEqualNode = (node, otherNode) =>
  node.row === otherNode.row && node.col === otherNode.col;

const isInList = (node, list) => {
  for (let i = 0; i < list.length; i++) {
    if (isEqualNode(node, list[i])) return true;
  }
  return false;
};

function sortList(list) {
  return list.sort((nodeA, nodeB) => nodeA.weight - nodeB.weight);
}

/*
if (row < grid.length - 1) {
    const lowerNode = grid[row + 1][col];
    if (!lowerNode.isWall) {
      lowerNode.distance = node.distance + lowerNode.weight;
      !isInList(lowerNode, list) && neighbours.push(lowerNode);
      // need to perform relaxation in list if it's already add to list
    }
  }
*/
