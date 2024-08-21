import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [dfsNodes, setDfsNodes] = useState([
    { id: 0, x: 128, y: 20, visited: false },
    { id: 1, x: 64, y: 150, visited: false },
    { id: 2, x: 192, y: 150, visited: false },
    { id: 3, x: 32, y: 250, visited: false },
    { id: 4, x: 96, y: 250, visited: false },
    { id: 5, x: 160, y: 250, visited: false },
    { id: 6, x: 224, y: 250, visited: false },
  ]);

  const [bubbleBars, setBubbleBars] = useState([38, 27, 43, 3, 9, 32, 10]);

  const [maze, setMaze] = useState([]);

  const dfsEdges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [2, 6],
  ];

  const generateMaze = () => {
    const newMaze = Array(10)
      .fill(0)
      .map(() =>
        Array(10)
          .fill(0)
          .map(() => false)
      );
    setMaze(newMaze);
  };

  const animateMaze = async () => {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        setMaze((prevMaze) =>
          prevMaze.map((r, rIndex) =>
            rIndex === row
              ? r.map((cell, cIndex) =>
                  cIndex === col ? Math.random() > 0.7 : cell
                )
              : r
          )
        );
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }
  };

  const dfsTraversal = async (nodeId, visited = new Set()) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    setDfsNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, visited: true } : node
      )
    );

    await new Promise((resolve) => setTimeout(resolve, 600));

    for (const [u, v] of dfsEdges) {
      if (u === nodeId && !visited.has(v)) await dfsTraversal(v, visited);
      if (v === nodeId && !visited.has(u)) await dfsTraversal(u, visited);
    }
  };

  const bubbleSort = async () => {
    let arr = [...bubbleBars];
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setBubbleBars([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      }
    }
  };

  const runAnimations = async () => {
    while (true) {
      setDfsNodes(dfsNodes.map((node) => ({ ...node, visited: false })));
      setBubbleBars([38, 27, 43, 3, 9, 32, 10]);
      generateMaze();
      await dfsTraversal(0);
      await bubbleSort();
      await animateMaze();
    }
  };

  useEffect(() => {
    runAnimations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-24 space-y-6">
      <h1 className="text-4xl font-bold mb-6">Algorithm Visualizer</h1>
      <div className="text-center mb-8">
        <p className="text-xl">
          Explore various algorithms with interactive animations!
        </p>
      </div>
      <div className="flex space-x-12">
        {/* DFS Visualization */}
        <div>
          <div className="relative w-72 h-72 flex flex-col items-center">
            {/* Edges */}
            {dfsEdges.map(([u, v], idx) => {
              const nodeU = dfsNodes[u];
              const nodeV = dfsNodes[v];
              return (
                <svg
                  key={idx}
                  className="absolute top-0 left-0 w-full h-full overflow-visible"
                >
                  <line
                    x1={nodeU.x + 18}
                    y1={nodeU.y + 18}
                    x2={nodeV.x + 18}
                    y2={nodeV.y + 18}
                    stroke="#555"
                    strokeWidth="2"
                  />
                </svg>
              );
            })}
            {/* Nodes */}
            {dfsNodes.map((node) => (
              <motion.div
                key={node.id}
                className="absolute w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  backgroundColor: node.visited ? "#34D399" : "#374151",
                }}
                animate={{ scale: node.visited ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          <div className="text-center mt-5">
            <span className="text-lg font-medium text-gray-300">DFS Algorithm</span>
          </div>
        </div>
        {/* Bubble Sort Visualization */}
        <div>
          <div className="relative w-72 h-72 flex flex-col items-center">
            <div className="relative w-full h-full flex items-end justify-center space-x-1">
              {bubbleBars.map((height, idx) => (
                <motion.div
                  key={idx}
                  className="w-6 bg-blue-600"
                  style={{
                    height: `${(height / 50) * 100}%`,
                    borderRadius: "4px",
                  }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
          <div className="text-center mt-5 ">
            <span className="text-lg font-medium text-gray-300">Sorting Algorithm</span>
          </div>
        </div>

        {/* Maze Generation Visualization */}
        <div>
          <div className="relative w-72 h-72 flex flex-col items-center">
            <div className="relative w-full h-full grid grid-cols-10 gap-0.5">
              {maze.flatMap((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <motion.div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-6 h-6 ${
                      cell ? "bg-gray-800" : "bg-green-500"
                    }`}
                    animate={{ scale: cell ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ))
              )}
            </div>
          </div>
          <div className="text-center mt-5">
            <span className="text-lg font-medium text-gray-300">Maze Algorithm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
