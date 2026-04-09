export function generateHeapSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];
  const sortedIndices = [];
  const n = arr.length;

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

  function heapify(size, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    pushStep({
      type: 'heapify',
      indices: [i],
      description: `Heapifying at root node index ${i} (${arr[i]}).`
    });

    if (left < size) {
      stats.comparisons++;
      pushStep({
        type: 'compare',
        indices: [largest, left],
        description: `Comparing parent ${arr[largest]} with left child ${arr[left]}.`
      });
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      stats.comparisons++;
      pushStep({
        type: 'compare',
        indices: [largest, right],
        description: `Comparing largest so far ${arr[largest]} with right child ${arr[right]}.`
      });
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      stats.swaps++;
      pushStep({
        type: 'swap',
        indices: [i, largest],
        description: `Swapping parent ${arr[i]} with larger child ${arr[largest]}.`
      });
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(size, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements one by one from heap
  for (let i = n - 1; i > 0; i--) {
    stats.swaps++;
    pushStep({
      type: 'swap',
      indices: [0, i],
      description: `Extracting max element ${arr[0]} to the end of the array (index ${i}).`
    });
    [arr[0], arr[i]] = [arr[i], arr[0]];

    sortedIndices.push(i);
    pushStep({
      type: 'mark_sorted',
      indices: [i],
      description: `Element ${arr[i]} is now securely in its final sorted position.`
    });

    heapify(i, 0);
  }

  // Final element extraction
  sortedIndices.push(0);
  pushStep({
    type: 'mark_sorted',
    indices: [0],
    description: `Final element ${arr[0]} is naturally sorted.`
  });

  pushStep({
    type: 'done',
    indices: [],
    description: '✅ Array is fully sorted!',
  });

  return steps;
}
