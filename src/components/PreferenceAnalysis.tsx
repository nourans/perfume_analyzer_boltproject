import React from 'react';
import { Perfume } from '../types';
import { Brain, Star, Clock, Zap } from 'lucide-react';

interface PreferenceAnalysisProps {
  perfumes: Perfume[];
}

export const PreferenceAnalysis: React.FC<PreferenceAnalysisProps> = ({ perfumes }) => {
  const averageRating = perfumes.reduce((sum, p) => sum + p.personalRating, 0) / perfumes.length;
  const averageLongevity = perfumes.reduce((sum, p) => sum + p.longevity, 0) / perfumes.length;
  const averageSillage = perfumes.reduce((sum, p) => sum + p.sillage, 0) / perfumes.length;

  const highRatedPerfumes = perfumes.filter(p => p.personalRating >= 4);
  const preferredConcentrations = perfumes.reduce((acc, p) => {
    acc[p.concentration] = (acc[p.concentration] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topConcentration = Object.entries(preferredConcentrations)
    .sort(([,a], [,b]) => b - a)[0];

  const insights = [
    `You tend to prefer ${averageRating >= 4 ? 'high-quality' : averageRating >= 3 ? 'good' : 'diverse'} fragrances with an average rating of ${averageRating.toFixed(1)}/5.`,
    `Your collection leans towards ${averageLongevity >= 7 ? 'long-lasting' : averageLongevity >= 5 ? 'moderate' : 'lighter'} fragrances (${averageLongevity.toFixed(1)}/10 longevity).`,
    `You prefer ${averageSillage >= 7 ? 'strong projection' : averageSillage >= 5 ? 'moderate sillage' : 'intimate'} scents (${averageSillage.toFixed(1)}/10 sillage).`,
    topConcentration ? `Your preferred concentration is ${topConcentration[0]} (${topConcentration[1]} perfumes).` : '',
    highRatedPerfumes.length > 0 ? `${highRatedPerfumes.length} of your perfumes are rated 4+ stars.` : ''
  ].filter(Boolean);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Preference Analysis</h3>
          <p className="text-sm text-gray-600">AI-powered insights from your collection</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
          <div className="text-xl font-bold text-gray-800">{averageRating.toFixed(1)}/5</div>
          <div className="text-xs text-gray-600">Avg Rating</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <div className="text-xl font-bold text-gray-800">{averageLongevity.toFixed(1)}/10</div>
          <div className="text-xs text-gray-600">Longevity</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <Zap className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <div className="text-xl font-bold text-gray-800">{averageSillage.toFixed(1)}/10</div>
          <div className="text-xs text-gray-600">Sillage</div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800 mb-3">AI Insights</h4>
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
            <p className="text-sm text-gray-700">{insight}</p>
          </div>
        ))}
      </div>

      {perfumes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Add perfumes to see your preferences</p>
        </div>
      )}
    </div>
  );
};