import React, { useState } from 'react';
import { Header } from './components/Header';
import { CollectionView } from './components/CollectionView';
import { AnalysisView } from './components/AnalysisView';
import { RecommendationsView } from './components/RecommendationsView';
import { AddPerfumeModal } from './components/AddPerfumeModal';
import { PerfumeProvider } from './context/PerfumeContext';

export type ViewType = 'collection' | 'analysis' | 'recommendations';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('collection');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'collection':
        return <CollectionView onAddPerfume={() => setIsAddModalOpen(true)} />;
      case 'analysis':
        return <AnalysisView />;
      case 'recommendations':
        return <RecommendationsView />;
      default:
        return <CollectionView onAddPerfume={() => setIsAddModalOpen(true)} />;
    }
  };

  return (
    <PerfumeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
        <Header 
          currentView={currentView} 
          onViewChange={setCurrentView}
          onAddPerfume={() => setIsAddModalOpen(true)}
        />
        
        <main className="container mx-auto px-4 py-8">
          {renderView()}
        </main>

        <AddPerfumeModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
        />
      </div>
    </PerfumeProvider>
  );
}

export default App;