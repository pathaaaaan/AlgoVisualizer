import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function NodeElement({ value, isActive, type }) {
  const isTarget = type === 'insert' || type === 'delete';
  const bgColor = isActive ? 'bg-amber-400' : isTarget && type === 'insert' ? 'bg-emerald-500' : isTarget && type === 'delete' ? 'bg-red-500' : 'bg-primary/80';
  const glow = isActive ? 'shadow-amber-400/60 shadow-lg' : '';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.5, y: -20 }}
      animate={{ opacity: 1, scale: isActive ? 1.1 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: 20 }}
      transition={{ duration: 0.3 }}
      className={`
        relative w-16 h-16 flex items-center justify-center rounded-xl border-2 border-dark-border
        ${bgColor} ${glow} text-white font-mono font-bold text-lg
      `}
    >
      {value}
    </motion.div>
  );
}

function Arrow({ double }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: 32 }}
      exit={{ opacity: 0, width: 0 }}
      className="flex items-center justify-center text-text-muted shrink-0"
    >
      <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 12H32M22 6L32 12L22 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {double && (
          <path d="M10 6L0 12L10 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        )}
      </svg>
    </motion.div>
  );
}

export default function LinkedListVisualizer({ step }) {
  const containerRef = useRef(null);
  const nodeRefs = useRef({});
  const [circularPath, setCircularPath] = useState('');

  useEffect(() => {
    if (!step || step.listType !== 'circular' || !step.nodes || step.nodes.length <= 1) return;
    
    // Slight timeout allows Framer Motion layouts to settle before calculation
    const timer = setTimeout(updatePath, 350);
    
    function updatePath() {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      
      const firstNode = nodeRefs.current[step.nodes[0].id];
      const lastNode = nodeRefs.current[step.nodes[step.nodes.length - 1].id];
      
      if (!firstNode || !lastNode) return;
      
      const firstRect = firstNode.getBoundingClientRect();
      const lastRect = lastNode.getBoundingClientRect();
      
      // Calculate start and end offsets relative to the parent bounding frame
      const startX = (lastRect.left - containerRect.left) + (lastRect.width / 2);
      const startY = lastRect.bottom - containerRect.top;
      
      const endX = (firstRect.left - containerRect.left) + (firstRect.width / 2);
      const endY = firstRect.bottom - containerRect.top;
      
      // Draw smooth curve beneath element block
      setCircularPath(`M ${startX} ${startY + 5} C ${startX} ${startY + 60}, ${endX} ${endY + 60}, ${endX} ${endY + 12}`);
    }

    window.addEventListener('resize', updatePath);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePath);
    };
  }, [step]);
  if (!step || !step.nodes) {
    return (
      <div className="flex items-center justify-center h-48 text-text-muted text-sm">
        Waiting for Linked List payload...
      </div>
    );
  }

  const { nodes, current, description, type } = step;

  return (
    <div className="w-full flex flex-col items-center gap-12">
      {/* Explanation Banner */}
      <AnimatePresence mode="wait">
        {description && (
          <motion.div
            key={description}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className={`
              text-center text-sm font-medium px-4 py-2.5 rounded-xl border mx-auto max-w-xl shadow-md w-full
              ${type === 'delete' ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : type === 'insert' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : type === 'traverse' ? 'bg-amber-400/10 border-amber-400/30 text-amber-300'
                : 'bg-primary/10 border-primary/30 text-primary'
              }
            `}
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nodes Track */}
      <div ref={containerRef} className="relative flex items-center justify-center flex-wrap gap-y-16 min-h-[160px] px-4 w-full max-w-[800px]">
        <AnimatePresence mode="popLayout">
          {nodes.map((node, i) => (
            <div key={node.id} className="flex items-center">
              <div ref={el => nodeRefs.current[node.id] = el} className="flex flex-col items-center gap-1.5 relative">
                <span className="text-[10px] sm:text-xs font-mono font-bold text-text-muted absolute -top-5">
                  [{i}]
                </span>
                <NodeElement value={node.value} isActive={current === node.id} type={type} />
                <span className="text-[9px] font-mono text-text-muted/60 mt-1">Node {node.id}</span>
              </div>
              
              {/* Render arrow if not the last node */}
              {i < nodes.length - 1 && (
                <div className="px-1">
                  <Arrow double={step.listType === 'doubly'} />
                </div>
              )}
            </div>
          ))}
        </AnimatePresence>

        {/* Circular Link Back-Edge Overlay */}
        {step.listType === 'circular' && nodes.length > 1 && circularPath && (
           <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
              <defs>
                <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" className="text-cyan-500" />
                </marker>
              </defs>
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                d={circularPath}
                className="text-cyan-500"
                stroke="currentColor" 
                strokeWidth="2.5" 
                fill="none" 
                strokeDasharray="4 4"
                strokeLinecap="round"
                markerEnd="url(#arrowHead)"
              />
           </svg>
        )}
      </div>
      
      {/* Empty State */}
      {nodes.length === 0 && (
         <div className="text-text-muted text-sm font-medium">The Linked List is currently empty.</div>
      )}
    </div>
  );
}
