import React from 'react';
import { usePerfumes } from '../context/PerfumeContext';
import { Layers, Star, Calendar, MapPin } from 'lucide-react';

export const LayeringRecommendations: React.FC = () => {
  const { layeringRecommendations, perfumes } = usePerfumes();

  const getPerfumesByIds = (ids: string[]) => {
    return ids.map(id => perfumes.find(p => p.id === id)).filter(Boolean);
  };

  if (layeringRecommendations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Layers className="w-12 h-12 text-purple-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">No Layering Recommendations Yet</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Add more perfumes to your collection to discover amazing layering combinations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {layeringRecommendations.map(recommendation => {
        const involvedPerfumes = getPerfumesByIds(recommendation.perfumes);
        
        return (
          <div 
            key={recommendation.id} 
            className="bg-white rounded-xl shadow-sm border border-purple-100 p-6 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{recommendation.title}</h3>
                <p className="text-gray-600 mb-4">{recommendation.description}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium">{recommendation.compatibility}/10 Compatibility</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">{recommendation.season.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-green-400" />
                    <span className="text-sm">{recommendation.occasion.join(', ')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <Layers className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Perfumes to Layer</h4>
                <div className="space-y-2">
                  {involvedPerfumes.map(perfume => (
                    <div key={perfume?.id} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {perfume?.brand.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{perfume?.name}</p>
                        <p className="text-sm text-gray-600">{perfume?.brand}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Layering Tips</h4>
                <div className="space-y-2">
                  {recommendation.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};