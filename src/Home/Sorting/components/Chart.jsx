import {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
} from "@/SortingAlgorithyms";
import React, { useEffect, useRef, useState } from "react";

const DELAY = 5;

const Chart = ({
  data,
  algorithym,
  setList,
  isStart,
  stopFlag,
  setIsStart,
}) => {
  useEffect(() => {
    async function runAlgo() {
      const start_time = performance.now();

      isStart &&
        algorithym === "Selection" &&
        selectionSort(data, setList, DELAY, stopFlag).then((resp) => {
          setIsStart(false);
          const end_time = performance.now();
          console.log(end_time - start_time);
        });
      isStart &&
        algorithym === "Bubble" &&
        bubbleSort(data, setList, DELAY, stopFlag).then((resp) => {
          setIsStart(false);
          const end_time = performance.now();
          console.log(end_time - start_time);
        });
      isStart &&
        algorithym === "Insertion" &&
        insertionSort(data, setList, DELAY, stopFlag).then((resp) => {
          setIsStart(false);
          const end_time = performance.now();
          console.log(end_time - start_time);
        });

      isStart &&
        algorithym === "Merge" &&
        mergeSort(data, setList, DELAY, stopFlag, 0, data.length - 1).then(
          (resp) => {
            setIsStart(false);
            const end_time = performance.now();
            console.log(end_time - start_time);
          }
        );
    }

    runAlgo();

    if (!isStart) {
      return () => {
        stopFlag.current = true; // Set the flag to true when component unmounts or sorting stops
      };
    }
  }, [algorithym, isStart, stopFlag]);

  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  const maxValue = Math.max(...data);
  return (
    <div className="flex h-64 mx-48 m-5 justify-center">
      {data.map((value, index) => (
        <div
          key={index}
          className="flex flex-col w-full items-center justify-end"
        >
          <div
            className={`bg-blue-500 w-full rounded-sm`}
            style={{
              height: `${(value / maxValue) * 100}%`,
              width: "50%",
            }}
          />
          {/* <span className="text-xs mt-1">{value}</span> */}
        </div>
      ))}
    </div>
  );
};

export default Chart;
