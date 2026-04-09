export function generateBinarySearchSteps(inputArray, target) {
  // Binary search requires a sorted array
  const arr = [...inputArray].sort((a, b) => a - b);
  if (target === undefined) {
    // Fallback: pick a random element to search for
    target = arr[Math.floor(Math.random() * arr.length)];
  }

  const steps = [];
  let stats = { comparisons: 0, swaps: 0, writes: 0, steps: 0 };

  const pushStep = (stepParams) => {
    stats.steps++;
    const step = {
      ...stepParams,
      array: [...arr],
      stats: { ...stats },
    };
    Object.freeze(step.array);
    Object.freeze(step.stats);
    Object.freeze(step);
    steps.push(step);
  };

  let left = 0;
  let right = arr.length - 1;
  let foundIndex = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    pushStep({
      type: 'range',
      leftRange: [left, left],
      rightRange: [right, right],
      partitionRange: [left, right], // used to highlight active search area
      indices: [mid],
      description: `Searching space [${left}-${right}]. Calculating mid = ${mid}.`
    });

    stats.comparisons++;
    pushStep({
      type: 'compare',
      leftRange: [left, left],
      rightRange: [right, right],
      partitionRange: [left, right],
      indices: [mid],
      description: `Comparing A[${mid}] = ${arr[mid]} with target ${target}.`
    });

    if (arr[mid] === target) {
      foundIndex = mid;
      pushStep({
        type: 'found',
        indices: [mid],
        description: `✅ Target ${target} found at index ${mid}!`
      });
      break;
    }

    if (arr[mid] < target) {
      pushStep({
        type: 'compare',
        partitionRange: [left, right],
        indices: [mid],
        description: `${arr[mid]} < ${target}. Discarding left half focusing on [${mid + 1}-${right}].`
      });
      left = mid + 1;
    } else {
      pushStep({
        type: 'compare',
        partitionRange: [left, right],
        indices: [mid],
        description: `${arr[mid]} > ${target}. Discarding right half focusing on [${left}-${mid - 1}].`
      });
      right = mid - 1;
    }
  }

  if (foundIndex === -1) {
    pushStep({
      type: 'done',
      indices: [],
      description: `Target ${target} was not found in the array.`
    });
  } else {
    pushStep({
      type: 'done',
      indices: [foundIndex],
      description: `Search completed successfully.`
    });
  }

  return steps;
}
