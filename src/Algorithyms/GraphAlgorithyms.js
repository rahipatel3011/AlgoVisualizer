export async function bfs(grid, startNode, setGrid) {
  const newGrid = structuredClone(grid);
  const { row, col } = startNode;
  let queue = [newGrid[row][col]];

  while (queue.length > 0) {
    await sleep(10);
    const currNode = queue.shift();
    currNode.isVisited = true;
    const { row, col } = currNode;
    newGrid[row][col] = currNode;

    if (currNode.isFinish) {
    //   setGrid(newGrid); // Ensure the final state is set
      return;
    }

    const neighbourNodes = getClosestNodes(newGrid, currNode, queue);
    //   console.log('Queue:', queue);
    //   console.log('Current Node in M:', currNode);
    // console.log("Neighbour Nodes in M:", neighbourNodes);
    // console.log("----------------------------------")
    queue.push(...neighbourNodes);

    setGrid(structuredClone(newGrid));
  }
}



export async function dfs(grid, startNode, setGrid) {
    const newGrid = structuredClone(grid);
    const { row, col } = startNode;
    let stack = [newGrid[row][col]];
  
    while (stack.length > 0) {
      await sleep(20);
      const currNode = stack.pop();
      currNode.isVisited = true;
      const { row, col } = currNode;
      newGrid[row][col] = currNode;
  
      if (currNode.isFinish) {
      //   setGrid(newGrid); // Ensure the final state is set
        return;
      }
  
      const neighbourNodes = getClosestNodes(newGrid, currNode, stack);
      stack.push(...neighbourNodes);
  
      setGrid(structuredClone(newGrid));
    }
  }


function getClosestNodes(grid, node, list) {
  const neighbours = [];
  const { row, col } = node;

  if (row > 0) {
    !isInList(grid[row - 1][col], list) &&
      neighbours.push(grid[row - 1][col]);
  }
  if (row < grid.length - 1) {
    !isInList(grid[row + 1][col], list) &&
      neighbours.push(grid[row + 1][col]);
  }
  if (col < grid[0].length - 1) {
    !isInList(grid[row][col+1], list) &&
      neighbours.push(grid[row][col + 1]);
  }
  if (col > 0) {
    !isInList(grid[row][col - 1], list) &&
      neighbours.push(grid[row][col - 1]);
  }
  

  const unvisitedNeighbours = neighbours.filter(
    (neighbour) => !neighbour.isVisited
  );
  return unvisitedNeighbours;
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
