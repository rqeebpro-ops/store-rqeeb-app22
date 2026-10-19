import React from 'react';
import { 
  LayoutGrid, 
  Radio, 
  Lock, 
  UserCheck, 
  HardDrive, 
  Code, 
  TrendingUp 
} from 'lucide-react';
import { ServiceCategory, Language } from '../types';
import { CATEGORIES_LIST } from '../data/servicesData';
import { CATEGORIES_LIST_EN } from '../data/servicesDataEn';

interface CategoriesFilterProps {
  activeCategory: ServiceCategory;
  onSelectCategory: (cat: ServiceCategory) => void;
  lang: Language;
}

export const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  activeCategory,
  onSelectCategory,
  lang
}) => {
  const categories = lang === 'ar' ? CATEGORIES_LIST : CATEGORIES_LIST_EN;

  const getCategoryIcon = (id: ServiceCategory) => {
    switch (id) {
      case 'all': return <LayoutGrid className="w-4 h-4" />;
      case 'unlocking': return <Radio className="w-4 h-4" />;
      case 'screen_locks': return <Lock className="w-4 h-4" />;
      case 'account_recovery': return <UserCheck className="w-4 h-4" />;
      case 'data_recovery': return <HardDrive className="w-4 h-4" />;
      case 'programming': return <Code className="w-4 h-4" />;
      case 'marketing': return <TrendingUp className="w-4 h-4" />;
      default: return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative w-full">
      {/* Scrollable Container with horizontal touch scroll */}
      <div className="w-full overflow-x-auto pb-3 pt-1 scrollbar-thin no-scrollbar sm:scrollbar-thin">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-max justify-start md:justify-center px-2 py-1">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer select-none shrink-0 min-h-[42px] ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 scale-[1.02]'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-cyan-400'}>
                  {getCategoryIcon(category.id)}
                </span>
                <span>{category.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
