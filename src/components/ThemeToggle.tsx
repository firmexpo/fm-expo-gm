import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer border ${
        theme === 'light'
          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
          : 'bg-[#16212E] hover:bg-[#1E2E40] text-slate-300 border-[#2B3E54]'
      } ${className}`}
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <>
          <Moon className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span className="hidden sm:inline font-semibold">Dark Mode</span>
        </>
      ) : (
        <>
          <Sun className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span className="hidden sm:inline font-semibold">Light Mode</span>
        </>
      )}
    </button>
  );
};
