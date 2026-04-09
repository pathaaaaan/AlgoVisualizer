import { useState, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, Info, ListChecks, Play, BarChart2,
  Code, Lightbulb, Clock, HardDrive, CheckCircle2
} from 'lucide-react';
import algorithms from '../data/algorithms';
import { algorithmRegistry } from '../algorithms';
import { useAlgorithmStepper } from '../hooks/useAlgorithmStepper';
import ArrayVisualizer from '../components/visualizer/ArrayVisualizer';
import LinkedListVisualizer from '../components/visualizer/LinkedListVisualizer';
import VisualizerControls from '../components/visualizer/VisualizerControls';

const LANGS = ['cpp', 'python', 'javascript'];
const LANG_LABELS = { cpp: 'C++', python: 'Python', javascript: 'JavaScript' };
const LANG_COLORS = {
  cpp: 'from-blue-500 to-blue-600',
  python: 'from-yellow-500 to-yellow-600',
  javascript: 'from-amber-400 to-orange-500',
};

// Handled via algorithmRegistry

/* ── Helpers ─────────────────────────────────────── */
function randomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

function parseCustomInput(str) {
  return str
    .split(/[\s,]+/)
    .map(Number)
    .filter((n) => !isNaN(n) && n > 0);
}

/* ── Section wrapper ──────────────────────────────── */
function Section({ id, icon: Icon, title, children, delay = 0 }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border overflow-hidden"
    >
      <div className="flex items-center gap-3 px-6 py-4 border-b border-light-border dark:border-dark-border bg-light-surface-hover/50 dark:bg-dark-surface-hover/30">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <Icon size={16} />
        </div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-text-dark-primary dark:text-text-primary">
          {title}
        </h2>
      </div>
      <div className="p-6">{children}</div>
    </motion.section>
  );
}

/* ── Complexity badge ─────────────────────────────── */
function Badge({ label, value, color = 'primary' }) {
  const colors = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    danger: 'bg-danger/10 text-danger border-danger/20',
    success: 'bg-success/10 text-success border-success/20',
  };
  return (
    <div className={`flex flex-col items-center gap-1 px-5 py-3 rounded-xl border ${colors[color]}`}>
      <span className="text-xs uppercase tracking-wider opacity-70">{label}</span>
      <span className="text-base font-bold font-mono">{value}</span>
    </div>
  );
}

/* ── Live Stats Box ───────────────────────────────── */
function StatBox({ label, live = 0, final = 0 }) {
  return (
    <div className="p-3 rounded-xl bg-light-surface-hover dark:bg-dark-surface-hover border border-light-border dark:border-dark-border text-center overflow-hidden">
      <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1 truncate">{label}</div>
      <div className="text-xl font-mono font-semibold text-text-dark-primary dark:text-text-primary">
        {Math.max(0, live)} <span className="text-text-muted text-sm font-normal">/ {final}</span>
      </div>
    </div>
  );
}

/* ── Code block ───────────────────────────────────── */
function CodeBlock({ code, lang }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative rounded-xl overflow-hidden border border-dark-border bg-dark-bg">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-dark-border bg-dark-surface-hover/50">
        <div className={`flex items-center gap-2 text-xs font-semibold text-white bg-gradient-to-r ${LANG_COLORS[lang]} px-2.5 py-0.5 rounded-md`}>
          <Code size={12} />
          {LANG_LABELS[lang]}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded-md hover:bg-dark-surface"
        >
          {copied ? <><CheckCircle2 size={12} className="text-success" /> Copied!</> : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-sm text-slate-300 font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ── Live Visualizer section ──────────────────────── */
function LiveVisualizer({ name }) {
  const algDef = algorithmRegistry[name];
  const isLinkedList = algDef?.type === 'linked_list';

  const [arraySize, setArraySize] = useState(16);
  const [customInput, setCustomInput] = useState('');
  const [baseArray, setBaseArray] = useState(() => isLinkedList ? [10, 20, 30, 40] : randomArray(16));
  
  // Specific states for Linked List UI
  const [llOperation, setLlOperation] = useState('traverse');
  const [llInsertValue, setLlInsertValue] = useState(25);
  const [llInsertPos, setLlInsertPos] = useState(2);
  const [llDeletePos, setLlDeletePos] = useState(1);
  const [llRunTrigger, setLlRunTrigger] = useState(0);

  // Memoize steps so we only recompute when baseArray changes or run is hit
  const steps = useMemo(() => {
    if (!algDef) return [];
    if (algDef.type === 'linked_list') {
      return algDef.generator({
        operation: llOperation,
        values: baseArray,
        insertValue: Number(llInsertValue),
        position: llOperation === 'insert' ? Number(llInsertPos) : Number(llDeletePos)
      });
    }
    return algDef.generator(baseArray);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseArray, algDef, llRunTrigger]);

  const {
    currentStep, currentIndex, totalSteps,
    isPlaying, isFirst, isLast, isDone,
    speedMs,
    play, pause, nextStep, prevStep, reset,
    changeSpeed,
  } = useAlgorithmStepper(steps);

  const handleShuffle = useCallback(() => {
    setBaseArray(randomArray(arraySize));
  }, [arraySize]);

  const handleArraySizeChange = useCallback((size) => {
    setArraySize(size);
    setBaseArray(randomArray(size));
  }, []);

  const handleCustomSubmit = useCallback(() => {
    const parsed = parseCustomInput(customInput);
    if (parsed.length > 0) {
      setBaseArray(parsed);
      setCustomInput('');
    }
  }, [customInput]);

  const runLLOperation = useCallback(() => {
     setLlRunTrigger(t => t + 1);
     reset();
  }, [reset]);

  return (
    <div className="space-y-6">
      {/* Color legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        {[
          { color: 'bg-primary', label: 'Unsorted' },
          { color: 'bg-amber-400', label: 'Active/Comparing/Traversing' },
          { color: 'bg-red-500', label: 'Swapping/Deleting' },
          { color: 'bg-emerald-500', label: 'Sorted/Inserted' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-text-secondary">
            <div className={`w-3 h-3 rounded-sm ${color}`} />
            {label}
          </div>
        ))}
      </div>

      {/* Stats Panel */}
      {steps.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatBox label="Comparisons" live={currentStep?.stats?.comparisons} final={steps[steps.length - 1].stats?.comparisons} />
          <StatBox label="Swaps" live={currentStep?.stats?.swaps} final={steps[steps.length - 1].stats?.swaps} />
          <StatBox label="Writes" live={currentStep?.stats?.writes} final={steps[steps.length - 1].stats?.writes} />
          <StatBox label="Steps (Frames)" live={currentIndex + 1} final={totalSteps} />
        </div>
      )}

      {/* Visualizer canvas */}
      <div className="rounded-xl bg-dark-bg border border-dark-border p-6 min-h-[280px] flex items-end">
        {isLinkedList ? (
           <LinkedListVisualizer step={currentStep} />
        ) : (
           <ArrayVisualizer step={currentStep} fallbackArray={baseArray} />
        )}
      </div>

      {/* Linked List Custom Operations Control Form */}
      {isLinkedList && (
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex flex-wrap items-end gap-4 shadow-sm">
           <div className="flex flex-col gap-1.5">
             <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Operation</label>
             <select 
                className="bg-dark-surface border border-dark-border text-sm rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-primary"
                value={llOperation}
                onChange={(e) => setLlOperation(e.target.value)}
             >
                <option value="traverse">Traversal</option>
                <option value="insert">Insert</option>
                <option value="delete">Delete</option>
             </select>
           </div>

           {llOperation === 'insert' && (
             <>
               <div className="flex flex-col gap-1.5">
                 <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Value</label>
                 <input type="number" className="w-20 bg-dark-surface border border-dark-border text-sm rounded-lg px-3 py-2 text-text-primary" value={llInsertValue} onChange={e => setLlInsertValue(e.target.value)} />
               </div>
               <div className="flex flex-col gap-1.5">
                 <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Position</label>
                 <input type="number" className="w-20 bg-dark-surface border border-dark-border text-sm rounded-lg px-3 py-2 text-text-primary" value={llInsertPos} onChange={e => setLlInsertPos(e.target.value)} />
               </div>
             </>
           )}

           {llOperation === 'delete' && (
             <div className="flex flex-col gap-1.5">
               <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Position</label>
               <input type="number" className="w-20 bg-dark-surface border border-dark-border text-sm rounded-lg px-3 py-2 text-text-primary" value={llDeletePos} onChange={e => setLlDeletePos(e.target.value)} />
             </div>
           )}

           {/* The user specifically wanted to be able to set the list base array easily too! */}
           <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
             <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">List Values (Comma separated)</label>
             <input type="text" className="w-full bg-dark-surface border border-dark-border text-sm rounded-lg px-3 py-2 text-text-primary" value={customInput} onChange={e => setCustomInput(e.target.value)} placeholder="10, 20, 30" />
           </div>

           <button 
             onClick={() => {
                if(customInput) { handleCustomSubmit(); }
                runLLOperation();
             }}
             className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center transition-colors"
           >
              Run Operation
           </button>
        </div>
      )}

      {/* Standard Engine Controls */}
      <VisualizerControls
        isPlaying={isPlaying}
        isFirst={isFirst}
        isLast={isLast}
        isDone={isDone}
        currentIndex={currentIndex}
        totalSteps={totalSteps}
        speedMs={speedMs}
        arraySize={arraySize}
        customInput={isLinkedList ? '' : customInput}
        onPlay={play}
        onPause={pause}
        onNext={nextStep}
        onPrev={prevStep}
        onReset={reset}
        onSpeedChange={changeSpeed}
        onArraySizeChange={handleArraySizeChange}
        onCustomInputChange={setCustomInput}
        onCustomInputSubmit={handleCustomSubmit}
        onShuffle={handleShuffle}
      />
    </div>
  );
}

/* ── AlgorithmPage ────────────────────────────────── */
export default function AlgorithmPage() {
  const { name } = useParams();
  const [activeTab, setActiveTab] = useState('cpp');

  const algo = algorithms[name];
  const hasVisualizer = !!algorithmRegistry[name];

  // Not found state
  if (!algo) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center text-danger">
          <Info size={28} />
        </div>
        <h2 className="text-xl font-bold text-text-dark-primary dark:text-text-primary">
          Algorithm not found
        </h2>
        <p className="text-text-dark-secondary dark:text-text-secondary text-sm max-w-sm">
          We don't have content for{' '}
          <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">{name}</code>{' '}
          yet — it's coming soon!
        </p>
        <Link to="/learn" className="text-primary hover:underline text-sm">
          ← Browse all topics
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-1.5 text-sm text-text-dark-secondary dark:text-text-muted flex-wrap"
      >
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link to="/learn" className="hover:text-primary transition-colors">Learn</Link>
        <ChevronRight size={14} />
        <span className="text-text-dark-secondary dark:text-text-muted">{algo.category}</span>
        <ChevronRight size={14} />
        <span className="text-text-dark-primary dark:text-text-primary font-medium">{algo.title}</span>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start justify-between flex-wrap gap-3"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-text-dark-primary dark:text-text-primary">
            {algo.title}
          </h1>
          <p className="text-sm text-text-dark-secondary dark:text-text-muted mt-1">{algo.category}</p>
        </div>
        {hasVisualizer && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Visualizer Live
          </span>
        )}
      </motion.div>

      {/* 1 — Overview */}
      <Section id="overview" icon={Info} title="Overview" delay={0.05}>
        <p className="text-text-dark-secondary dark:text-text-secondary leading-relaxed">
          {algo.overview}
        </p>
      </Section>

      {/* 2 — How It Works */}
      <Section id="how-it-works" icon={ListChecks} title="How It Works" delay={0.1}>
        <ol className="space-y-3">
          {algo.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="shrink-0 w-7 h-7 rounded-lg bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-text-dark-secondary dark:text-text-secondary leading-relaxed pt-0.5">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      {/* 3 — Visualizer (live OR placeholder) */}
      <Section id="visualizer" icon={Play} title="Visualizer" delay={0.15}>
        {hasVisualizer ? (
          <LiveVisualizer name={name} />
        ) : (
          <div className="rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-3 py-16 px-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Play size={26} />
            </div>
            <p className="font-semibold text-text-dark-primary dark:text-text-primary">
              Visualizer Coming Soon
            </p>
            <p className="text-sm text-text-dark-secondary dark:text-text-muted text-center max-w-xs">
              An interactive step-by-step animation of{' '}
              <span className="text-primary font-medium">{algo.title}</span> will appear here.
            </p>
          </div>
        )}
      </Section>

      {/* 4 — Complexity */}
      <Section id="complexity" icon={BarChart2} title="Complexity" delay={0.2}>
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-text-muted mb-3 flex items-center gap-2">
              <Clock size={12} /> Time Complexity
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge label="Best" value={algo.complexity.time.best} color="success" />
              <Badge label="Average" value={algo.complexity.time.average} color="warning" />
              <Badge label="Worst" value={algo.complexity.time.worst} color="danger" />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-text-muted mb-3 flex items-center gap-2">
              <HardDrive size={12} /> Space Complexity
            </p>
            <Badge label="Auxiliary" value={algo.complexity.space} color="accent" />
          </div>
        </div>
      </Section>

      {/* 5 — Code */}
      <Section id="code" icon={Code} title="Code" delay={0.25}>
        <div className="flex gap-1 mb-5 p-1 rounded-xl bg-light-surface-hover dark:bg-dark-surface-hover w-fit">
          {LANGS.map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === lang
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'text-text-dark-secondary dark:text-text-secondary hover:text-text-dark-primary dark:hover:text-text-primary'
              }`}
            >
              {LANG_LABELS[lang]}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <CodeBlock code={algo.code[activeTab]} lang={activeTab} />
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* 6 — Examples */}
      <Section id="examples" icon={Lightbulb} title="Examples" delay={0.3}>
        <div className="space-y-3">
          {algo.examples.map((ex, i) => (
            <div key={i} className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl bg-light-surface-hover dark:bg-dark-surface-hover border border-light-border dark:border-dark-border p-4">
                <p className="text-xs font-semibold text-text-muted dark:text-text-muted mb-2 uppercase tracking-wider">
                  Input
                </p>
                <code className="text-sm text-text-dark-primary dark:text-text-primary font-mono break-all">
                  {ex.input}
                </code>
              </div>
              <div className="rounded-xl bg-success/5 border border-success/20 p-4">
                <p className="text-xs font-semibold text-success/70 mb-2 uppercase tracking-wider">
                  Output
                </p>
                <code className="text-sm text-success font-mono font-bold">
                  {ex.output}
                </code>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
