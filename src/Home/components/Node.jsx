import React, { useEffect } from "react";
import "./Node.css";

function Node({
  col,
  isFinish,
  isStart,
  isWall,
  isVisited,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  row,
  className,
  children,
  weight
}) {
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "bg-black"
    : weight === 2
    ? "bg-orange-300"
    : weight === 3
    ? "bg-red-300"
    : "";


  // useEffect(() => {
  //   // console.log("useEffect");
  //   setTimeout(() => {
  //     document
  //       .getElementById(`node-${row}-${col}`)
  //       .classList.remove("node-visited");
  //   }, 1);
  // }, [isVisited]);

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node inline-block border border-[#afd8f8] lg:h-[25px] lg:w-[25px] md:h-[15px] md:w-[15px] sm:w-[10px] sm:h-[10px] ${extraClassName} ${className}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    >
      {children}
    </div>
  );
}

export default Node;
