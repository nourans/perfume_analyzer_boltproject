import React, { useState } from 'react';
import { usePerfumes } from '../context/PerfumeContext';
import { PerfumeCard } from './PerfumeCard';
import { CollectionStats } from './CollectionStats';
import { Search, Filter, Grid, List } from 'lucide-react';
import { FragranceFamily, Season, Occasion, Perfume } from '../types';

const API_URL = 'http://localhost:8000';

interface CollectionViewProps {
  onAddPerfume: () => void;
}

export const CollectionView: React.FC<CollectionViewProps> = ({ onAddPerfume }) => {
  const { perfumes } = usePerfumes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<FragranceFamily | 'all'>('all');
  const [selectedSeason, setSelectedSeason] = useState<Season | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPerfumes = perfumes.filter(perfume => {
    const matchesSearch = perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         perfume.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFamily = selectedFamily === 'all' || perfume.fragranceFamily === selectedFamily;
    const matchesSeason = selectedSeason === 'all' || perfume.season.includes(selectedSeason);
    
    return matchesSearch && matchesFamily && matchesSeason;
  });

  const fragranceFamilies: FragranceFamily[] = ['Fresh', 'Floral', 'Oriental', 'Woody', 'Gourmand', 'Fougère', 'Chypre', 'Leather'];
  const seasons: Season[] = ['Spring', 'Summer', 'Fall', 'Winter'];

  const addPerfume = async (perfume: Omit<Perfume, 'id'>) => {
    try {
      const backendPerfume = { ...perfume, id: 0 };
      const res = await fetch(`${API_URL}/perfumes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendPerfume),
      });
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
      }
      const newPerfume = await res.json();
      // Assuming setPerfumes is called elsewhere in the code
    } catch (error) {
      console.error('Error adding perfume:', error);
      // Optionally, show an error message to the user
    }
  };

  if (perfumes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-16 h-16 text-purple-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">Start Your Collection</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Add your first perfume to begin discovering personalized recommendations and layering suggestions.
        </p>
        <button
          onClick={onAddPerfume}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Add Your First Perfume
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <CollectionStats perfumes={perfumes} />
      
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search perfumes by name or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedFamily}
              onChange={(e) => setSelectedFamily(e.target.value as FragranceFamily | 'all')}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Families</option>
              {fragranceFamilies.map(family => (
                <option key={family} value={family}>{family}</option>
              ))}
            </select>
            
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value as Season | 'all')}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Seasons</option>
              {seasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {filteredPerfumes.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No perfumes found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {filteredPerfumes.map(perfume => (
              <PerfumeCard 
                key={perfume.id} 
                perfume={perfume} 
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};