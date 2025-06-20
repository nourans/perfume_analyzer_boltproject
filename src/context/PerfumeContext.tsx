import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import { Perfume, LayeringRecommendation, PurchaseRecommendation } from '../types';
import { generateLayeringRecommendations, generatePurchaseRecommendations } from '../utils/recommendations';

interface PerfumeContextType {
  perfumes: Perfume[];
  addPerfume: (perfume: Omit<Perfume, 'id'>) => Promise<void>;
  removePerfume: (id: string) => Promise<void>;
  updatePerfume: (id: string, updates: Partial<Perfume>) => Promise<void>;
  layeringRecommendations: LayeringRecommendation[];
  purchaseRecommendations: PurchaseRecommendation[];
  refreshRecommendations: () => void;
}

const PerfumeContext = createContext<PerfumeContextType | undefined>(undefined);

export const usePerfumes = () => {
  const context = useContext(PerfumeContext);
  if (!context) {
    throw new Error('usePerfumes must be used within a PerfumeProvider');
  }
  return context;
};

interface PerfumeProviderProps {
  children: ReactNode;
}

const API_URL = import.meta.env.VITE_API_URL;

export const PerfumeProvider: FC<PerfumeProviderProps> = ({ children }) => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [layeringRecommendations, setLayeringRecommendations] = useState<LayeringRecommendation[]>([]);
  const [purchaseRecommendations, setPurchaseRecommendations] = useState<PurchaseRecommendation[]>([]);

  // Fetch perfumes from backend on mount
  useEffect(() => {
    fetch(`${API_URL}/perfumes`)
      .then(res => res.json())
      .then((data: any[]) => {
        // Convert id to string for frontend compatibility
        setPerfumes(data.map((p: any) => ({ ...p, id: p.id.toString() })));
      });
  }, []);

  useEffect(() => {
    refreshRecommendations();
  }, [perfumes]);

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
      setPerfumes((prev: Perfume[]) => [...prev, { ...newPerfume, id: newPerfume.id.toString() }]);
    } catch (error) {
      console.error('Error adding perfume:', error);
      // Optionally, show an error message to the user
    }
  };

  const removePerfume = async (id: string) => {
    await fetch(`${API_URL}/perfumes/${id}`, { method: 'DELETE' });
    setPerfumes((prev: Perfume[]) => prev.filter((p: Perfume) => p.id !== id));
  };

  const updatePerfume = async (id: string, updates: Partial<Perfume>) => {
    const perfumeToUpdate = perfumes.find((p: Perfume) => p.id === id);
    if (!perfumeToUpdate) return;
    const updatedPerfume = { ...perfumeToUpdate, ...updates, id: Number(id) };
    const res = await fetch(`${API_URL}/perfumes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPerfume),
    });
    const saved = await res.json();
    setPerfumes((prev: Perfume[]) => prev.map((p: Perfume) => p.id === id ? { ...saved, id: saved.id.toString() } : p));
  };

  const refreshRecommendations = () => {
    setLayeringRecommendations(generateLayeringRecommendations(perfumes));
    setPurchaseRecommendations(generatePurchaseRecommendations(perfumes));
  };

  return (
    <PerfumeContext.Provider value={{
      perfumes,
      addPerfume,
      removePerfume,
      updatePerfume,
      layeringRecommendations,
      purchaseRecommendations,
      refreshRecommendations
    }}>
      {children}
    </PerfumeContext.Provider>
  );
};