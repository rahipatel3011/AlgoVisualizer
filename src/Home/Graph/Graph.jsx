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
import { ChevronRight, Loader2, Target } from "lucide-react";
import Node from "./components/Node.jsx";
import { bfs, dfs } from "@/Algorithyms/GraphAlgorithyms.js";

const START_NODE_ROW = 3;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 16;
const FINISH_NODE_COL = 35;

const MOUSE_ACTIONS = {
  isStartMove: false,
  isFinishMove: false,
  isMousePressed: false,
};

function Graph() {
  const [selectedAlgo, setSelectedAlgo] = useState();
  const [grid, setGrid] = useState([]);
  const [mouseStatus, setMouseStatus] = useState(MOUSE_ACTIONS);
  const [isStartPressed, setIsStartPressed] = useState(false);
  // const [isError, setIsError] = useState(false);

  // console.log("Graph");
  useEffect(() => {
    const mainGrid = [];
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
      mainGrid.push(currentRow);
    }
    setGrid(mainGrid);
  }, []);

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

  function handleStartButton() {
    dfs(
      grid,
      grid[START_NODE_ROW][START_NODE_COL],
      setGrid
    );
  }

  return (
    <div className="text-center">
      <div className="flex justify-center m-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <>
              <Button variant="outline" disabled={isStartPressed}>
                {" "}
                {isStartPressed ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  (selectedAlgo || "Select") + " Algorithym"
                )}
              </Button>
              <Button onClick={() => handleStartButton()}>Start</Button>
            </>
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
      </div>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div className="lg:h-[25px] md:h-[15px] sm:h-[10px]" key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall, isVisited } = node;
                // isVisited && console.log(row,col);
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
