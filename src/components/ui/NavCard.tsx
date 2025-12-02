// src/components/ui/NavCard.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavCardProps {
  to: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  badge?: string;
  highlight?: boolean;
}

export const NavCard: React.FC<NavCardProps> = ({
  to,
  title,
  description,
  icon,
  badge,
  highlight = false,
}) => {
  return (
    <NavLink
      to={to}
      className={`group relative block p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl border-2 ${
        highlight
          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-400 shadow-xl'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}
    >
      {badge && (
        <span className="absolute -top-3 -right-3 px-4 py-1 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse shadow-lg">
          {badge}
        </span>
      )}

      <div
        className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
          highlight ? 'bg-white/20' : 'bg-gradient-to-br from-blue-500 to-indigo-600'
        }`}
      >
        {icon || <div className="w-9 h-9 bg-white/30 rounded-lg" />}
      </div>

      <h3 className={`text-2xl font-bold mb-3 ${highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
        {title}
      </h3>
      <p className={`text-lg ${highlight ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'}`}>
        {description}
      </p>

      {/* ← LINHA SUBSTITUÍDA COM UNDERLINE ANIMADO */}
      <span
        className={`mt-6 inline-block text-lg font-semibold transition-all duration-300 group-hover:translate-x-2 group-hover:underline underline-offset-4 ${
          highlight ? 'text-white' : 'text-blue-600 dark:text-blue-400'
        }`}
      >
        {highlight ? 'Acessar agora' : 'Acessar'} →
      </span>
    </NavLink>
  );
};