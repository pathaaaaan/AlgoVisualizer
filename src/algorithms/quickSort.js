export function generateQuickSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];
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

  function partition(low, high) {
    let pivot = arr[high];
    
    pushStep({
      type: 'pivot',
      indices: [high],
      partitionRange: [low, high],
      description: `Selected A[${high}] = ${pivot} as the pivot element. Partition range: [${low}-${high}].`,
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      stats.comparisons++;
      pushStep({
        type: 'compare',
        indices: [j, high],
        pivotIndex: high,
        partitionRange: [low, high],
        description: `Comparing A[${j}] = ${arr[j]} with pivot ${pivot}.`,
      });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          stats.swaps++;
          pushStep({
            type: 'swap',
            indices: [i, j],
            pivotIndex: high,
            partitionRange: [low, high],
            description: `${arr[j]} < ${pivot}, swapping A[${i}] and A[${j}].`,
          });
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
    }

    stats.swaps++;
    pushStep({
      type: 'swap',
      indices: [i + 1, high],
      pivotIndex: high,
      partitionRange: [low, high],
      description: `Placing pivot ${pivot} in its final sorted position.`,
    });
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    const pivotIndex = i + 1;
    sortedIndices.push(pivotIndex);
    pushStep({
      type: 'mark_sorted',
      indices: [pivotIndex],
      description: `Pivot ${pivot} is now mathematically sorted at index ${pivotIndex}.`,
    });

    return pivotIndex;
  }

  function quickSortRecursion(low, high) {
    if (low < high) {
      let pi = partition(low, high);
      quickSortRecursion(low, pi - 1);
      quickSortRecursion(pi + 1, high);
    } else if (low === high) {
      sortedIndices.push(low);
      pushStep({
        type: 'mark_sorted',
        indices: [low],
        description: `Element ${arr[low]} is in a partition of size 1 and is sorted.`,
      });
    }
  }

  quickSortRecursion(0, arr.length - 1);

  pushStep({
    type: 'done',
    indices: [],
    description: '✅ Array is fully sorted!',
  });

  return steps;
}
