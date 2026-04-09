export function generateCountingSortSteps(inputArray) {
  const steps = [];
  const n = inputArray.length;
  if (n === 0) return steps;

  const maxVal = Math.max(...inputArray);
  const countArr = new Array(maxVal + 1).fill(0);
  
  // We'll show the original array during counting, then the output array being built during placement.
  let visualizationArray = [...inputArray];

  let stats = {
    comparisons: 0,
    swaps: 0,
    writes: 0,
    steps: 0,
  };

  const pushStep = (type, description, indices = []) => {
    stats.steps++;
    const step = {
      type,
      array: [...visualizationArray],
      auxiliaryArray: [...countArr],
      indices,
      description,
      stats: { ...stats },
    };
    Object.freeze(step.array);
    Object.freeze(step.auxiliaryArray);
    Object.freeze(step.stats);
    Object.freeze(step);
    steps.push(step);
  };

  // Phase 1: Counting
  for (let i = 0; i < n; i++) {
    const val = inputArray[i];
    countArr[val]++;
    pushStep('count', `Increment count of ${val} in the frequency array.`, [i]);
  }

  // Phase 2: Prefix Sum
  for (let i = 1; i <= maxVal; i++) {
    countArr[i] += countArr[i - 1];
    pushStep('prefix', `Building prefix sum: count[${i}] = count[${i}] + count[${i-1}] (${countArr[i]})`);
  }

  // Phase 3: Placement
  // We use a zeroed array to represent the output buffer being filled
  const outputArr = new Array(n).fill(0);
  visualizationArray = [...outputArr]; // Switch visual to the output buffer
  
  for (let i = n - 1; i >= 0; i--) {
    const val = inputArray[i];
    const pos = countArr[val] - 1;
    
    countArr[val]--;
    outputArr[pos] = val;
    visualizationArray = [...outputArr];
    
    stats.writes++;
    pushStep('overwrite', `Placing ${val} at sorted position ${pos} and decrementing its count.`, [pos]);
  }

  pushStep('done', 'Sorting complete! The array is now in non-decreasing order.');

  return steps;
}
