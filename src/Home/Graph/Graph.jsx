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
import Node from "../components/Node.jsx";
import {
  animateAlgorithm,
  bfs,
  dfs,
  dijkstra,
  removeDijkstraAnimation,
} from "@/Algorithyms/GraphAlgorithms.js";
import RoundButton from "@/components/custom/RoundButton.jsx";
import { createInitialGrid, createRandomGrid, updateGrid } from "@/lib/grid.js";
import { START_NODE_COOR, FINISH_NODE_COOR } from "../../lib/constant.js";

const MOUSE_ACTIONS = {
  isStartMove: false,
  isFinishMove: false,
  isMousePressed: false,
};

function Graph() {
  const [selectedAlgo, setSelectedAlgo] = useState();
  const [selectedNode, setSelectedNode] = useState('block');
  const [grid, setGrid] = useState(
    createInitialGrid(START_NODE_COOR, FINISH_NODE_COOR)
  );
  const [mouseStatus, setMouseStatus] = useState(MOUSE_ACTIONS);
  const [isStartPressed, setIsStartPressed] = useState(false);
  // const stopFlag = useRef(false);
  // const [isError, setIsError] = useState(false);

  const handleMouseUp = (row, col) => {
    // const updatedGrid = updateGrid(grid, row, col);
    // setGrid(updatedGrid);
    setMouseStatus({ ...mouseStatus, isMousePressed: false });
  };

  const handleMouseDown = (row, col) => {
    const updatedGrid = updateGrid(grid, row, col, selectedNode);
    setMouseStatus({ ...mouseStatus, isMousePressed: true });
    setGrid(updatedGrid);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseStatus.isMousePressed) return;
    const updatedGrid = updateGrid(grid, row, col, selectedNode);
    setGrid(updatedGrid);
  };

  function handleOnReset() {
    // stopFlag.current = true;
    removeDijkstraAnimation();
    setIsStartPressed(false);
    setGrid(createInitialGrid(START_NODE_COOR, FINISH_NODE_COOR));
  }

  function handleStartButton() {
    removeDijkstraAnimation();
    setIsStartPressed(true);
  }

  if (isStartPressed) {
    let inOrderVisitedNodes, shortestPath;
    if (selectedAlgo === "BFS") {
      inOrderVisitedNodes = bfs(
        grid,
        grid[START_NODE_COOR.row][START_NODE_COOR.col]
      );
    } else if (selectedAlgo === "Dijkstra") {
      [inOrderVisitedNodes, shortestPath] = dijkstra(
        grid,
        grid[START_NODE_COOR.row][START_NODE_COOR.col]
      );
    } else if (selectedAlgo === "DFS") {
      inOrderVisitedNodes = dfs(
        grid,
        grid[START_NODE_COOR.row][START_NODE_COOR.col]
      );
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

  function handleGenerateGrid() {
    const generatedGrid = createRandomGrid(grid);
    setGrid(generatedGrid);
  }

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
          <>
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
            <Button onClick={handleOnReset} disabled={isStartPressed}>
              Reset
            </Button>
            <Button
              variant="outline"
              onClick={handleGenerateGrid}
              disabled={isStartPressed}
            >
              Create Random Grid
            </Button>
          </>
        )}
      </div>
      <div className="flex flex-row gap-4 justify-center m-4">
        <label className="flex items-center cursor-pointer" onClick={()=>setSelectedNode('light')}>
          <input type="radio" name="traffic" value="light" className="hidden" />
          <div className="w-[25px] h-[25px] bg-orange-300 border-2 border-black mr-2 choice-box"></div>
          <span>Light Traffic</span>
        </label>

        <label className="flex items-center cursor-pointer" onClick={()=>setSelectedNode('heavy')}>
          <input type="radio" name="traffic" value="heavy" className="hidden" />
          <div className="w-[25px] h-[25px] bg-red-300 border-2 border-black mr-2 choice-box"></div>
          <span>Heavy Traffic</span>
        </label>

        <label className="flex items-center cursor-pointer" onClick={()=>setSelectedNode('block')}>
          <input type="radio" name="traffic" value="block" className="hidden" />
          <div className="w-[25px] h-[25px] bg-black border-2 border-black mr-2 choice-box"></div>
          <span>Block</span>
        </label>
      </div>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div className="lg:h-[25px] md:h-[15px] sm:h-[10px]" key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {
                  row,
                  col,
                  isFinish,
                  isStart,
                  isWall,
                  isVisited,
                  weight,
                } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    row={row}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    isVisited={isVisited}
                    weight={weight}
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
