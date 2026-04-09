export function interpretStep(step) {
  if (!step) {
    return {
      array: [],
      colors: {},
      stats: { comparisons: 0, swaps: 0, writes: 0, steps: 0 },
      description: 'Waiting to start...',
    };
  }

  const colors = {};

  // Default color map for active elements
  const typeColorMap = {
    compare: 'compare',
    swap: 'swap',
    overwrite: 'swap', // Red for overwriting elements
    pivot: 'compare', // Special pivot handling (can be updated in renderer)
  };

  // 1. Mark natively marked indices from the step object
  if (step.indices && step.type) {
    const color = typeColorMap[step.type] || 'default';
    step.indices.forEach((idx) => {
      colors[idx] = color;
    });
  }

  // 2. Mark confirmed sorted elements safely
  if (step.sortedIndices) {
    step.sortedIndices.forEach((idx) => {
      // Prioritize active action over sorted green, or just mark them as sorted
      if (!colors[idx] || step.type === 'done') {
        colors[idx] = 'sorted';
      }
    });
  }

  // If done, everything should be marked sorted securely
  if (step.type === 'done' && step.array) {
    step.array.forEach((_, idx) => {
      colors[idx] = 'sorted';
    });
  }

  return {
    array: step.array || [],
    colors,
    stats: step.stats || { comparisons: 0, swaps: 0, writes: 0, steps: 0 },
    description: step.description || '',
  };
}
