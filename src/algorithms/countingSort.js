export function generateCountingSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];
  const n = arr.length;
  const sortedIndices = [];
  
  if (n === 0) return steps;

  let maxVal = Math.max(...arr);
  let countArr = new Array(maxVal + 1).fill(0);

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
      auxiliaryArray: [...countArr],
      sortedIndices: [...sortedIndices],
      stats: { ...stats },
    };
    Object.freeze(step.array);
    Object.freeze(step.auxiliaryArray);
    Object.freeze(step.sortedIndices);
    Object.freeze(step.stats);
    Object.freeze(step);
    steps.push(step);
  };

  // Phase 1: Frequency Array
  for (let i = 0; i < n; i++) {
    stats.comparisons++; 
    countArr[arr[i]]++;
    pushStep({
      type: 'count',
      indices: [i],
      description: `Counting occurrence of ${arr[i]}. Incremented Aux[${arr[i]}].`
    });
  }

  // Phase 2: Prefix Sum
  for (let i = 1; i <= maxVal; i++) {
    countArr[i] += countArr[i - 1];
  }
  pushStep({
    type: 'prefix',
    indices: [],
    description: `Converted Context Array into Prefix Sum array resolving final placements.`
  });

  // Phase 3: Placement (Output Array)
  const outputArr = new Array(n).fill(null);
  for (let i = n - 1; i >= 0; i--) {
    const val = arr[i];
    const pos = countArr[val] - 1;
    
    countArr[val]--;
    outputArr[pos] = val;

    pushStep({
      type: 'overwrite',
      indices: [i], 
      description: `Placing ${val} at index ${pos} in output buffer. Decrementing Aux[${val}].`
    });
  }

  // Phase 4: Copy Back completely
  for (let i = 0; i < n; i++) {
    stats.writes++;
    arr[i] = outputArr[i];
    sortedIndices.push(i);
    
    pushStep({
      type: 'overwrite',
      indices: [i],
      description: `Writing mapped sorted value ${arr[i]} back to primary array.`
    });
  }

  pushStep({
    type: 'done',
    indices: [],
    description: '✅ Array is fully sorted!',
  });

  return steps;
}
