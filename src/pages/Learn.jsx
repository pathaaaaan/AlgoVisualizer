import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import sidebarData from '../data/sidebarData';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function countLeaves(node) {
  if (!node.children) return 1;
  return node.children.reduce((sum, child) => sum + countLeaves(child), 0);
}

export default function Learn() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 text-sm text-text-dark-secondary dark:text-text-muted mb-2">
          <BookOpen size={14} />
          <span>All Topics</span>
        </div>
        <h1 className="text-3xl font-bold text-text-dark-primary dark:text-text-primary">
          Learn DSA
        </h1>
        <p className="mt-2 text-text-dark-secondary dark:text-text-secondary">
          Choose a topic to explore algorithms with step-by-step explanations and visualizations.
        </p>
      </motion.div>

      {/* Topic grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {sidebarData.map((topic) => {
          const Icon = topic.icon;
          const algoCount = countLeaves(topic);

          return (
            <motion.div
              key={topic.label}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              onClick={() => navigate(`/learn/${topic.label.toLowerCase().replace(/\s+&?\s*/g, '-')}`)}
              className="group flex flex-col gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-200 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon size={22} />
                </div>
                <span className="text-xs text-text-muted dark:text-text-muted bg-light-surface-hover dark:bg-dark-surface-hover px-2 py-1 rounded-full">
                  {algoCount} algorithms
                </span>
              </div>

              <div>
                <h2 className="font-semibold text-text-dark-primary dark:text-text-primary group-hover:text-primary transition-colors duration-200">
                  {topic.label}
                </h2>
                <p className="text-sm text-text-dark-secondary dark:text-text-muted mt-1">
                  {topic.children?.map((c) => c.label).join(', ')}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-auto">
                Explore <ArrowRight size={12} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
