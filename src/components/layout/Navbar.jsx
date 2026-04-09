import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Code2 } from 'lucide-react';

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // default = dark
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-4 md:px-6 border-b border-light-border dark:border-dark-border bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-xl">
      {/* Left — hamburger + logo */}
      <div className="flex items-center gap-3">
        <button
          id="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-text-dark-secondary dark:text-text-secondary hover:bg-light-surface-hover dark:hover:bg-dark-surface-hover transition-colors lg:hidden"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
            <Code2 size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-text-dark-primary dark:text-text-primary hidden sm:inline">
            DSA<span className="text-primary">Visualizer</span>
          </span>
        </Link>
      </div>

      {/* Right — theme toggle */}
      <div className="flex items-center gap-2">
        <button
          id="theme-toggle"
          onClick={() => setDark(!dark)}
          className="p-2.5 rounded-xl text-text-dark-secondary dark:text-text-secondary hover:bg-light-surface-hover dark:hover:bg-dark-surface-hover transition-all duration-200 hover:text-primary"
          aria-label="Toggle theme"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
