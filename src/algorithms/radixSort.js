export function generateRadixSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];
  const n = arr.length;
  let sortedIndices = [];
  
  if (n === 0) return steps;

  let maxVal = Math.max(...arr);
  let stats = {
    comparisons: 0,
    swaps: 0,
    writes: 0,
    steps: 0,
  };

  let currentBuckets = Array.from({ length: 10 }, () => []);

  const pushStep = (stepParams) => {
    stats.steps++;
    const clonedBuckets = currentBuckets.map(b => [...b]);
    
    const step = {
      ...stepParams,
      array: [...arr],
      buckets: clonedBuckets,
      sortedIndices: [...sortedIndices],
      stats: { ...stats },
    };
    Object.freeze(step.array);
    step.buckets.forEach(b => Object.freeze(b));
    Object.freeze(step.buckets);
    Object.freeze(step.sortedIndices);
    Object.freeze(step.stats);
    Object.freeze(step);
    steps.push(step);
  };

  for (let exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
    pushStep({
      type: 'digit',
      indices: [],
      description: `Starting pass for digit at exponent ${exp}.`
    });

    for (let i = 0; i < n; i++) {
      let bucketIndex = Math.floor(arr[i] / exp) % 10;
      currentBuckets[bucketIndex].push(arr[i]);
      
      pushStep({
        type: 'bucket', 
        indices: [i],
        description: `Inspecting ${arr[i]}. Digit is ${bucketIndex}. Pushing to bucket [${bucketIndex}].`
      });
    }

    let arrIndex = 0;
    for (let i = 0; i < 10; i++) {
      while (currentBuckets[i].length > 0) {
        let val = currentBuckets[i].shift();
        stats.writes++;
        arr[arrIndex] = val;
        
        pushStep({
          type: 'collect',
          indices: [arrIndex],
          description: `Popping ${val} from Bucket [${i}] back into primary array at index ${arrIndex}.`
        });
        
        arrIndex++;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    sortedIndices.push(i);
  }

  pushStep({
    type: 'done',
    indices: [],
    description: '✅ Array is fully sorted via Radix passes!',
  });

  return steps;
}
