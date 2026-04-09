export function generateLinkedListSteps({ operation, values, insertValue, position }) {
  const steps = [];
  
  // Convert standard values array into structured nodes.
  let nodes = values.map((val, i) => ({ id: i + 1, value: val }));
  let nextIdTracker = nodes.length + 1;

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
      nodes: nodes.map(n => ({ ...n })), // Safe clone
      stats: { ...stats },
    };
    Object.freeze(step.nodes);
    Object.freeze(step.stats);
    Object.freeze(step);
    steps.push(step);
  };

  // 1. Initial State showing the list before the operation
  pushStep({
    type: 'traverse',
    current: null,
    description: `Initial Linked List loaded with ${nodes.length} nodes.`
  });

  if (operation === 'traverse') {
    for (let i = 0; i < nodes.length; i++) {
      pushStep({
        type: 'traverse',
        current: nodes[i].id,
        description: `Traversing node ${nodes[i].id}. Value: ${nodes[i].value}`
      });
    }
    pushStep({
      type: 'done',
      current: null,
      description: `✅ Traversal complete. Reached the end of the Linked List.`
    });
  } 
  
  else if (operation === 'insert') {
    const val = insertValue || Math.floor(Math.random() * 90) + 10;
    const pos = position !== undefined ? Math.max(0, Math.min(position, nodes.length)) : nodes.length;
    
    // Traverse to insertion point
    let currentId = null;
    for (let i = 0; i < pos; i++) {
        currentId = nodes[i].id;
        pushStep({
            type: 'traverse',
            current: currentId,
            description: `Traversing to find insertion point. Currently at Node ${currentId}.`
        });
    }

    const newNodeId = nextIdTracker++;
    const newNode = { id: newNodeId, value: val };

    pushStep({
        type: 'insert',
        current: newNodeId,
        description: `Creating new Node ${newNodeId} with value ${val}.`
    });

    nodes.splice(pos, 0, newNode);
    stats.writes++;

    pushStep({
        type: 'link',
        current: newNodeId,
        description: `Updating NEXT pointer to link Node ${newNodeId} securely at position ${pos}.`
    });

    pushStep({
      type: 'done',
      current: null,
      description: `✅ Inserted Node ${newNodeId} (${val}) successfully.`
    });
  } 
  
  else if (operation === 'delete') {
    if (nodes.length === 0) {
      pushStep({
        type: 'done',
        current: null,
        description: `Error: The list is already empty.`
      });
      return steps;
    }

    const pos = position !== undefined ? Math.max(0, Math.min(position, nodes.length - 1)) : nodes.length - 1;

    // Traverse to deletion target
    for (let i = 0; i <= pos; i++) {
        pushStep({
            type: 'traverse',
            current: nodes[i].id,
            description: `Traversing list... currently at Node ${nodes[i].id}.`
        });
    }

    const deletedNode = nodes[pos];

    pushStep({
        type: 'delete',
        current: deletedNode.id,
        description: `Unlinking Node ${deletedNode.id} from the list. Updating surrounding pointers.`
    });

    nodes.splice(pos, 1);
    stats.writes++;

    pushStep({
      type: 'done',
      current: null,
      description: `✅ Deleted Node ${deletedNode.id} successfully.`
    });
  }

  return steps;
}
