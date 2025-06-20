import React from 'react';
import { usePerfumes } from '../context/PerfumeContext';
import { ShoppingBag, Star, DollarSign, Calendar, MapPin, Sparkles } from 'lucide-react';

export const PurchaseRecommendations: React.FC = () => {
  const { purchaseRecommendations } = usePerfumes();

  if (purchaseRecommendations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-indigo-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">No Purchase Recommendations Yet</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Add more perfumes to your collection to get personalized purchase suggestions.
        </p>
      </div>
    );
  }

  const getFamilyColor = (family: string) => {
    const colors = {
      Fresh: 'bg-blue-100 text-blue-800',
      Floral: 'bg-pink-100 text-pink-800',
      Oriental: 'bg-amber-100 text-amber-800',
      Woody: 'bg-amber-100 text-amber-800',
      Gourmand: 'bg-purple-100 text-purple-800',
      Fougère: 'bg-green-100 text-green-800',
      Chypre: 'bg-gray-100 text-gray-800',
      Leather: 'bg-stone-100 text-stone-800'
    };
    return colors[family as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {purchaseRecommendations.map(recommendation => (
        <div 
          key={recommendation.id} 
          className="bg-white rounded-xl shadow-sm border border-purple-100 p-6 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-semibold text-gray-800">{recommendation.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFamilyColor(recommendation.fragranceFamily)}`}>
                  {recommendation.fragranceFamily}
                </span>
              </div>
              
              <p className="text-gray-600 font-medium mb-2">{recommendation.brand}</p>
              <p className="text-gray-600 mb-4">{recommendation.reason}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">{recommendation.compatibility}/10 Match</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span className="text-sm">${recommendation.estimatedPrice}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">{recommendation.season.join(', ')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">{recommendation.occasion.join(', ')}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Top Notes</h4>
              <div className="flex flex-wrap gap-1">
                {recommendation.topNotes.map(note => (
                  <span key={note} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
                    {note}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Middle Notes</h4>
              <div className="flex flex-wrap gap-1">
                {recommendation.middleNotes.map(note => (
                  <span key={note} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">
                    {note}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Base Notes</h4>
              <div className="flex flex-wrap gap-1">
                {recommendation.baseNotes.map(note => (
                  <span key={note} className="px-2 py-1 bg-teal-50 text-teal-700 rounded-full text-xs">
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {recommendation.similarTo && recommendation.similarTo.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-2">Similar to your collection:</h4>
              <div className="flex flex-wrap gap-2">
                {recommendation.similarTo.map(similar => (
                  <span key={similar} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {similar}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};