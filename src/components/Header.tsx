import React from 'react';
import { ViewType } from '../App';
import { Sparkles, Plus, BookOpen, Target, BarChart3 } from 'lucide-react';

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onAddPerfume: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, onAddPerfume }) => {
  const navItems = [
    { id: 'collection' as ViewType, label: 'Collection', icon: BookOpen },
    { id: 'analysis' as ViewType, label: 'Analysis', icon: BarChart3 },
    { id: 'recommendations' as ViewType, label: 'Recommendations', icon: Target },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                PerfumeAI
              </h1>
              <p className="text-xs text-gray-500">Intelligent Fragrance Analysis</p>
            </div>
          </div>

          <nav className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentView === item.id
                      ? 'bg-purple-100 text-purple-700 shadow-sm'
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <button
            onClick={onAddPerfume}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Perfume</span>
          </button>
        </div>
      </div>
    </header>
  );
};