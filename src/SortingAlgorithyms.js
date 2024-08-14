export async function selectionSort(
  dataList,
  callback,
  delay,
  stopFlag,
  i = 0
) {
  return new Promise((resolve, reject) => {
    if (i >= dataList.length - 1 || !stopFlag.current) {
      resolve("resolved");
      return;
    }
    let min_idx = i;
    for (let j = i + 1; j < dataList.length; j++) {
      if (dataList[min_idx] > dataList[j]) {
        min_idx = j;
      }
    }

    // Swap elements
    let temp = dataList[min_idx];
    dataList[min_idx] = dataList[i];
    dataList[i] = temp;

    callback([...dataList]);
    setTimeout(
      () =>
        selectionSort(dataList, callback, delay, stopFlag, i + 1).then(resolve),
      delay
    );
  });
}

export async function bubbleSort(dataList, callback, delay, stopFlag, i = 0) {
  return new Promise((resolve, reject) => {
    if (i >= dataList.length - 1 || !stopFlag.current) {
      resolve("resolved");
      return;
    }
    for (let j = 0; j < dataList.length - i - 1; j++) {
      if (dataList[j] > dataList[j + 1]) {
        // swap element
        let temp = dataList[j];
        dataList[j] = dataList[j + 1];
        dataList[j + 1] = temp;
      }
    }
    callback([...dataList]);
    setTimeout(
      () =>
        bubbleSort(dataList, callback, delay, stopFlag, i + 1).then(resolve),
      delay
    );
  });
}

export async function insertionSort(
  dataList,
  callback,
  delay,
  stopFlag,
  i = 1
) {
  return new Promise((resolve, reject) => {
    if (i > dataList.length - 1 || !stopFlag.current) {
      resolve("resolved");
      return;
    }
    const curr = dataList[i]; // need to store in temo variable
    let j = i - 1;
    while (j >= 0 && dataList[j] > curr) {
      dataList[j + 1] = dataList[j];
      j = j - 1;
      dataList[j + 1] = curr;
      callback([...dataList]);
    }

    setTimeout(
      async () =>
        await insertionSort(dataList, callback, delay, stopFlag, i + 1).then(
          resolve
        ),
      delay
    );
  });
}

// export async function mergeSort(dataList, callback, delay, stopFlag, i = 1) {}

export function mergeSort(dataList, callback, delay, stopFlag, left, right) {
  if (left >= right) {
    return;
  }
  const mid = Math.floor(left + (right - left) / 2);
  mergeSort(dataList, callback, delay, stopFlag, left, mid);
  mergeSort(dataList, callback, delay, stopFlag, mid + 1, right);

  merge(dataList, left, mid, right);
  callback([...dataList]);
}

function merge(dataList, left, mid, right) {
  let temp1 = new Array(mid - left + 1);
  let temp2 = new Array(right - mid);
  for (let i = 0; i < temp1.length; i++) temp1[i] = dataList[left + i];
  for (let j = 0; j < temp2.length; j++) temp2[j] = dataList[mid + 1 + j];
  let pointer1 = 0;
  let pointer2 = 0;
  let main_pointer = left;

  while (pointer1 < temp1.length && pointer2 < temp2.length) {
    if (temp1[pointer1] < temp2[pointer2]) {
      dataList[main_pointer] = temp1[pointer1];
      pointer1 += 1;
    } else {
      dataList[main_pointer] = temp2[pointer2];
      pointer2 += 1;
    }
    main_pointer += 1;
  }

  while (pointer1 < temp1.length) {
    dataList[main_pointer] = temp1[pointer1];
    pointer1 += 1;
    main_pointer += 1;
  }

  while (pointer2 < temp2.length) {
    dataList[main_pointer] = temp2[pointer2];
    pointer2 += 1;
    main_pointer += 1;
  }
  console.log(dataList);
}

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
