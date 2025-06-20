import React from 'react';
import { Perfume } from '../types';
import { Star, Clock, Zap, Calendar, DollarSign, Trash2 } from 'lucide-react';
import { usePerfumes } from '../context/PerfumeContext';

const API_URL = 'http://localhost:8000';

interface PerfumeCardProps {
  perfume: Perfume;
  viewMode: 'grid' | 'list';
}

export const PerfumeCard: React.FC<PerfumeCardProps> = ({ perfume, viewMode }) => {
  const { removePerfume } = usePerfumes();

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {perfume.brand.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{perfume.name}</h3>
                <p className="text-gray-600">{perfume.brand}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFamilyColor(perfume.fragranceFamily)}`}>
                    {perfume.fragranceFamily}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {perfume.concentration}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  {renderStars(perfume.personalRating)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{perfume.longevity}/10</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  <span>{perfume.sillage}/10</span>
                </div>
                {perfume.price && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>${perfume.price}</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => removePerfume(perfume.id)}
                className="text-red-400 hover:text-red-600 transition-colors duration-200 p-2 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
          <span className="text-white font-bold text-3xl">
            {perfume.brand.charAt(0)}
          </span>
        </div>
        <button
          onClick={() => removePerfume(perfume.id)}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-red-400 hover:text-red-600 transition-colors duration-200 p-2 rounded-lg opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{perfume.name}</h3>
          <p className="text-gray-600 text-sm">{perfume.brand}</p>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFamilyColor(perfume.fragranceFamily)}`}>
            {perfume.fragranceFamily}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
            {perfume.concentration}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Personal Rating</span>
            <div className="flex items-center gap-1">
              {renderStars(perfume.personalRating)}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Longevity</span>
            <span className="font-medium">{perfume.longevity}/10</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Sillage</span>
            <span className="font-medium">{perfume.sillage}/10</span>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="text-xs text-gray-500 mb-2">Top Notes</div>
          <div className="flex flex-wrap gap-1">
            {perfume.topNotes.slice(0, 3).map(note => (
              <span key={note} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
                {note}
              </span>
            ))}
            {perfume.topNotes.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                +{perfume.topNotes.length - 3}
              </span>
            )}
          </div>
        </div>
        
        {perfume.price && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <span className="text-sm text-gray-600">Price</span>
            <span className="font-semibold text-purple-600">${perfume.price}</span>
          </div>
        )}
      </div>
    </div>
  );
};