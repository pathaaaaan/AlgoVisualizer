import { motion } from 'framer-motion';
import clsx from 'clsx';

const variants = {
  primary:
    'bg-primary text-white hover:bg-primary-hover shadow-md shadow-primary/20',
  secondary:
    'bg-dark-surface dark:bg-dark-surface text-text-secondary hover:bg-dark-surface-hover dark:hover:bg-dark-surface-hover border border-dark-border dark:border-dark-border',
  accent:
    'bg-accent text-dark-bg hover:bg-accent-hover shadow-md shadow-accent/20',
  danger:
    'bg-danger text-white hover:bg-danger-hover shadow-md shadow-danger/20',
  ghost:
    'bg-transparent text-text-secondary hover:bg-dark-surface-hover dark:hover:bg-dark-surface-hover hover:text-text-primary',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </motion.button>
  );
}
