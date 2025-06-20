import React from 'react';
import { Perfume } from '../types';
import { Microscope } from 'lucide-react';

interface NoteAnalysisProps {
  perfumes: Perfume[];
}

export const NoteAnalysis: React.FC<NoteAnalysisProps> = ({ perfumes }) => {
  const getAllNotes = (noteType: 'topNotes' | 'middleNotes' | 'baseNotes') => {
    const noteStats = perfumes.reduce((acc, perfume) => {
      perfume[noteType].forEach(note => {
        acc[note] = (acc[note] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(noteStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  const topNotes = getAllNotes('topNotes');
  const middleNotes = getAllNotes('middleNotes');
  const baseNotes = getAllNotes('baseNotes');

  const NoteSection = ({ title, notes, color }: { title: string; notes: [string, number][]; color: string }) => (
    <div className="mb-6">
      <h4 className="font-semibold text-gray-800 mb-3">{title}</h4>
      <div className="space-y-2">
        {notes.map(([note, count]) => {
          const maxCount = Math.max(...notes.map(([,c]) => c));
          const percentage = (count / maxCount) * 100;
          
          return (
            <div key={note} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{note}</span>
              <div className="flex items-center gap-3">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
              </div>
            </div>
          );
        })}
        {notes.length === 0 && (
          <p className="text-sm text-gray-500 italic">No notes available</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
          <Microscope className="w-5 h-5 text-teal-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Note Analysis</h3>
          <p className="text-sm text-gray-600">Most frequent notes in your collection</p>
        </div>
      </div>

      <NoteSection 
        title="Top Notes" 
        notes={topNotes} 
        color="bg-purple-400" 
      />
      
      <NoteSection 
        title="Middle Notes" 
        notes={middleNotes} 
        color="bg-indigo-400" 
      />
      
      <NoteSection 
        title="Base Notes" 
        notes={baseNotes} 
        color="bg-teal-400" 
      />

      {perfumes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Microscope className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Add perfumes to analyze notes</p>
        </div>
      )}
    </div>
  );
};