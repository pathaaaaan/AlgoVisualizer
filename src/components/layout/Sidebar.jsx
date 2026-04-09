import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import sidebarData from '../../data/sidebarData';

/* ─── Recursive sidebar node ──────────────────────── */
function SidebarItem({ item, depth = 0 }) {
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;

  // Auto-expand if any descendant matches the current route
  const isDescendantActive = (node) => {
    if (node.path && location.pathname === node.path) return true;
    if (node.children) return node.children.some(isDescendantActive);
    return false;
  };

  const [open, setOpen] = useState(() => isDescendantActive(item));

  const Icon = item.icon;
  const paddingLeft = 12 + depth * 16;

  // ── Leaf node (link) ──
  if (!hasChildren && item.path) {
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          clsx(
            'flex items-center gap-2.5 py-2 px-3 rounded-lg text-sm transition-all duration-200 group',
            isActive
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-text-dark-secondary dark:text-text-secondary hover:bg-light-surface-hover dark:hover:bg-dark-surface-hover hover:text-text-dark-primary dark:hover:text-text-primary'
          )
        }
        style={{ paddingLeft }}
      >
        {Icon && <Icon size={16} className="shrink-0" />}
        <span className="truncate">{item.label}</span>
      </NavLink>
    );
  }

  // ── Branch node (expandable) ──
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          'w-full flex items-center gap-2.5 py-2 px-3 rounded-lg text-sm transition-all duration-200',
          'text-text-dark-secondary dark:text-text-secondary hover:bg-light-surface-hover dark:hover:bg-dark-surface-hover hover:text-text-dark-primary dark:hover:text-text-primary',
          open && 'text-text-dark-primary dark:text-text-primary'
        )}
        style={{ paddingLeft }}
      >
        {Icon && <Icon size={16} className="shrink-0" />}
        <span className="truncate flex-1 text-left">{item.label}</span>
        <ChevronDown
          size={14}
          className={clsx(
            'shrink-0 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {item.children.map((child, idx) => (
              <SidebarItem key={child.label + idx} item={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Sidebar ─────────────────────────────────────── */
export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <aside
        className={clsx(
          'fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] w-72 flex flex-col border-r transition-transform duration-300 ease-in-out',
          'bg-light-surface dark:bg-dark-bg border-light-border dark:border-dark-border',
          'lg:translate-x-0 lg:static lg:h-full lg:z-auto',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="px-4 py-4 border-b border-light-border dark:border-dark-border">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-dark-secondary dark:text-text-muted">
            Topics
          </h2>
        </div>

        {/* Scrollable nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {sidebarData.map((item, idx) => (
            <SidebarItem key={item.label + idx} item={item} depth={0} />
          ))}
        </nav>
      </aside>
    </>
  );
}
