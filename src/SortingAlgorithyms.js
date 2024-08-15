export async function selectionSort(dataList, callback, delay, stopFlag) {
  return new Promise(async (resolve) => {
    console.log("selection");
    for (let i = 0; i < dataList.length; i++) {
      let min_idx = i;
      for (let j = i + 1; j < dataList.length; j++) {
        if (!stopFlag.current) {
          return;
        }
        if (dataList[min_idx] > dataList[j]) {
          min_idx = j;
        }
        await sleep(delay);
      }

      // Swap elements
      let temp = dataList[min_idx];
      dataList[min_idx] = dataList[i];
      dataList[i] = temp;

      callback([...dataList]);
    }
    resolve();
  });
}

export async function bubbleSort(dataList, callback, delay, stopFlag) {
  return new Promise(async (resolve) => {
    for (let i = 0; i < dataList.length - 1; i++) {
      for (let j = 0; j < dataList.length - i - 1; j++) {
        if (!stopFlag.current) {
          return;
        }

        if (dataList[j] > dataList[j + 1]) {
          // swap element
          let temp = dataList[j];
          dataList[j] = dataList[j + 1];
          dataList[j + 1] = temp;
        }
        callback([...dataList]);
        await sleep(delay);
      }
    }
    resolve();
  });
}

export async function mergeSort(
  dataList,
  callback,
  delay,
  stopFlag,
  left,
  right
) {
  if (left >= right || !stopFlag.current) {
    return;
  }

  const mid = Math.floor(left + (right - left) / 2);

  // Sort the first half
  await mergeSort(dataList, callback, delay, stopFlag, left, mid);

  // Sort the second half
  await mergeSort(dataList, callback, delay, stopFlag, mid + 1, right);

  // Merge the sorted halves and wait for it to complete
  await merge(dataList, callback, delay, left, mid, right);
}

function merge(dataList, callback, delay, left, mid, right) {
  return new Promise(async (resolve) => {
    let temp1 = new Array(mid - left + 1);
    let temp2 = new Array(right - mid);

    for (let i = 0; i < temp1.length; i++) temp1[i] = dataList[left + i];
    for (let j = 0; j < temp2.length; j++) temp2[j] = dataList[mid + 1 + j];

    let pointer1 = 0;
    let pointer2 = 0;
    let main_pointer = left;

    while (pointer1 < temp1.length && pointer2 < temp2.length) {
      if (temp1[pointer1] <= temp2[pointer2]) {
        dataList[main_pointer] = temp1[pointer1];
        pointer1++;
      } else {
        dataList[main_pointer] = temp2[pointer2];
        pointer2++;
      }
      main_pointer++;
      callback([...dataList]);
      await sleep(delay);
    }

    while (pointer1 < temp1.length) {
      dataList[main_pointer] = temp1[pointer1];
      pointer1++;
      main_pointer++;
      callback([...dataList]);
      await sleep(delay);
    }
    while (pointer2 < temp2.length) {
      dataList[main_pointer] = temp2[pointer2];
      pointer2++;
      main_pointer++;
      callback([...dataList]);
      await sleep(delay);
    } // Final callback after merging is done
    resolve(); // Resolve the promise when merging is done
  });
}

export async function insertionSort(dataList, callback, delay, stopFlag) {
  return new Promise(async (resolve) => {
    for (let i = 1; i < dataList.length; i++) {
      let key = dataList[i];
      let j = i - 1;

      // Move elements of dataList[0..i-1], that are greater than key,
      // to one position ahead of their current position
      while (j >= 0 && dataList[j] > key) {
        if (!stopFlag.current) {
          return;
        }
        dataList[j + 1] = dataList[j];
        dataList[j] = key;
        callback([...dataList]);
        await sleep(delay);
        j = j - 1;
      }
    }

    resolve();
  });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export function insertionSort(
//   dataList,
//   callback,
//   delay,
//   stopFlag,
//   i = 1,
//   j = null,
//   curr = null
// ) {
//   if (i >= dataList.length || !stopFlag.current) {
//     return;
//   }

//   // If j is null, we are starting a new iteration of the outer loop
//   if (j === null) {
//     j = i - 1;
//   }

//   if (curr === null) {
//     curr = dataList[i];
//   }

//   // Move the elements of dataList[0..i-1], that are greater than curr,
//   // to one position ahead of their current position
//   if (j >= 0 && dataList[j] > curr) {
//     dataList[j + 1] = dataList[j];
//     dataList[j] = curr;
//     console.log([...dataList]);
//     callback([...dataList]);

//     // Continue the inner loop with a delay
//     setTimeout(
//       () => insertionSort(dataList, callback, delay, stopFlag, i, j - 1, curr),
//       delay
//     );
//   } else {
//     // Place the curr element in its correct position
//     dataList[j + 1] = curr;
//     callback([...dataList]);

//     // Move to the next element in the outer loop after a delay
//     setTimeout(
//       () => insertionSort(dataList, callback, delay, stopFlag, i + 1),
//       delay
//     );
//   }
// }
