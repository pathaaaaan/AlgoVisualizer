export function generateLinkedListSteps({ type: listType, operation, values, insertValue, position }) {
  const steps = [];
  
  // Convert standard values array into structured nodes.
  // Use index-based IDs for initial nodes to ensure stability across re-renders
  let nodes = values.map((val, i) => ({ id: `node-${i}`, value: val }));
  let nextNodeCounter = values.length;

  let stats = {
    comparisons: 0,
    swaps: 0,
    writes: 0,
    steps: 0,
  };

  const getLinks = (currentNodes) => {
    const links = [];
    // If we have fewer than 2 nodes, no links except possibly circular
    if (currentNodes.length < 2) {
      if (listType === 'circular' && currentNodes.length === 1) {
        links.push({ from: currentNodes[0].id, to: currentNodes[0].id });
      }
      return links;
    }
    
    for (let i = 0; i < currentNodes.length - 1; i++) {
      links.push({ from: currentNodes[i].id, to: currentNodes[i + 1].id });
      if (listType === 'doubly') {
        links.push({ from: currentNodes[i + 1].id, to: currentNodes[i].id });
      }
    }

    if (listType === 'circular') {
      links.push({ from: currentNodes[currentNodes.length - 1].id, to: currentNodes[0].id });
    }
    return links;
  };

  const pushStep = (type, description, current = null) => {
    stats.steps++;
    const step = {
      type,
      nodes: nodes.map(n => ({ ...n })),
      links: getLinks(nodes),
      current,
      listType,
      description,
      stats: { ...stats },
    };
    Object.freeze(step.nodes);
    Object.freeze(step.links);
    Object.freeze(step.stats);
    Object.freeze(step);
    steps.push(step);
  };

  // 1. Initial State
  pushStep('traverse', `Initial ${listType} Linked List state.`, null);

  if (operation === 'traverse') {
    for (let i = 0; i < nodes.length; i++) {
      pushStep('traverse', `Visiting node at index ${i}. Value: ${nodes[i].value}`, nodes[i].id);
    }
  } 
  
  else if (operation === 'insert') {
    const val = insertValue !== undefined ? insertValue : Math.floor(Math.random() * 90) + 10;
    const pos = position !== undefined ? Math.max(0, Math.min(position, nodes.length)) : nodes.length;

    // Traverse to insertion point
    for (let i = 0; i < pos; i++) {
      pushStep('traverse', `Searching for insertion point... currently at node ${i}`, nodes[i].id);
    }

    // Create new node with a unique ID
    const newNodeId = `node-new-${nextNodeCounter++}`;
    const newNode = { id: newNodeId, value: val };
    
    pushStep('insert', `Creating new node with value ${val}.`, newNodeId);

    // Actually insert into the array for the next steps
    nodes.splice(pos, 0, newNode);
    stats.writes++;

    pushStep('link', `Linking new node into the list at position ${pos}.`, newNodeId);
  } 
  
  else if (operation === 'delete') {
    if (nodes.length === 0) {
      pushStep('done', 'Cannot delete from an empty list.', null);
      return steps;
    }

    const pos = position !== undefined ? Math.max(0, Math.min(position, nodes.length - 1)) : 0;

    // Traverse to target
    for (let i = 0; i < pos; i++) {
      pushStep('traverse', `Traversing to target node... currently at index ${i}`, nodes[i].id);
    }

    const targetNodeId = nodes[pos].id;
    pushStep('traverse', `Target node identified for deletion.`, targetNodeId);

    // Delete node
    const deletedNode = nodes.splice(pos, 1)[0];
    stats.writes++;

    pushStep('delete', `Node with value ${deletedNode.value} removed.`, targetNodeId);
    pushStep('link', `Re-linking surrounding nodes to bypass the deleted element.`, null);
  }

  pushStep('done', `Operation ${operation} finished successfully.`, null);

  return steps;
}
