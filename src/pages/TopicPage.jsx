import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, BookOpen } from 'lucide-react';
import sidebarData from '../data/sidebarData';

function findTopic(slug) {
  return sidebarData.find(
    (t) => t.label.toLowerCase().replace(/\s+&?\s*/g, '-') === slug
  );
}

function SubtopicCard({ subtopic, depth = 0 }) {
  const navigate = useNavigate();
  const hasChildren = subtopic.children && subtopic.children.length > 0;
  const Icon = subtopic.icon;

  if (!hasChildren && subtopic.path) {
    // Leaf → navigate to algorithm
    return (
      <motion.div
        whileHover={{ x: 4 }}
        onClick={() => navigate(subtopic.path)}
        className="group flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
      >
        <div className="flex items-center gap-3">
          {depth === 0 ? (
            <div className="w-2 h-2 rounded-full bg-primary" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-accent" />
          )}
          <span className="text-sm font-medium text-text-dark-primary dark:text-text-primary group-hover:text-primary transition-colors duration-200">
            {subtopic.label}
          </span>
        </div>
        <ArrowRight size={14} className="text-text-muted group-hover:text-primary transition-colors duration-200 group-hover:translate-x-1 transition-transform" />
      </motion.div>
    );
  }

  // Branch → show nested group
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1 py-2">
        {Icon && <Icon size={15} className="text-primary" />}
        <h3 className="text-sm font-semibold uppercase tracking-wide text-text-dark-secondary dark:text-text-muted">
          {subtopic.label}
        </h3>
      </div>
      <div className="pl-4 space-y-1.5 border-l-2 border-primary/20">
        {subtopic.children.map((child, i) => (
          <SubtopicCard key={child.label + i} subtopic={child} depth={depth + 1} />
        ))}
      </div>
    </div>
  );
}

export default function TopicPage() {
  const { topic, subtopic } = useParams();
  const found = findTopic(subtopic || topic);

  if (!found) {
    return (
      <div className="text-center py-24">
        <p className="text-text-dark-secondary dark:text-text-secondary text-lg">
          Topic not found.
        </p>
        <Link to="/learn" className="text-primary hover:underline text-sm mt-2 inline-block">
          ← Back to Learn
        </Link>
      </div>
    );
  }

  const Icon = found.icon;

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-1.5 text-sm text-text-dark-secondary dark:text-text-muted"
      >
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link to="/learn" className="hover:text-primary transition-colors">Learn</Link>
        <ChevronRight size={14} />
        <span className="text-text-dark-primary dark:text-text-primary">{found.label}</span>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start gap-5"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {Icon && <Icon size={28} />}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-dark-primary dark:text-text-primary">
            {found.label}
          </h1>
          <p className="text-text-dark-secondary dark:text-text-secondary mt-1.5 flex items-center gap-2">
            <BookOpen size={14} />
            {found.children?.length} subtopics
          </p>
        </div>
      </motion.div>

      {/* Subtopics */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="space-y-6"
      >
        {found.children?.map((child, i) => (
          <SubtopicCard key={child.label + i} subtopic={child} depth={0} />
        ))}
      </motion.div>
    </div>
  );
}
