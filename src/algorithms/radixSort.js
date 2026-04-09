export function generateRadixSortSteps(inputArray) {
  const steps = [];
  const n = inputArray.length;
  if (n === 0) return steps;

  let arr = [...inputArray];
  const maxVal = Math.max(...arr);

  let stats = {
    comparisons: 0,
    swaps: 0,
    writes: 0,
    steps: 0,
  };

  const pushStep = (type, description, buckets = null, currentDigit = 1, indices = []) => {
    stats.steps++;
    const step = {
      type,
      array: [...arr],
      buckets: buckets ? buckets.map((b) => [...b]) : null,
      currentDigit,
      indices,
      description,
      stats: { ...stats },
    };
    Object.freeze(step.array);
    if (step.buckets) {
      step.buckets.forEach((b) => Object.freeze(b));
      Object.freeze(step.buckets);
    }
    Object.freeze(step.stats);
    Object.freeze(step);
    steps.push(step);
  };

  // Main Radix Loop
  for (let exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
    const buckets = Array.from({ length: 10 }, () => []);
    pushStep('digit', `Starting pass for the ${exp}s digit position.`, buckets, exp);

    // DISTRIBUTION
    for (let i = 0; i < n; i++) {
      const num = arr[i];
      const digit = Math.floor(num / exp) % 10;
      buckets[digit].push(num);
      pushStep('bucket', `Distributing: placing ${num} into bucket ${digit}.`, buckets, exp, [i]);
    }

    // COLLECTION
    // We emit a 'collect' step showing the buckets before they are emptied relative to the array update
    pushStep('collect', `Flattening buckets back into the main array for the ${exp}s pass.`, buckets, exp);

    let idx = 0;
    for (let i = 0; i < 10; i++) {
      while (buckets[i].length > 0) {
        const val = buckets[i].shift();
        arr[idx] = val;
        stats.writes++;
        idx++;
        // We can optionally emit a step for each element being collected if the UX feels too fast
      }
    }

    // OVERWRITE STEP
    pushStep('overwrite', `Pass for digit ${exp} complete. Primary array updated.`, null, exp);
  }

  pushStep('done', 'Radix Sort is complete! All digit passes finished.', null);

  return steps;
}
