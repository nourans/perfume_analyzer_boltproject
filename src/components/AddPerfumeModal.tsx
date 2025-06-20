import React, { useState } from 'react';
import { usePerfumes } from '../context/PerfumeContext';
import { X, Plus, Minus } from 'lucide-react';
import { FragranceFamily, Season, Occasion } from '../types';

interface AddPerfumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddPerfumeModal: React.FC<AddPerfumeModalProps> = ({ isOpen, onClose }) => {
  const { addPerfume } = usePerfumes();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    concentration: 'EDP' as const,
    topNotes: [''],
    middleNotes: [''],
    baseNotes: [''],
    fragranceFamily: 'Fresh' as FragranceFamily,
    season: [] as Season[],
    occasion: [] as Occasion[],
    longevity: 5,
    sillage: 5,
    personalRating: 3,
    price: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const perfume = {
      ...formData,
      topNotes: formData.topNotes.filter(note => note.trim()),
      middleNotes: formData.middleNotes.filter(note => note.trim()),
      baseNotes: formData.baseNotes.filter(note => note.trim()),
      price: formData.price ? parseFloat(formData.price) : undefined,
      purchaseDate: new Date()
    };
    
    addPerfume(perfume);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      brand: '',
      concentration: 'EDP',
      topNotes: [''],
      middleNotes: [''],
      baseNotes: [''],
      fragranceFamily: 'Fresh',
      season: [],
      occasion: [],
      longevity: 5,
      sillage: 5,
      personalRating: 3,
      price: '',
      description: ''
    });
  };

  const updateNotes = (type: 'topNotes' | 'middleNotes' | 'baseNotes', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map((note, i) => i === index ? value : note)
    }));
  };

  const addNote = (type: 'topNotes' | 'middleNotes' | 'baseNotes') => {
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], '']
    }));
  };

  const removeNote = (type: 'topNotes' | 'middleNotes' | 'baseNotes', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const toggleSelection = (type: 'season' | 'occasion', value: Season | Occasion) => {
    setFormData(prev => ({
      ...prev,
      [type]: (prev[type] as (Season | Occasion)[]).includes(value)
        ? (prev[type] as (Season | Occasion)[]).filter(item => item !== value)
        : [...(prev[type] as (Season | Occasion)[]), value]
    }));
  };

  if (!isOpen) return null;

  const fragranceFamilies: FragranceFamily[] = ['Fresh', 'Floral', 'Oriental', 'Woody', 'Gourmand', 'Fougère', 'Chypre', 'Leather'];
  const seasons: Season[] = ['Spring', 'Summer', 'Fall', 'Winter'];
  const occasions: Occasion[] = ['Casual', 'Work', 'Evening', 'Special', 'Date', 'Sport'];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Add New Perfume</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Sauvage"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
              <input
                type="text"
                required
                value={formData.brand}
                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Dior"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Concentration</label>
              <select
                value={formData.concentration}
                onChange={(e) => setFormData(prev => ({ ...prev, concentration: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="EDT">EDT</option>
                <option value="EDP">EDP</option>
                <option value="Parfum">Parfum</option>
                <option value="Cologne">Cologne</option>
                <option value="Oil">Oil</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fragrance Family</label>
              <select
                value={formData.fragranceFamily}
                onChange={(e) => setFormData(prev => ({ ...prev, fragranceFamily: e.target.value as FragranceFamily }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {fragranceFamilies.map(family => (
                  <option key={family} value={family}>{family}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes Section */}
          {(['topNotes', 'middleNotes', 'baseNotes'] as const).map(noteType => (
            <div key={noteType}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {noteType === 'topNotes' ? 'Top Notes' : 
                 noteType === 'middleNotes' ? 'Middle Notes' : 'Base Notes'}
              </label>
              <div className="space-y-2">
                {formData[noteType].map((note, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => updateNotes(noteType, index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., Bergamot"
                    />
                    {formData[noteType].length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeNote(noteType, index)}
                        className="text-red-400 hover:text-red-600 p-2"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addNote(noteType)}
                  className="text-purple-600 hover:text-purple-700 flex items-center gap-1 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Note
                </button>
              </div>
            </div>
          ))}

          {/* Season Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Seasons</label>
            <div className="flex flex-wrap gap-2">
              {seasons.map(season => (
                <button
                  key={season}
                  type="button"
                  onClick={() => toggleSelection('season', season)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    formData.season.includes(season)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {season}
                </button>
              ))}
            </div>
          </div>

          {/* Occasion Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Occasions</label>
            <div className="flex flex-wrap gap-2">
              {occasions.map(occasion => (
                <button
                  key={occasion}
                  type="button"
                  onClick={() => toggleSelection('occasion', occasion)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    formData.occasion.includes(occasion)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {occasion}
                </button>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longevity ({formData.longevity}/10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.longevity}
                onChange={(e) => setFormData(prev => ({ ...prev, longevity: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sillage ({formData.sillage}/10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.sillage}
                onChange={(e) => setFormData(prev => ({ ...prev, sillage: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal Rating ({formData.personalRating}/5)
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.personalRating}
                onChange={(e) => setFormData(prev => ({ ...prev, personalRating: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (optional)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., 95"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Personal notes about this fragrance..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium"
            >
              Add Perfume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};