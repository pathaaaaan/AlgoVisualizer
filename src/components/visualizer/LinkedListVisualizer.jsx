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

function Arrow() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: 32 }}
      exit={{ opacity: 0, width: 0 }}
      className="flex items-center justify-center text-text-muted"
    >
      <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 12H28M28 12L18 4M28 12L18 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.div>
  );
}

export default function LinkedListVisualizer({ step }) {
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
      <div className="flex items-center justify-center flex-wrap gap-y-8 min-h-32 px-4 w-full">
        <AnimatePresence mode="popLayout">
          {nodes.map((node, i) => (
            <div key={node.id} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <NodeElement value={node.value} isActive={current === node.id} type={type} />
                <span className="text-[10px] font-mono text-text-muted">Node {node.id}</span>
              </div>
              
              {/* Render arrow if not the last node */}
              {i < nodes.length - 1 && (
                <div className="px-2">
                  <Arrow />
                </div>
              )}
            </div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Empty State */}
      {nodes.length === 0 && (
         <div className="text-text-muted text-sm font-medium">The Linked List is currently empty.</div>
      )}
    </div>
  );
}
