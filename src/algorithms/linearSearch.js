export function generateLinearSearchSteps(inputArray, target) {
  const arr = [...inputArray];
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

  let foundIndex = -1;

  for (let i = 0; i < arr.length; i++) {
    stats.comparisons++;
    pushStep({
      type: 'compare',
      indices: [i],
      description: `Comparing A[${i}] = ${arr[i]} with target ${target}.`
    });

    if (arr[i] === target) {
      foundIndex = i;
      pushStep({
        type: 'found',
        indices: [i],
        description: `✅ Target ${target} found at index ${i}!`
      });
      break;
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
