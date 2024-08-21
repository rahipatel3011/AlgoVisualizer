import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronRight, Loader2, Play, Target } from "lucide-react";
import Node from "./components/Node.jsx";
import {
  animateAlgorithm,
  bfs,
  dfs,
  dijkstra,
  removeDijkstraAnimation,
} from "@/Algorithyms/GraphAlgorithms.js";
import RoundButton from "@/components/custom/RoundButton.jsx";

const START_NODE_ROW = 3;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 9;
const FINISH_NODE_COL = 25;

const MOUSE_ACTIONS = {
  isStartMove: false,
  isFinishMove: false,
  isMousePressed: false,
};

function Graph() {
  const [selectedAlgo, setSelectedAlgo] = useState();
  const [grid, setGrid] = useState(createInitialGrid());
  const [mouseStatus, setMouseStatus] = useState(MOUSE_ACTIONS);
  const [isStartPressed, setIsStartPressed] = useState(false);
  const stopFlag = useRef(false);
  // const [isError, setIsError] = useState(false);

  const handleMouseUp = (row, col) => {
    // const updatedGrid = updateGrid(grid, row, col);
    // setGrid(updatedGrid);
    setMouseStatus({ ...mouseStatus, isMousePressed: false });
  };

  const handleMouseDown = (row, col) => {
    const updatedGrid = updateGrid(grid, row, col);
    setMouseStatus({ ...mouseStatus, isMousePressed: true });
    setGrid(updatedGrid);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseStatus.isMousePressed) return;
    const updatedGrid = updateGrid(grid, row, col);
    setGrid(updatedGrid);
  };

  function handleOnReset() {
    stopFlag.current = true;
    removeDijkstraAnimation();
    setIsStartPressed(false);
    setGrid(createInitialGrid());
  }

  function handleStartButton() {
    removeDijkstraAnimation();
    setIsStartPressed(true);
  }

  if (isStartPressed) {
    let inOrderVisitedNodes, shortestPath;
    if (selectedAlgo === "BFS") {
      inOrderVisitedNodes = bfs(grid, grid[START_NODE_ROW][START_NODE_COL]);
    } else if (selectedAlgo === "Dijkstra") {
      [inOrderVisitedNodes, shortestPath] = dijkstra(
        grid,
        grid[START_NODE_ROW][START_NODE_COL]
      );
    } else if (selectedAlgo === "DFS") {
      inOrderVisitedNodes = dfs(grid, grid[START_NODE_ROW][START_NODE_COL]);
    }

    if (inOrderVisitedNodes) {
      animateAlgorithm(inOrderVisitedNodes, shortestPath).then((resp) =>
        setIsStartPressed(false)
      );
    } else {
      alert("There is no path from start to finish node");
      setIsStartPressed(false);
    }
  }

  // useEffect(() => {
  //   if (isStartPressed) {
  //     let listOfNodes;
  //     // selectedAlgo === "BFS" &&
  //     //   bfs(grid, grid[START_NODE_ROW][START_NODE_COL], setGrid, stopFlag);
  //     // selectedAlgo === "DFS" &&
  //     //   dfs(grid, grid[START_NODE_ROW][START_NODE_COL], setGrid, stopFlag);
  //     // if (selectedAlgo === "Dijkstra") {
  //     //   listOfNodes=dijkstra(grid, grid[START_NODE_ROW][START_NODE_COL], setGrid, stopFlag);
  //     // }
  //     // console.log(listOfNodes);
  //   }

  //   if (!isStartPressed) {
  //     return () => {
  //       stopFlag.current = false;
  //     };
  //   }
  // }, [isStartPressed, selectedAlgo, stopFlag]);

  return (
    <div className="text-center">
      <div className="flex gap-2 justify-center m-3 h-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={isStartPressed}>
              {" "}
              {isStartPressed ? (
                <Loader2 className="animate-spin" />
              ) : (
                (selectedAlgo || "Select") + " Algorithm"
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedAlgo("BFS")}>
              BFS
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedAlgo("DFS")}>
              DFS
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedAlgo("Dijkstra")}>
              Dijkstra
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedAlgo("")}>
              another Sort
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {selectedAlgo && (
          <RoundButton
            className={
              isStartPressed
                ? "bg-slate-500"
                : "bg-green-500 hover:bg-green-700"
            }
            onClick={() => handleStartButton()}
            disabled={!selectedAlgo}
          >
            <Play disabled={isStartPressed} />
          </RoundButton>
        )}
        {selectedAlgo && (
          <Button onClick={handleOnReset} disabled={isStartPressed}>
            Reset
          </Button>
        )}
      </div>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div className="lg:h-[25px] md:h-[15px] sm:h-[10px]" key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall, isVisited } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    row={row}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    isVisited={isVisited}
                    // mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                  >
                    {isStart && <ChevronRight size={24} />}
                    {!isStart && isFinish && <Target size={24} />}
                  </Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Graph;

function updateGrid(grid, row, col) {
  const newGrid = grid.slice();
  let currNode = { ...newGrid[row][col] }; // copying current node
  if (currNode.isStart) {
    // currNode = { ...currNode, isStart: !currNode.isStart };
  } else if (!currNode.isStart && !currNode.isFinish) {
    currNode = { ...currNode, isWall: !currNode.isWall };
  }

  //updated current node in grid
  newGrid[row][col] = currNode;
  return newGrid;
}

function createInitialGrid() {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push({
        col: col,
        row: row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        isVisited: false,
        distance:
          row === START_NODE_ROW && col === START_NODE_COL ? 0 : Infinity,
        isWall: false,
        weight: 1,
      });
    }
    grid.push(currentRow);
  }
  return grid;
}
