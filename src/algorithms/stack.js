export function generateStackSteps({ operation, values, pushValue }) {
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
      listType: 'stack',
      stats: { ...stats },
    };
    Object.freeze(step.array);
    Object.freeze(step.stats);
    Object.freeze(step);
    steps.push(step);
  };

  // Initial State
  pushStep('peek', 'Current Stack state.', []);

  if (operation === 'push') {
    const val = pushValue !== undefined ? pushValue : Math.floor(Math.random() * 90) + 10;
    
    // Adding element
    arr.push(val);
    stats.writes++;
    pushStep('push', `Pushing ${val} onto the stack.`, [arr.length - 1]);
    pushStep('done', `Push operation complete.`, []);
  } 
  
  else if (operation === 'pop') {
    if (arr.length === 0) {
      pushStep('error', 'Stack Underflow: Cannot pop from an empty stack.', []);
      pushStep('done', 'Operation finished.', []);
    } else {
      const topIdx = arr.length - 1;
      const val = arr[topIdx];
      pushStep('pop', `Popping top element ${val} from the stack.`, [topIdx]);
      
      arr.pop();
      stats.writes++;
      pushStep('done', 'Pop complete. New top exposed.', []);
    }
  } 
  
  else if (operation === 'peek') {
    if (arr.length === 0) {
      pushStep('error', 'Peek failed: Stack is empty.', []);
      pushStep('done', 'Operation finished.', []);
    } else {
      const topIdx = arr.length - 1;
      pushStep('peek', `Peeking top element: ${arr[topIdx]}`, [topIdx]);
      pushStep('done', 'Peek complete.', []);
    }
  }

  return steps;
}
