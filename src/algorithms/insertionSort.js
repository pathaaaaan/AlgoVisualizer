export function generateInsertionSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];
  const n = arr.length;
  // In insertion sort, elements before 'i' are locally sorted
  let locallySorted = [0];

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
      sortedIndices: [...locallySorted],
      stats: { ...stats },
    };
    Object.freeze(step.array);
    Object.freeze(step.sortedIndices);
    Object.freeze(step.stats);
    Object.freeze(step);
    steps.push(step);
  };

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    pushStep({
      type: 'compare',
      indices: [i],
      description: `Selected A[${i}] = ${key} as the key to insert.`,
    });

    while (j >= 0) {
      stats.comparisons++;
      pushStep({
        type: 'compare',
        indices: [j, j + 1],
        description: `Comparing ${arr[j]} with key ${key}.`,
      });

      if (arr[j] > key) {
        stats.writes++;
        arr[j + 1] = arr[j];
        
        pushStep({
          type: 'overwrite',
          indices: [j + 1],
          description: `${arr[j]} > ${key}, so shifted ${arr[j]} to the right.`,
        });

        j--;
      } else {
        break;
      }
    }

    if (j + 1 !== i) {
      stats.writes++;
      arr[j + 1] = key;
      pushStep({
        type: 'overwrite',
        indices: [j + 1],
        description: `Inserted key ${key} into its sorted position.`,
      });
    }

    locallySorted.push(i);
    // Locally sorted state
    pushStep({
      type: 'mark_sorted',
      indices: [...locallySorted],
      description: `Sub-array up to index ${i} is now sorted.`,
    });
  }

  // Entire array is globally sorted
  pushStep({
    type: 'done',
    indices: [],
    description: '✅ Array is fully sorted!',
  });

  return steps;
}
