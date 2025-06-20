import React from 'react';
import { Perfume, Season } from '../types';
import { Sun, Snowflake, Leaf, Flower } from 'lucide-react';

interface SeasonalBreakdownProps {
  perfumes: Perfume[];
}

export const SeasonalBreakdown: React.FC<SeasonalBreakdownProps> = ({ perfumes }) => {
  const seasonIcons = {
    Spring: Flower,
    Summer: Sun,
    Fall: Leaf,
    Winter: Snowflake
  };

  const seasonColors = {
    Spring: 'text-green-600 bg-green-100',
    Summer: 'text-yellow-600 bg-yellow-100',
    Fall: 'text-orange-600 bg-orange-100',
    Winter: 'text-blue-600 bg-blue-100'
  };

  const seasonStats = perfumes.reduce((acc, perfume) => {
    perfume.season.forEach(season => {
      acc[season] = (acc[season] || 0) + 1;
    });
    return acc;
  }, {} as Record<Season, number>);

  const totalSeasonAssignments = Object.values(seasonStats).reduce((sum, count) => sum + count, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <Sun className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Seasonal Breakdown</h3>
          <p className="text-sm text-gray-600">When you wear your fragrances</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {(['Spring', 'Summer', 'Fall', 'Winter'] as Season[]).map(season => {
          const count = seasonStats[season] || 0;
          const percentage = totalSeasonAssignments > 0 ? (count / totalSeasonAssignments) * 100 : 0;
          const Icon = seasonIcons[season];
          const colorClasses = seasonColors[season];

          return (
            <div key={season} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-all duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClasses}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-medium text-gray-800">{season}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-800">{count}</span>
                  <span className="text-sm text-gray-600">{percentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${colorClasses.split(' ')[1]} opacity-60`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalSeasonAssignments === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Sun className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No seasonal data available</p>
        </div>
      )}
    </div>
  );
};