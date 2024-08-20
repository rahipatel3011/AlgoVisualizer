import React, { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Chart from "./components/Chart";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// const intList = [127, 43, 89, 12, 65, 34, 78, 92, 50];
// const intList = [
//   43, 127, 89, 12, 65, 34, 78, 92, 11, 23, 56, 71, 82, 90, 49, 18, 67, 125, 14,
//   53, 97, 38, 77, 24, 80, 33, 9, 62, 74, 50, 40, 36, 93, 29, 66, 87, 5, 28, 19,
//   61, 84, 13, 91, 57, 45, 95, 70, 88, 46, 64, 21, 117, 99, 8, 76, 52, 15, 81, 4,
//   35, 83, 42, 68, 86, 20, 58, 30, 39, 7, 98, 6, 48, 55, 3, 75, 59, 2, 31, 63,
//   16, 154, 22, 1, 47, 41, 94, 37, 96, 85, 10, 26, 73, 79, 44, 100, 60,
// ];

let intList;

function Sorting() {
  const [selectedAlgo, setSelectedAlgo] = useState();
  const [dataList, setDataList] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [isError, setIsError] = useState(false);

  const stopFlag = useRef(false);

  const handleOnReset = () => {
    stopFlag.current = false;
    setIsStart(false);
    setDataList(intList);
  };

  const handleOnStart = () => {
    setIsStart(true);
    setDataList(dataList);
  };

  const handleTextareaChange = (e) => {
    const text = e.target.value;
    let data = text.split(",").filter((value) => value !== "");
    data.forEach((value, index) => (data[index] = parseInt(value)));
    if (data.every(Number.isInteger)) {
      intList = data;
      setDataList(data);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };
  return (
    <div>
      <div className="flex flex-col mx-48 m-5 justify-center">
        <Textarea
          className={`border-2 ${
            isError ? "border-red-900 bg-red-200" : "border-black"
          } `}
          placeholder="Please Add your numbers"
          onChange={(e) => handleTextareaChange(e)}
        />
        <legend className="text-center italic text-red-700 font-bold">
          Note: Please add all numbers using comma( , ) seperator
        </legend>
      </div>
      <div className="flex justify-center m-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={isStart}>
              {" "}
              {isStart ? (
                <Loader2 className="animate-spin" />
              ) : (
                (selectedAlgo || "Select") + " Algorithm"
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedAlgo("Selection")}>
              Selection Sort
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedAlgo("Merge")}>
              Merge Sort
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedAlgo("Bubble")}>
              Bubble Sort
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedAlgo("Insertion")}>
              Insertion Sort
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* <h2 className="text-center my-2">{selectedAlgo} Sorting Algorithym</h2> */}
      <div className="flex justify-center gap-2">
        <Button
          onClick={handleOnStart}
          disabled={!selectedAlgo || isStart || isError}
        >
          Start
        </Button>
        <Button variant="outline" onClick={handleOnReset} disabled={isError}>
          Reset
        </Button>
      </div>
      <div className="text-center">
        {isError && (
          <p className="text-red-700">
            Only Integers are valid. Please check data once again...
          </p>
        )}
        {!isError && (
          <Chart
            data={[...dataList]}
            algorithym={selectedAlgo}
            setList={setDataList}
            isStart={isStart}
            setIsStart={setIsStart}
            stopFlag={stopFlag}
          />
        )}
      </div>
    </div>
  );
}

export default Sorting;
