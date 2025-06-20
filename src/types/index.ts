export interface Perfume {
  id: string;
  name: string;
  brand: string;
  concentration: 'EDT' | 'EDP' | 'Parfum' | 'Cologne' | 'Oil';
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  fragranceFamily: FragranceFamily;
  season: Season[];
  occasion: Occasion[];
  longevity: number; // 1-10 scale
  sillage: number; // 1-10 scale
  personalRating: number; // 1-5 scale
  purchaseDate?: Date;
  price?: number;
  description?: string;
  image?: string;
}

export type FragranceFamily = 
  | 'Fresh' | 'Floral' | 'Oriental' | 'Woody' | 'Gourmand' | 'Fougère' | 'Chypre' | 'Leather';

export type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter';

export type Occasion = 'Casual' | 'Work' | 'Evening' | 'Special' | 'Date' | 'Sport';

export interface LayeringRecommendation {
  id: string;
  perfumes: string[]; // Perfume IDs
  title: string;
  description: string;
  compatibility: number; // 1-10 scale
  season: Season[];
  occasion: Occasion[];
  tips: string[];
}

export interface PurchaseRecommendation {
  id: string;
  name: string;
  brand: string;
  fragranceFamily: FragranceFamily;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  reason: string;
  compatibility: number; // 1-10 scale
  estimatedPrice: number;
  season: Season[];
  occasion: Occasion[];
  similarTo?: string[]; // Perfume names from collection
}

export interface UserPreferences {
  favoriteNotes: string[];
  favoriteFamilies: FragranceFamily[];
  preferredSeasons: Season[];
  preferredOccasions: Occasion[];
  longevityPreference: number;
  sillagePreference: number;
  budgetRange: {
    min: number;
    max: number;
  };
}