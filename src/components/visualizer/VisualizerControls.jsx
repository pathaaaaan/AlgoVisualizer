/**
 * CONTROLS UI
 * Play / Pause / Prev / Next / Reset
 * Speed slider + Step counter
 * Array size slider + Custom input
 */

import { Play, Pause, SkipBack, SkipForward, RotateCcw, Shuffle } from 'lucide-react';
import { motion } from 'framer-motion';

const SPEED_OPTIONS = [
  { label: '0.25×', ms: 2000 },
  { label: '0.5×', ms: 1000 },
  { label: '1×', ms: 500 },
  { label: '2×', ms: 250 },
  { label: '4×', ms: 100 },
];

export default function VisualizerControls({
  isPlaying,
  isFirst,
  isLast,
  isDone,
  currentIndex,
  totalSteps,
  speedMs,
  arraySize,
  customInput,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  onSpeedChange,
  onArraySizeChange,
  onCustomInputChange,
  onCustomInputSubmit,
  onShuffle,
}) {
  return (
    <div className="space-y-5">
      {/* ── Main controls ───────────────────────────── */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Reset */}
        <ControlBtn
          id="ctrl-reset"
          onClick={onReset}
          title="Reset"
          aria-label="Reset"
          className="text-text-secondary hover:text-text-primary"
        >
          <RotateCcw size={18} />
        </ControlBtn>

        {/* Prev */}
        <ControlBtn
          id="ctrl-prev"
          onClick={onPrev}
          disabled={isFirst}
          title="Previous step"
          aria-label="Previous step"
        >
          <SkipBack size={18} />
        </ControlBtn>

        {/* Play / Pause — primary */}
        <motion.button
          id={isPlaying ? 'ctrl-pause' : 'ctrl-play'}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={isPlaying ? onPause : onPlay}
          disabled={isDone && !isPlaying}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200
            ${isPlaying
              ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30'
              : 'bg-primary hover:bg-primary-hover shadow-primary/30'
            }
            text-white disabled:opacity-40 disabled:cursor-not-allowed
          `}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </motion.button>

        {/* Next */}
        <ControlBtn
          id="ctrl-next"
          onClick={onNext}
          disabled={isLast}
          title="Next step"
          aria-label="Next step"
        >
          <SkipForward size={18} />
        </ControlBtn>

        {/* Shuffle */}
        <ControlBtn
          id="ctrl-shuffle"
          onClick={onShuffle}
          title="New random array"
          aria-label="New random array"
          className="text-text-secondary hover:text-accent"
        >
          <Shuffle size={18} />
        </ControlBtn>
      </div>

      {/* ── Step progress bar ────────────────────────── */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-text-muted">
          <span>Step {currentIndex + 1} of {totalSteps}</span>
          <span>{Math.round(((currentIndex + 1) / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-dark-surface-hover overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${((currentIndex + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>
      </div>

      {/* ── Speed selector ───────────────────────────── */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-text-muted shrink-0">Speed</span>
        <div className="flex gap-1 flex-wrap">
          {SPEED_OPTIONS.map(({ label, ms }) => (
            <button
              key={ms}
              id={`speed-${label}`}
              onClick={() => onSpeedChange(ms)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                speedMs === ms
                  ? 'bg-primary text-white'
                  : 'bg-dark-surface-hover dark:bg-dark-surface-hover text-text-secondary hover:text-text-primary hover:bg-dark-border'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Array size slider ────────────────────────── */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-text-muted shrink-0 w-20">Array size</span>
        <input
          id="array-size-slider"
          type="range"
          min={4}
          max={50}
          value={arraySize}
          onChange={(e) => onArraySizeChange(Number(e.target.value))}
          className="flex-1 accent-primary cursor-pointer"
          aria-label="Array size"
        />
        <span className="text-xs font-mono text-text-secondary w-6 text-right">{arraySize}</span>
      </div>

      {/* ── Custom input ─────────────────────────────── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCustomInputSubmit();
        }}
        className="flex gap-2"
      >
        <input
          id="custom-array-input"
          type="text"
          placeholder="e.g. 5, 3, 8, 1, 9, 2"
          value={customInput}
          onChange={(e) => onCustomInputChange(e.target.value)}
          className="flex-1 text-sm px-3 py-2 rounded-xl bg-dark-surface border border-dark-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          aria-label="Custom array input"
        />
        <button
          id="custom-array-submit"
          type="submit"
          className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-colors duration-200"
        >
          Set
        </button>
      </form>
    </div>
  );
}

/* ── Small icon button ───────────────────────────── */
function ControlBtn({ children, disabled, className = '', ...props }) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.08 } : {}}
      whileTap={!disabled ? { scale: 0.92 } : {}}
      disabled={disabled}
      className={`
        w-10 h-10 rounded-full flex items-center justify-center
        bg-dark-surface border border-dark-border
        text-text-secondary hover:text-text-primary hover:border-primary/40
        disabled:opacity-30 disabled:cursor-not-allowed
        transition-all duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}
