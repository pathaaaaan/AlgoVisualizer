export function interpretStep(step) {
  const defaultPayload = {
    array: [],
    colors: {},
    overlays: { aux: null, buckets: null },
    ranges: { left: null, right: null, partition: null },
    stats: { comparisons: 0, swaps: 0, writes: 0, steps: 0 },
    description: 'Waiting to start...',
    listType: 'default',
  };

  if (!step) {
    return defaultPayload;
  }

  const colors = {};

  const typeColorMap = {
    compare: 'compare',
    swap: 'swap',
    overwrite: 'swap',
    pivot: 'pivot',
    divide: 'compare',
    merge: 'sorted',
    heapify: 'compare',
    count: 'compare',
    prefix: 'compare',
    digit: 'compare',
    bucket: 'compare',
    collect: 'swap',
    found: 'sorted',
    not_found: 'swap',
    range: 'compare',
    // Stack and Queue specific
    push: 'sorted',
    peek: 'compare',
    pop: 'swap',
    enqueue: 'sorted',
    dequeue: 'swap',
    error: 'swap',
  };

  // 1. Mark natively mapped indices from the step
  if (step.indices && step.type) {
    const color = typeColorMap[step.type] || 'default';
    step.indices.forEach((idx) => {
      colors[idx] = color;
    });
  }

  // Highlight pivot explicitly if passed directly
  if (step.pivotIndex !== undefined) {
    colors[step.pivotIndex] = 'pivot';
  }

  // 2. Mark confirmed sorted elements safely
  if (step.sortedIndices) {
    step.sortedIndices.forEach((idx) => {
      if (!colors[idx] || step.type === 'done') {
        colors[idx] = 'sorted';
      }
    });
  }

  if (step.type === 'done' && step.array) {
    step.array.forEach((_, idx) => {
      colors[idx] = 'sorted';
    });
  }

  return {
    array: step.array || [],
    colors,
    listType: step.listType || 'default',
    overlays: {
      aux: step.auxiliaryArray || null,
      buckets: step.buckets || null,
    },
    ranges: {
      left: step.leftRange || null,
      right: step.rightRange || null,
      partition: step.partitionRange || null,
    },
    stats: step.stats || defaultPayload.stats,
    description: step.description || '',
  };
}
