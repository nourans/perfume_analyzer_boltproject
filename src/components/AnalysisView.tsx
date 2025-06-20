import React from 'react';
import { usePerfumes } from '../context/PerfumeContext';
import { FragranceWheel } from './FragranceWheel';
import { PreferenceAnalysis } from './PreferenceAnalysis';
import { SeasonalBreakdown } from './SeasonalBreakdown';
import { NoteAnalysis } from './NoteAnalysis';

export const AnalysisView: React.FC = () => {
  const { perfumes } = usePerfumes();

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Collection Analysis</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover insights about your fragrance preferences and collection patterns using advanced analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FragranceWheel perfumes={perfumes} />
        <PreferenceAnalysis perfumes={perfumes} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SeasonalBreakdown perfumes={perfumes} />
        <NoteAnalysis perfumes={perfumes} />
      </div>
    </div>
  );
};