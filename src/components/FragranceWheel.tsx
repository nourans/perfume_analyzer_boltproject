import React from 'react';
import { Perfume, FragranceFamily } from '../types';
import { PieChart } from 'lucide-react';

interface FragranceWheelProps {
  perfumes: Perfume[];
}

export const FragranceWheel: React.FC<FragranceWheelProps> = ({ perfumes }) => {
  const familyStats = perfumes.reduce((acc, p) => {
    acc[p.fragranceFamily] = (acc[p.fragranceFamily] || 0) + 1;
    return acc;
  }, {} as Record<FragranceFamily, number>);

  const totalPerfumes = perfumes.length;
  const families = Object.entries(familyStats).map(([family, count]) => ({
    family: family as FragranceFamily,
    count,
    percentage: (count / totalPerfumes) * 100
  }));

  const familyColors = {
    Fresh: '#3B82F6',
    Floral: '#EC4899',
    Oriental: '#F59E0B',
    Woody: '#92400E',
    Gourmand: '#7C3AED',
    Fougère: '#059669',
    Chypre: '#6B7280',
    Leather: '#78716C'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <PieChart className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Fragrance Families</h3>
          <p className="text-sm text-gray-600">Distribution across your collection</p>
        </div>
      </div>

      <div className="space-y-4">
        {families.sort((a, b) => b.count - a.count).map(({ family, count, percentage }) => (
          <div key={family} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: familyColors[family] }}
              />
              <span className="font-medium text-gray-700">{family}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: familyColors[family]
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {count} ({percentage.toFixed(0)}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      {families.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <PieChart className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No data available yet</p>
        </div>
      )}
    </div>
  );
};