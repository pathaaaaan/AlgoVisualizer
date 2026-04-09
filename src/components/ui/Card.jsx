import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export default function Card({
  title,
  description,
  icon: Icon,
  to,
  gradient,
  className = '',
  children,
}) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={() => to && navigate(to)}
      className={clsx(
        'group relative rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer',
        'bg-light-surface dark:bg-dark-surface',
        'border-light-border dark:border-dark-border',
        'hover:border-primary/40 dark:hover:border-primary/40',
        'hover:shadow-lg hover:shadow-primary/5',
        to && 'cursor-pointer',
        className
      )}
    >
      {/* Gradient accent strip */}
      {gradient && (
        <div
          className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
          style={{ background: gradient }}
        />
      )}

      <div className="p-6">
        {/* Icon */}
        {Icon && (
          <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
            <Icon size={24} />
          </div>
        )}

        {/* Title */}
        {title && (
          <h3 className="text-lg font-semibold text-text-dark-primary dark:text-text-primary mb-2 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-text-dark-secondary dark:text-text-secondary leading-relaxed mb-4">
            {description}
          </p>
        )}

        {/* Children (custom content) */}
        {children}

        {/* Explore arrow */}
        {to && (
          <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2">
            Explore
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
