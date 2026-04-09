export function generateMergeSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];
  const n = arr.length;
  let sortedIndices = [];

  let stats = {
    comparisons: 0,
    swaps: 0,
    writes: 0,
    steps: 0,
  };

  const pushStep = (stepParams) => {
    stats.steps++;
    const step = {
      ...stepParams,
      array: [...arr],
      sortedIndices: [...sortedIndices],
      stats: { ...stats },
    };
    Object.freeze(step.array);
    Object.freeze(step.sortedIndices);
    Object.freeze(step.stats);
    Object.freeze(step);
    steps.push(step);
  };

  function merge(low, mid, high) {
    const leftArr = arr.slice(low, mid + 1);
    const rightArr = arr.slice(mid + 1, high + 1);

    pushStep({
      type: 'merge',
      indices: Array.from({length: high - low + 1}, (_, idx) => low + idx),
      leftRange: [low, mid],
      rightRange: [mid + 1, high],
      description: `Merging explicit sub-arrays: Left[${low}-${mid}] and Right[${mid + 1}-${high}]`
    });

    let i = 0, j = 0, k = low;

    while (i < leftArr.length && j < rightArr.length) {
      stats.comparisons++;
      pushStep({
        type: 'compare',
        indices: [low + i, mid + 1 + j],
        leftRange: [low, mid],
        rightRange: [mid + 1, high],
        description: `Comparing left value ${leftArr[i]} and right value ${rightArr[j]}`
      });

      if (leftArr[i] <= rightArr[j]) {
        stats.writes++;
        arr[k] = leftArr[i];
        pushStep({
          type: 'overwrite',
          indices: [k],
          leftRange: [low, mid],
          rightRange: [mid + 1, high],
          description: `Left ${leftArr[i]} <= Right ${rightArr[j]}. Writing ${leftArr[i]} to global index ${k}.`
        });
        i++;
      } else {
        stats.writes++;
        arr[k] = rightArr[j];
        pushStep({
          type: 'overwrite',
          indices: [k],
          leftRange: [low, mid],
          rightRange: [mid + 1, high],
          description: `Left ${leftArr[i]} > Right ${rightArr[j]}. Writing ${rightArr[j]} to global index ${k}.`
        });
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      stats.writes++;
      arr[k] = leftArr[i];
      pushStep({
        type: 'overwrite',
        indices: [k],
        leftRange: [low, mid],
        rightRange: [mid + 1, high],
        description: `Copying remaining left element ${leftArr[i]} to index ${k}.`
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      stats.writes++;
      arr[k] = rightArr[j];
      pushStep({
        type: 'overwrite',
        indices: [k],
        leftRange: [low, mid],
        rightRange: [mid + 1, high],
        description: `Copying remaining right element ${rightArr[j]} to index ${k}.`
      });
      j++;
      k++;
    }

    if (low === 0 && high === n - 1) {
      for(let x = 0; x < n; x++) sortedIndices.push(x);
      pushStep({
        type: 'mark_sorted',
        indices: sortedIndices,
        description: `Finished merging final global arrays.`
      });
    }
  }

  function mergeSortRecursion(low, high) {
    if (low < high) {
      let mid = Math.floor(low + (high - low) / 2);
      
      pushStep({
        type: 'divide',
        indices: [mid],
        leftRange: [low, mid],
        rightRange: [mid + 1, high],
        description: `Dividing array at midpoint index ${mid}.`
      });

      mergeSortRecursion(low, mid);
      mergeSortRecursion(mid + 1, high);
      merge(low, mid, high);
    }
  }

  mergeSortRecursion(0, n - 1);

  pushStep({
    type: 'done',
    indices: [],
    description: '✅ Array is fully sorted!',
  });

  return steps;
}
