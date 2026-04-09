import { motion, AnimatePresence } from 'framer-motion';
import { interpretStep } from '../../utils/stepInterpreter';

const COLOR_CLASSES = {
  compare: {
    bar: 'bg-amber-400',
    glow: 'shadow-amber-400/60',
    label: 'text-amber-300',
  },
  swap: {
    bar: 'bg-red-500',
    glow: 'shadow-red-500/60',
    label: 'text-red-300',
  },
  sorted: {
    bar: 'bg-emerald-500',
    glow: 'shadow-emerald-500/60',
    label: 'text-emerald-300',
  },
  pivot: {
    bar: 'bg-indigo-500',
    glow: 'shadow-indigo-500/60',
    label: 'text-indigo-300',
  },
  default: {
    bar: 'bg-primary/80',
    glow: 'shadow-primary/40',
    label: 'text-slate-400',
  },
};

function isIndexInRange(index, range) {
  if (!range || !Array.isArray(range) || range.length !== 2) return false;
  return index >= range[0] && index <= range[1];
}

export default function ArrayVisualizer({ step, fallbackArray }) {
  const { array, colors, overlays, ranges, description } = interpretStep(step);
  const displayArray = array.length > 0 ? array : fallbackArray;

  if (!displayArray || displayArray.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-text-muted text-sm">
        No array to visualize.
      </div>
    );
  }

  const maxVal = Math.max(...displayArray, 1);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Step description pill */}
      <AnimatePresence mode="wait">
        {description && (
          <motion.div
            key={description}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className={`
              text-center text-sm font-medium px-4 py-2.5 rounded-xl border mx-auto max-w-xl shadow-md w-full
              ${step?.type === 'done' || step?.type === 'mark_sorted'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : step?.type === 'swap' || step?.type === 'overwrite'
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : step?.type === 'compare'
                ? 'bg-amber-400/10 border-amber-400/30 text-amber-300'
                : step?.type === 'pivot' || step?.type === 'divide'
                ? 'bg-indigo-400/10 border-indigo-400/30 text-indigo-300'
                : step?.type === 'merge'
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                : 'bg-primary/10 border-primary/30 text-primary'
              }
            `}
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Blocks */}
      <div className="flex flex-col gap-8 w-full items-center">
        {/* Main Bars */}
        <div
          className="flex items-end justify-center w-full gap-1.5 h-64 px-2"
          role="img"
          aria-label="Array visualization bars"
        >
          {displayArray.map((value, index) => {
            const stateColor = colors[index] || 'default';
            const theme = COLOR_CLASSES[stateColor] || COLOR_CLASSES.default;
            
            const heightPct = Math.max(6, (value / maxVal) * 100);
            const isActive = stateColor !== 'default' && stateColor !== 'sorted';

            // Range indicators
            const inLeft = isIndexInRange(index, ranges.left);
            const inRight = isIndexInRange(index, ranges.right);
            const inPartition = isIndexInRange(index, ranges.partition);

            let borderClass = 'border-b-4 border-transparent';
            if (inLeft) borderClass = 'border-b-4 border-pink-500';
            else if (inRight) borderClass = 'border-b-4 border-cyan-500';
            else if (inPartition) borderClass = 'border-b-4 border-indigo-500';

            return (
              <motion.div
                key={`main-${index}`}
                layout
                initial={false}
                animate={{
                  height: `${heightPct}%`,
                  scaleY: isActive ? 1.04 : 1,
                }}
                transition={{
                  height: { duration: 0.18, ease: 'easeOut' },
                  scaleY: { duration: 0.12 },
                }}
                className={`
                  relative flex-1 rounded-t-md min-w-0
                  ${theme.bar}
                  ${isActive ? `shadow-lg ${theme.glow}` : ''}
                  ${borderClass}
                  transition-all duration-200
                `}
                style={{ minWidth: 8, maxWidth: 64 }}
              >
                {/* Value label */}
                {displayArray.length <= 25 && (
                  <span
                    className={`
                      absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-mono font-semibold
                      ${theme.label} select-none whitespace-nowrap
                    `}
                  >
                    {value !== null && value !== undefined ? value : ''}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Auxiliary Array (Counting Sort Context) */}
        {overlays.aux && (
          <div className="w-full flex justify-center mt-4">
            <div className="p-4 rounded-xl border border-dark-border bg-dark-surface flex flex-col items-center gap-3 w-fit max-w-full overflow-x-auto">
              <span className="text-xs uppercase tracking-widest font-semibold text-text-muted">Context Array (Aux)</span>
              <div className="flex gap-1.5 items-end">
                {overlays.aux.map((val, i) => {
                  return (
                    <motion.div
                      key={`aux-${i}`}
                      layout
                      className="w-8 h-8 rounded shrink-0 flex items-center justify-center bg-primary text-white text-xs font-mono font-bold border-b-2 border-primary-hover shadow-sm"
                    >
                      {val}
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex gap-1.5 w-full">
                 {overlays.aux.map((_, i) => (
                    <div key={`idx-${i}`} className="w-8 shrink-0 text-center text-[9px] text-text-muted font-mono">{i}</div>
                 ))}
              </div>
            </div>
          </div>
        )}

        {/* Buckets Array (Radix Sort Context) */}
        {overlays.buckets && (
          <div className="w-full mt-4 flex flex-col gap-3">
             <span className="text-xs uppercase tracking-widest font-semibold text-text-muted text-center w-full">Radix Buckets (0-9)</span>
             <div className="flex gap-2 w-full justify-center overflow-x-auto pb-4">
                {overlays.buckets.map((bucket, bucketIdx) => (
                   <div key={`bucket-${bucketIdx}`} className="min-w-16 w-16 flex flex-col items-center gap-1">
                      <div className="w-full border-x border-b border-light-border dark:border-dark-border bg-dark-surface/50 rounded-b-xl min-h-24 p-1.5 flex flex-col-reverse gap-1 justify-start overflow-hidden">
                         {bucket.map((val, itemIdx) => (
                           <motion.div
                             layout
                             initial={{ opacity: 0, y: -10 }}
                             animate={{ opacity: 1, y: 0 }}
                             key={`item-${val}-${itemIdx}`}
                             className="w-full py-1 text-center bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded text-xs font-mono font-bold"
                           >
                             {val}
                           </motion.div>
                         ))}
                      </div>
                      <span className="text-sm font-bold text-text-muted mt-1">{bucketIdx}</span>
                   </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
