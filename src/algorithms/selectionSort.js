export function generateSelectionSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];
  const n = arr.length;
  const sortedIndices = [];

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

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Start of pass
    pushStep({
      type: 'compare',
      indices: [i],
      description: `Setting A[${i}] (${arr[i]}) as the current minimum.`,
    });

    for (let j = i + 1; j < n; j++) {
      stats.comparisons++;
      pushStep({
        type: 'compare',
        indices: [minIdx, j],
        description: `Comparing current minimum (${arr[minIdx]}) with A[${j}] (${arr[j]})`,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        pushStep({
          type: 'compare',
          indices: [minIdx],
          description: `Found new minimum: ${arr[minIdx]} at index ${minIdx}.`,
        });
      }
    }

    if (minIdx !== i) {
      stats.swaps++;
      pushStep({
        type: 'swap',
        indices: [i, minIdx],
        description: `Swapping minimum (${arr[minIdx]}) with A[${i}] (${arr[i]})`,
      });
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }

    sortedIndices.push(i);
    pushStep({
      type: 'mark_sorted',
      indices: [i],
      description: `Element ${arr[i]} is now in its final sorted position.`,
    });
  }

  // Mark the last element as sorted
  sortedIndices.push(n - 1);
  pushStep({
    type: 'done',
    indices: [],
    description: '✅ Array is fully sorted!',
  });

  return steps;
}
