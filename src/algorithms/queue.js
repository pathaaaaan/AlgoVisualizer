export function generateQueueSteps({ operation, values, enqueueValue }) {
  const steps = [];
  let arr = [...values];

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
      array: [...arr],
      indices,
      description,
      listType: 'queue',
      stats: { ...stats },
    };
    Object.freeze(step.array);
    Object.freeze(step.stats);
    Object.freeze(step);
    steps.push(step);
  };

  // Initial State
  pushStep('peek', 'Current Queue state.', []);

  if (operation === 'enqueue') {
    const val = enqueueValue !== undefined ? enqueueValue : Math.floor(Math.random() * 90) + 10;
    
    arr.push(val);
    stats.writes++;
    pushStep('enqueue', `Enqueuing ${val} at the rear of the queue.`, [arr.length - 1]);
    pushStep('done', `Enqueue operation complete.`, []);
  } 
  
  else if (operation === 'dequeue') {
    if (arr.length === 0) {
      pushStep('error', 'Queue Underflow: Cannot dequeue from an empty queue.', []);
      pushStep('done', 'Operation finished.', []);
    } else {
      const frontVal = arr[0];
      pushStep('dequeue', `Dequeuing element ${frontVal} from the front of the queue.`, [0]);
      
      // O(n) operation in JS array due to shifting — acceptable for visualization scale
      arr.shift();
      stats.writes++;
      pushStep('done', 'Dequeue complete. Remaining elements shift forward.', []);
    }
  } 
  
  else if (operation === 'peek') {
    if (arr.length === 0) {
      pushStep('error', 'Peek failed: Queue is empty.', []);
      pushStep('done', 'Operation finished.', []);
    } else {
      pushStep('peek', `Peeking front element: ${arr[0]}`, [0]);
      pushStep('done', 'Peek complete.', []);
    }
  }

  return steps;
}
