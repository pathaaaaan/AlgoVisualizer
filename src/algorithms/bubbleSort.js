/**
 * ALGORITHM LAYER — Pure Logic Only
 * No UI, No DOM, No React.
 *
 * generateBubbleSortSteps(array)
 * Returns a Step[] describing every action bubble sort takes.
 *
 * Step shape:
 * {
 *   type: "compare" | "swap" | "overwrite" | "pivot" | "done",
 *   indices: number[],
 *   values?: number[],
 *   array: number[],        ← snapshot of array AT this step
 *   sortedIndices: number[] ← indices confirmed sorted so far
 *   description: string,
 * }
 */

export function generateBubbleSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];
  const n = arr.length;
  const sortedIndices = [];

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Compare step
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        array: [...arr],
        sortedIndices: [...sortedIndices],
        description: `Comparing A[${j}] = ${arr[j]} and A[${j + 1}] = ${arr[j + 1]}`,
      });

      if (arr[j] > arr[j + 1]) {
        // Swap step — record BEFORE the swap
        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          array: [...arr],
          sortedIndices: [...sortedIndices],
          description: `Swapping ${arr[j]} and ${arr[j + 1]} — ${arr[j]} > ${arr[j + 1]}`,
        });

        // Actually perform the swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // Mark the last element of this pass as sorted
    sortedIndices.push(n - 1 - i);

    if (!swapped) {
      // Early exit — rest is already sorted
      for (let k = 0; k < n - 1 - i; k++) {
        sortedIndices.push(k);
      }
      break;
    }
  }

  // Always mark index 0 as sorted at the end
  if (!sortedIndices.includes(0)) sortedIndices.push(0);

  // Final "done" step — full sorted array
  steps.push({
    type: 'done',
    indices: [],
    array: [...arr],
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    description: '✅ Array is fully sorted!',
  });

  return steps;
}
