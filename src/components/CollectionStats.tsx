import React from 'react';
import { Perfume } from '../types';
import { BarChart3, TrendingUp, Star, DollarSign } from 'lucide-react';

interface CollectionStatsProps {
  perfumes: Perfume[];
}

export const CollectionStats: React.FC<CollectionStatsProps> = ({ perfumes }) => {
  const totalValue = perfumes.reduce((sum, p) => sum + (p.price || 0), 0);
  const averageRating = perfumes.reduce((sum, p) => sum + p.personalRating, 0) / perfumes.length;
  const familyStats = perfumes.reduce((acc, p) => {
    acc[p.fragranceFamily] = (acc[p.fragranceFamily] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topFamily = Object.entries(familyStats).sort(([,a], [,b]) => b - a)[0];

  const stats = [
    {
      label: 'Total Perfumes',
      value: perfumes.length,
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      label: 'Collection Value',
      value: totalValue > 0 ? `$${totalValue.toLocaleString()}` : 'N/A',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Average Rating',
      value: averageRating ? `${averageRating.toFixed(1)}/5` : 'N/A',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      label: 'Top Family',
      value: topFamily ? `${topFamily[0]} (${topFamily[1]})` : 'N/A',
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-purple-100 p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};