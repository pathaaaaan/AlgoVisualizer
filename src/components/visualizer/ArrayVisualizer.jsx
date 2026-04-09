import { motion, AnimatePresence } from 'framer-motion';
import { interpretStep } from '../../utils/stepInterpreter';
import { ArrowDown, ArrowRight } from 'lucide-react';

const COLOR_CLASSES = {
  compare: {
    bg: 'bg-amber-400',
    border: 'border-amber-500',
    text: 'text-amber-950',
    label: 'text-amber-300',
    shadow: 'shadow-amber-400/60',
  },
  swap: {
    bg: 'bg-red-500',
    border: 'border-red-600',
    text: 'text-white',
    label: 'text-red-300',
    shadow: 'shadow-red-500/60',
  },
  sorted: {
    bg: 'bg-emerald-500',
    border: 'border-emerald-600',
    text: 'text-white',
    label: 'text-emerald-300',
    shadow: 'shadow-emerald-500/60',
  },
  pivot: {
    bg: 'bg-indigo-500',
    border: 'border-indigo-600',
    text: 'text-white',
    label: 'text-indigo-300',
    shadow: 'shadow-indigo-500/60',
  },
  default: {
    bg: 'bg-primary/80',
    border: 'border-primary',
    text: 'text-white',
    label: 'text-slate-400',
    shadow: 'shadow-primary/40',
  },
};

/* ── Sub-Component: StackView ─────────────────────── */
function StackView({ array, colors }) {
  return (
    <div className="flex flex-col-reverse items-center justify-center gap-2 min-h-[320px] pb-10">
      <AnimatePresence>
        {array.map((value, index) => {
          const state = colors[index] || 'default';
          const theme = COLOR_CLASSES[state];
          const isTop = index === array.length - 1;

          return (
            <motion.div
              key={`stack-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, x: 50 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative"
            >
              <div
                className={`
                  w-16 h-12 flex items-center justify-center rounded-lg border-2 font-mono font-bold text-lg shadow-md transition-all duration-300
                  ${theme.bg} ${theme.border} ${theme.text} ${theme.shadow}
                `}
              >
                {value}
              </div>
              {isTop && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute left-full ml-4 top-1/2 -translate-y-1/2 flex items-center gap-2 whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500 text-amber-950 text-[10px] font-bold uppercase tracking-tighter">
                    <ArrowRight size={10} /> Top ↑
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
      {array.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-48 h-12 border-2 border-dashed border-dark-border rounded-xl flex items-center justify-center text-[10px] text-text-muted uppercase font-bold tracking-widest text-center"
        >
          [ Empty Stack ]
        </motion.div>
      )}
    </div>
  );
}

/* ── Sub-Component: QueueView ─────────────────────── */
function QueueView({ array, colors }) {
  return (
    <div className="flex items-center justify-center gap-2 min-h-[200px] overflow-x-auto py-10 w-full px-10">
      <AnimatePresence>
        {array.map((value, index) => {
          const state = colors[index] || 'default';
          const theme = COLOR_CLASSES[state];
          const isFront = index === 0;
          const isRear = index === array.length - 1;

          return (
            <motion.div
              key={`queue-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.6, x: -50 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative shrink-0"
            >
              <div
                className={`
                  w-14 h-14 flex items-center justify-center rounded-lg border-2 font-mono font-bold text-lg shadow-md transition-all duration-300
                  ${theme.bg} ${theme.border} ${theme.text} ${theme.shadow}
                `}
              >
                {value}
              </div>
              
              {isFront && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Front</span>
                  <ArrowDown size={12} className="text-amber-500" />
                </div>
              )}
              
              {isRear && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Rear</span>
                  <ArrowDown size={12} className="text-cyan-400 rotate-180" />
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
      {array.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-14 w-64 border-2 border-dashed border-dark-border rounded-xl flex items-center justify-center text-[10px] text-text-muted uppercase font-bold tracking-widest"
        >
          [ Empty Queue ]
        </motion.div>
      )}
    </div>
  );
}

/* ── Sub-Component: Standard Bars (Sorting) ────────── */
function BarsView({ array, colors, maxVal, ranges }) {
  const isIndexInRange = (index, range) => {
    if (!range || !Array.isArray(range) || range.length !== 2) return false;
    return index >= range[0] && index <= range[1];
  };

  return (
    <div className="flex items-end justify-center w-full gap-1.5 h-64 px-2">
      {array.map((value, index) => {
        const state = colors[index] || 'default';
        const theme = COLOR_CLASSES[state];
        const heightPct = Math.max(6, (value / maxVal) * 100);
        const isActive = state !== 'default' && state !== 'sorted';

        const inLeft = isIndexInRange(index, ranges.left);
        const inRight = isIndexInRange(index, ranges.right);
        const inPart = isIndexInRange(index, ranges.partition);

        let borderClass = 'border-b-4 border-transparent';
        if (inLeft) borderClass = 'border-b-4 border-pink-500';
        else if (inRight) borderClass = 'border-b-4 border-cyan-500';
        else if (inPart) borderClass = 'border-b-4 border-indigo-500';

        return (
          <motion.div
            key={`bar-${index}`}
            layout
            animate={{ height: `${heightPct}%`, scaleY: isActive ? 1.05 : 1 }}
            className={`relative flex-1 rounded-t-md min-w-0 ${theme.bg} ${isActive ? `shadow-lg ${theme.shadow}` : ''} ${borderClass}`}
            style={{ minWidth: 8, maxWidth: 64 }}
          >
            {array.length <= 25 && (
              <span className={`absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-mono font-semibold ${theme.label}`}>
                {value}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── MAIN CONTROLLER: ArrayVisualizer ─────────────── */
export default function ArrayVisualizer({ step, structure }) {
  const { array, colors, overlays, ranges, description, listType } = interpretStep(step);
  const displayArray = (step?.array && step.array.length !== undefined) ? step.array : structure;

  // Render logic map
  const renderContent = () => {
    if (!displayArray || (displayArray.length === 0 && listType === 'default')) {
      return <div className="h-48 flex items-center justify-center text-text-muted text-sm">No array to visualize.</div>;
    }

    if (listType === 'stack') {
      return <StackView array={displayArray} colors={colors} />;
    }

    if (listType === 'queue') {
      return <QueueView array={displayArray} colors={colors} />;
    }

    const maxVal = Math.max(...displayArray, 1);
    return <BarsView array={displayArray} colors={colors} maxVal={maxVal} ranges={ranges} />;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Description Pill */}
      <AnimatePresence mode="wait">
        {description && (
          <motion.div
            key={description}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className={`
              text-center text-sm font-medium px-4 py-2.5 rounded-xl border mx-auto max-w-xl shadow-md w-full
              ${step?.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 
                step?.type === 'done' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                'bg-primary/10 border-primary/30 text-primary'}
            `}
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-8 w-full items-center">
        {renderContent()}

        {/* Auxiliary Array Overlays */}
        {overlays.aux && (
          <div className="p-4 rounded-xl border border-dark-border bg-dark-surface flex flex-col items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted">Count Array</span>
            <div className="flex gap-1.5 flex-wrap justify-center">
              {overlays.aux.map((val, i) => (
                <div key={`aux-${i}`} className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded shrink-0 flex items-center justify-center bg-primary text-white text-xs font-bold border-b-2 border-primary-hover">{val}</div>
                  <span className="text-[9px] text-text-muted font-mono mt-1">{i}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {overlays.buckets && (
          <div className="w-full flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-text-muted text-center">Radix Buckets</span>
            <div className="flex gap-2 w-full justify-center overflow-x-auto pb-4">
              {overlays.buckets.map((bucket, idx) => (
                <div key={`bucket-${idx}`} className="min-w-[64px] flex flex-col items-center gap-1">
                  <div className="w-full border-x border-b border-dark-border bg-dark-surface/50 rounded-b-xl min-h-[100px] p-2 flex flex-col-reverse gap-1">
                    {bucket.map((val, i) => (
                      <div key={`b-${idx}-${i}`} className="w-full py-1 text-center bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded text-xs font-bold">{val}</div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-text-muted">{idx}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
