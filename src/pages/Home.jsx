import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Layers, ListTree, Database, GitBranch, Network,
  Hash, Workflow, BrainCircuit, Waypoints, Sparkles,
  ArrowRight, BookOpen, Code2
} from 'lucide-react';

const topics = [
  {
    label: 'Array',
    slug: 'array',
    icon: Layers,
    gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
    description: 'Searching, sorting, and manipulation techniques on arrays.',
    count: 10,
  },
  {
    label: 'Linked List',
    slug: 'linked-list',
    icon: ListTree,
    gradient: 'linear-gradient(135deg, #22d3ee, #3b82f6)',
    description: 'Singly, doubly, and circular linked list operations.',
    count: 3,
  },
  {
    label: 'Stack & Queue',
    slug: 'stack-queue',
    icon: Database,
    gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
    description: 'LIFO and FIFO data structures with real-world applications.',
    count: 4,
  },
  {
    label: 'Tree',
    slug: 'tree',
    icon: GitBranch,
    gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
    description: 'Binary trees, BSTs, AVL trees, and traversal algorithms.',
    count: 7,
  },
  {
    label: 'Graph',
    slug: 'graph',
    icon: Network,
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    description: 'BFS, DFS, Dijkstra, Kruskal, and shortest path algorithms.',
    count: 5,
  },
  {
    label: 'Hashing',
    slug: 'hashing',
    icon: Hash,
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    description: 'Hash tables, collision resolution techniques.',
    count: 3,
  },
  {
    label: 'Recursion & Backtracking',
    slug: 'recursion',
    icon: Workflow,
    gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
    description: 'Recursive problem-solving and backtracking strategies.',
    count: 3,
  },
  {
    label: 'Dynamic Programming',
    slug: 'dp',
    icon: BrainCircuit,
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    description: 'Memoization, tabulation, and classic DP problems.',
    count: 4,
  },
  {
    label: 'Greedy',
    slug: 'greedy',
    icon: Waypoints,
    gradient: 'linear-gradient(135deg, #84cc16, #65a30d)',
    description: 'Activity selection, Huffman coding, and greedy approaches.',
    count: 3,
  },
];

const stats = [
  { label: 'Algorithms', value: '42+', icon: Code2 },
  { label: 'Topics', value: '9', icon: BookOpen },
  { label: 'Languages', value: '3', icon: Sparkles },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 py-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
          <Sparkles size={14} />
          Interactive DSA Learning
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-text-dark-primary dark:text-text-primary leading-tight">
          Master Algorithms
          <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Visually
          </span>
        </h1>
        <p className="text-lg text-text-dark-secondary dark:text-text-secondary max-w-xl mx-auto">
          Step-by-step visual walkthroughs of data structures and algorithms — with code in C++, Python, and JavaScript.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/learn')}
            className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold shadow-lg shadow-primary/25 transition-colors duration-200 flex items-center gap-2"
          >
            Start Learning <ArrowRight size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/algorithm/binary-search')}
            className="px-6 py-3 bg-light-surface dark:bg-dark-surface text-text-dark-secondary dark:text-text-secondary rounded-xl font-semibold border border-light-border dark:border-dark-border hover:border-primary/40 transition-all duration-200"
          >
            Try Binary Search
          </motion.button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl p-5 border text-center bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border"
          >
            <Icon size={20} className="mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-text-dark-primary dark:text-text-primary">{value}</div>
            <div className="text-xs text-text-dark-secondary dark:text-text-muted mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Topic Cards */}
      <div>
        <h2 className="text-xl font-bold text-text-dark-primary dark:text-text-primary mb-6">
          Browse Topics
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <motion.div
                key={topic.slug}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/learn/${topic.slug}`)}
                className="group relative rounded-2xl p-6 border cursor-pointer overflow-hidden transition-all duration-300 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Gradient top accent */}
                <div
                  className="absolute inset-x-0 top-0 h-0.5"
                  style={{ background: topic.gradient }}
                />
                {/* Glow blob on hover */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
                  style={{ background: topic.gradient }}
                />

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                    style={{ background: topic.gradient }}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-base font-bold text-text-dark-primary dark:text-text-primary mb-1.5 group-hover:text-primary transition-colors duration-200">
                    {topic.label}
                  </h3>
                  <p className="text-sm text-text-dark-secondary dark:text-text-secondary leading-relaxed mb-4">
                    {topic.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted dark:text-text-muted">
                      {topic.count} algorithms
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Explore <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
