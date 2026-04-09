export function generateBubbleSortSteps(inputArray) {
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
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Compare step
      stats.comparisons++;
      pushStep({
        type: 'compare',
        indices: [j, j + 1],
        description: `Comparing A[${j}] = ${arr[j]} and A[${j + 1}] = ${arr[j + 1]}`,
      });

      if (arr[j] > arr[j + 1]) {
        // Swap step
        stats.swaps++;
        pushStep({
          type: 'swap',
          indices: [j, j + 1],
          description: `Swapping ${arr[j]} and ${arr[j + 1]} — ${arr[j]} > ${arr[j + 1]}`,
        });

        // Perform swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // Mark as sorted
    sortedIndices.push(n - 1 - i);
    
    // Add an explicit sorted event for visual feedback
    pushStep({
      type: 'mark_sorted',
      indices: [n - 1 - i],
      description: `Element ${arr[n - 1 - i]} is now in its final sorted position.`,
    });

    if (!swapped) {
      for (let k = 0; k < n - 1 - i; k++) {
        sortedIndices.push(k);
      }
      break;
    }
  }

  // Final sorted marker
  if (!sortedIndices.includes(0)) sortedIndices.push(0);

  pushStep({
    type: 'done',
    indices: [],
    description: '✅ Array is fully sorted!',
  });

  return steps;
}
