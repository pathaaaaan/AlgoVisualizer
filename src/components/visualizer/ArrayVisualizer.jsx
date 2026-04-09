/**
 * RENDERER — UI Layer
 *
 * ArrayVisualizer reads the current step and renders bars.
 * Zero algorithm logic here.
 *
 * Bar colors:
 *   compare  → amber/yellow
 *   swap     → red
 *   sorted   → green
 *   default  → blue (primary)
 */

import { motion, AnimatePresence } from 'framer-motion';

const BAR_COLORS = {
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
  default: {
    bar: 'bg-primary',
    glow: 'shadow-primary/40',
    label: 'text-slate-400',
  },
};

function getBarColor(index, step) {
  if (!step) return BAR_COLORS.default;

  if (step.type === 'done' || (step.sortedIndices && step.sortedIndices.includes(index))) {
    return BAR_COLORS.sorted;
  }
  if (step.indices.includes(index)) {
    return BAR_COLORS[step.type] ?? BAR_COLORS.default;
  }
  return BAR_COLORS.default;
}

export default function ArrayVisualizer({ step, array }) {
  // Use the array snapshot from the step if available
  const displayArray = step?.array ?? array;

  if (!displayArray || displayArray.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-text-muted text-sm">
        No array to visualize.
      </div>
    );
  }

  const maxVal = Math.max(...displayArray);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Bars */}
      <div
        className="flex items-end justify-center gap-1.5 h-56 px-2"
        role="img"
        aria-label="Array visualization bars"
      >
        {displayArray.map((value, index) => {
          const colors = getBarColor(index, step);
          const heightPct = Math.max(6, (value / maxVal) * 100);
          const isActive = step?.indices?.includes(index);

          return (
            <motion.div
              key={index}
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
                ${colors.bar}
                ${isActive ? `shadow-lg ${colors.glow}` : ''}
                transition-colors duration-200
              `}
              style={{ minWidth: 8, maxWidth: 64 }}
            >
              {/* Value label — only show when bars aren't too narrow */}
              {displayArray.length <= 20 && (
                <span
                  className={`
                    absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-semibold
                    ${colors.label} select-none whitespace-nowrap
                  `}
                >
                  {value}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Step description pill */}
      <AnimatePresence mode="wait">
        {step && (
          <motion.div
            key={step.description}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className={`
              text-center text-sm font-medium px-4 py-2.5 rounded-xl border mx-auto max-w-md
              ${step.type === 'done'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : step.type === 'swap'
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : step.type === 'compare'
                ? 'bg-amber-400/10 border-amber-400/30 text-amber-300'
                : 'bg-primary/10 border-primary/30 text-primary'
              }
            `}
          >
            {step.description}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
