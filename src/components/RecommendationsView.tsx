import React, { useState } from 'react';
import { usePerfumes } from '../context/PerfumeContext';
import { LayeringRecommendations } from './LayeringRecommendations';
import { PurchaseRecommendations } from './PurchaseRecommendations';
import { Layers, ShoppingBag } from 'lucide-react';

export const RecommendationsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'layering' | 'purchase'>('layering');

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">AI Recommendations</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover perfect layering combinations and personalized purchase suggestions based on your collection and preferences.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="bg-white rounded-lg p-1 shadow-sm border border-purple-100">
          <button
            onClick={() => setActiveTab('layering')}
            className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'layering'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            Layering Recommendations
          </button>
          <button
            onClick={() => setActiveTab('purchase')}
            className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'purchase'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Purchase Suggestions
          </button>
        </div>
      </div>

      <div className="transition-all duration-300">
        {activeTab === 'layering' ? <LayeringRecommendations /> : <PurchaseRecommendations />}
      </div>
    </div>
  );
};