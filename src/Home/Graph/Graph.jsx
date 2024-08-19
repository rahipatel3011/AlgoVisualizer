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
import {
  ChevronRight,
  Loader2,
  Pause,
  Play,
  Square,
  Target,
} from "lucide-react";
import Node from "./components/Node.jsx";
import { bfs, dfs } from "@/Algorithyms/GraphAlgorithyms.js";
import RoundButton from "@/components/custom/RoundButton.jsx";

const START_NODE_ROW = 3;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 16;
const FINISH_NODE_COL = 35;

const MOUSE_ACTIONS = {
  isStartMove: false,
  isFinishMove: false,
  isMousePressed: false,
};
const INIT_GRID = createInitialGrid();

function Graph() {
  const [selectedAlgo, setSelectedAlgo] = useState();
  const [grid, setGrid] = useState(INIT_GRID);
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
    setIsStartPressed(false);
    setGrid(INIT_GRID);
  }

  function handleStartButton() {
    setIsStartPressed(true);
  }

  useEffect(() => {
    if (isStartPressed) {
      console.log(grid);
      selectedAlgo === "BFS" &&
        bfs(grid, grid[START_NODE_ROW][START_NODE_COL], setGrid, stopFlag);
      selectedAlgo === "DFS" &&
        dfs(grid, grid[START_NODE_ROW][START_NODE_COL], setGrid, stopFlag);
    }

    if(!isStartPressed){

      return ()=>{stopFlag.current=false}
    }
  }, [isStartPressed, selectedAlgo, stopFlag]);

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
                (selectedAlgo || "Select") + " Algorithym"
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
            <DropdownMenuItem onClick={() => setSelectedAlgo("")}>
              another Sort
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
                ? "bg-red-500 hover:bg-red-700"
                : "bg-green-500 hover:bg-green-700"
            }
            onClick={() => handleStartButton()}
            disabled={!selectedAlgo}
          >
            {isStartPressed ? <Pause /> : <Play />}
          </RoundButton>
        )}
        <Button onClick={handleOnReset}>Reset</Button>
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
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    isVisited={isVisited}
                    // mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    row={row}
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
      });
    }
    grid.push(currentRow);
  }
  return grid;
}
