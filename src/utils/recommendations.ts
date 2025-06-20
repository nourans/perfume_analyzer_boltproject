import { Perfume, LayeringRecommendation, PurchaseRecommendation, FragranceFamily } from '../types';

export const generateLayeringRecommendations = (perfumes: Perfume[]): LayeringRecommendation[] => {
  if (perfumes.length < 2) return [];

  const recommendations: LayeringRecommendation[] = [];

  // Generate complementary layering recommendations
  for (let i = 0; i < perfumes.length; i++) {
    for (let j = i + 1; j < perfumes.length; j++) {
      const perfume1 = perfumes[i];
      const perfume2 = perfumes[j];
      
      // Check compatibility based on fragrance families and notes
      const compatibility = calculateLayeringCompatibility(perfume1, perfume2);
      
      if (compatibility >= 6) {
        const commonSeasons = perfume1.season.filter(s => perfume2.season.includes(s));
        const commonOccasions = perfume1.occasion.filter(o => perfume2.occasion.includes(o));
        
        recommendations.push({
          id: `${perfume1.id}-${perfume2.id}`,
          perfumes: [perfume1.id, perfume2.id],
          title: `${perfume1.name} × ${perfume2.name}`,
          description: generateLayeringDescription(perfume1, perfume2),
          compatibility,
          season: commonSeasons.length > 0 ? commonSeasons : [...new Set([...perfume1.season, ...perfume2.season])],
          occasion: commonOccasions.length > 0 ? commonOccasions : [...new Set([...perfume1.occasion, ...perfume2.occasion])],
          tips: generateLayeringTips(perfume1, perfume2)
        });
      }
    }
  }

  return recommendations.sort((a, b) => b.compatibility - a.compatibility).slice(0, 5);
};

export const generatePurchaseRecommendations = (perfumes: Perfume[]): PurchaseRecommendation[] => {
  if (perfumes.length === 0) return [];

  const recommendations: PurchaseRecommendation[] = [];
  
  // Analyze user preferences
  const preferences = analyzeUserPreferences(perfumes);
  
  // Sample recommendations based on preferences
  const potentialPurchases = [
    {
      name: 'Aventus',
      brand: 'Creed',
      fragranceFamily: 'Fresh' as FragranceFamily,
      topNotes: ['Pineapple', 'Bergamot', 'Black Currant', 'Apple'],
      middleNotes: ['Birch', 'Patchouli', 'Moroccan Jasmine', 'Rose'],
      baseNotes: ['Musk', 'Oak Moss', 'Ambergris', 'Vanilla'],
      estimatedPrice: 350,
      season: ['Spring', 'Summer'],
      occasion: ['Work', 'Special']
    },
    {
      name: 'Baccarat Rouge 540',
      brand: 'Maison Francis Kurkdjian',
      fragranceFamily: 'Oriental' as FragranceFamily,
      topNotes: ['Jasmine', 'Saffron'],
      middleNotes: ['Amberwood', 'Ambergris'],
      baseNotes: ['Fir Resin', 'Cedar'],
      estimatedPrice: 325,
      season: ['Fall', 'Winter'],
      occasion: ['Evening', 'Special']
    },
    {
      name: 'Ombre Nomade',
      brand: 'Louis Vuitton',
      fragranceFamily: 'Woody' as FragranceFamily,
      topNotes: ['Oud', 'Rose'],
      middleNotes: ['Saffron', 'Benzoin'],
      baseNotes: ['Raspberry', 'Birch'],
      estimatedPrice: 320,
      season: ['Fall', 'Winter'],
      occasion: ['Evening', 'Date']
    },
    {
      name: 'Libre',
      brand: 'Yves Saint Laurent',
      fragranceFamily: 'Floral' as FragranceFamily,
      topNotes: ['Mandarin Orange', 'Black Currant', 'Petitgrain'],
      middleNotes: ['Jasmine', 'Orange Blossom', 'Lavender'],
      baseNotes: ['Madagascar Vanilla', 'Ambergris', 'Cedar'],
      estimatedPrice: 100,
      season: ['Spring', 'Summer'],
      occasion: ['Casual', 'Work', 'Date']
    },
    {
      name: 'By the Fireplace',
      brand: 'Replica',
      fragranceFamily: 'Gourmand' as FragranceFamily,
      topNotes: ['Pink Pepper', 'Orange', 'Clove'],
      middleNotes: ['Guaiac Wood', 'Juniper', 'Rose'],
      baseNotes: ['Vanilla', 'Cashmeran', 'Chestnut'],
      estimatedPrice: 130,
      season: ['Fall', 'Winter'],
      occasion: ['Casual', 'Evening']
    }
  ];

  // Score each potential purchase
  potentialPurchases.forEach((purchase, index) => {
    const compatibility = calculatePurchaseCompatibility(purchase, preferences, perfumes);
    
    if (compatibility >= 5) {
      recommendations.push({
        id: `rec-${index}`,
        ...purchase,
        reason: generatePurchaseReason(purchase, preferences, perfumes),
        compatibility,
        similarTo: findSimilarPerfumes(purchase, perfumes)
      });
    }
  });

  return recommendations.sort((a, b) => b.compatibility - a.compatibility).slice(0, 4);
};

const calculateLayeringCompatibility = (perfume1: Perfume, perfume2: Perfume): number => {
  let score = 5; // Base score

  // Same family bonus
  if (perfume1.fragranceFamily === perfume2.fragranceFamily) {
    score += 1;
  }

  // Complementary families
  const complementaryPairs = [
    ['Fresh', 'Woody'],
    ['Floral', 'Oriental'],
    ['Gourmand', 'Woody']
  ];
  
  const isComplementary = complementaryPairs.some(pair => 
    (pair.includes(perfume1.fragranceFamily) && pair.includes(perfume2.fragranceFamily))
  );
  
  if (isComplementary) {
    score += 2;
  }

  // Shared notes
  const allNotes1 = [...perfume1.topNotes, ...perfume1.middleNotes, ...perfume1.baseNotes];
  const allNotes2 = [...perfume2.topNotes, ...perfume2.middleNotes, ...perfume2.baseNotes];
  const sharedNotes = allNotes1.filter(note => allNotes2.includes(note));
  
  score += Math.min(sharedNotes.length * 0.5, 2);

  // Different concentrations work better for layering
  if (perfume1.concentration !== perfume2.concentration) {
    score += 1;
  }

  return Math.min(Math.max(score, 1), 10);
};

const calculatePurchaseCompatibility = (
  purchase: any, 
  preferences: any, 
  perfumes: Perfume[]
): number => {
  let score = 5; // Base score

  // Family preference
  if (preferences.favoriteFamilies.includes(purchase.fragranceFamily)) {
    score += 2;
  }

  // Season alignment
  const seasonMatch = purchase.season.some((s: any) => preferences.preferredSeasons.includes(s));
  if (seasonMatch) {
    score += 1;
  }

  // Occasion alignment
  const occasionMatch = purchase.occasion.some((o: any) => preferences.preferredOccasions.includes(o));
  if (occasionMatch) {
    score += 1;
  }

  // Gap filling - different from existing collection
  const hasFamily = perfumes.some(p => p.fragranceFamily === purchase.fragranceFamily);
  if (!hasFamily) {
    score += 2; // Bonus for filling gaps
  }

  // Note preferences
  const allPurchaseNotes = [...purchase.topNotes, ...purchase.middleNotes, ...purchase.baseNotes];
  const noteMatches = allPurchaseNotes.filter(note => preferences.favoriteNotes.includes(note));
  score += Math.min(noteMatches.length * 0.3, 1.5);

  return Math.min(Math.max(score, 1), 10);
};

const analyzeUserPreferences = (perfumes: Perfume[]) => {
  const allNotes = perfumes.flatMap(p => [...p.topNotes, ...p.middleNotes, ...p.baseNotes]);
  const noteFrequency = allNotes.reduce((acc, note) => {
    acc[note] = (acc[note] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const favoriteNotes = Object.entries(noteFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([note]) => note);

  const familyFrequency = perfumes.reduce((acc, p) => {
    acc[p.fragranceFamily] = (acc[p.fragranceFamily] || 0) + 1;
    return acc;
  }, {} as Record<FragranceFamily, number>);

  const favoriteFamilies = Object.entries(familyFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([family]) => family as FragranceFamily);

  const allSeasons = perfumes.flatMap(p => p.season);
  const seasonFrequency = allSeasons.reduce((acc, season) => {
    acc[season] = (acc[season] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const preferredSeasons = Object.entries(seasonFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 2)
    .map(([season]) => season);

  const allOccasions = perfumes.flatMap(p => p.occasion);
  const occasionFrequency = allOccasions.reduce((acc, occasion) => {
    acc[occasion] = (acc[occasion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const preferredOccasions = Object.entries(occasionFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([occasion]) => occasion);

  return {
    favoriteNotes,
    favoriteFamilies,
    preferredSeasons,
    preferredOccasions
  };
};

const generateLayeringDescription = (perfume1: Perfume, perfume2: Perfume): string => {
  const descriptions = [
    `Combine the ${perfume1.fragranceFamily.toLowerCase()} essence of ${perfume1.name} with the ${perfume2.fragranceFamily.toLowerCase()} character of ${perfume2.name} for a unique, personalized scent.`,
    `Layer ${perfume1.name}'s distinctive profile with ${perfume2.name} to create depth and complexity that evolves throughout the day.`,
    `The complementary notes in ${perfume1.name} and ${perfume2.name} create a harmonious blend that enhances both fragrances.`
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const generateLayeringTips = (perfume1: Perfume, perfume2: Perfume): string[] => {
  const tips = [
    `Apply ${perfume1.name} first as the base layer, then mist ${perfume2.name} lightly on top.`,
    'Focus application on pulse points: wrists, neck, and behind ears.',
    'Allow each layer to dry before applying the next for best results.',
    'Start with lighter concentrations and build up intensity gradually.'
  ];

  // Add specific tips based on perfume characteristics
  if (perfume1.longevity > perfume2.longevity) {
    tips.push(`${perfume1.name} has better longevity, so use it as your base layer.`);
  }
  
  if (perfume1.sillage > perfume2.sillage) {
    tips.push(`Use ${perfume1.name} sparingly as it has strong projection.`);
  }

  return tips.slice(0, 4);
};

const generatePurchaseReason = (purchase: any, preferences: any, perfumes: Perfume[]): string => {
  const reasons = [];
  
  if (preferences.favoriteFamilies.includes(purchase.fragranceFamily)) {
    reasons.push(`matches your preference for ${purchase.fragranceFamily.toLowerCase()} fragrances`);
  }
  
  const hasFamily = perfumes.some(p => p.fragranceFamily === purchase.fragranceFamily);
  if (!hasFamily) {
    reasons.push(`adds a new ${purchase.fragranceFamily.toLowerCase()} dimension to your collection`);
  }
  
  const noteMatches = [...purchase.topNotes, ...purchase.middleNotes, ...purchase.baseNotes]
    .filter(note => preferences.favoriteNotes.includes(note));
  
  if (noteMatches.length > 0) {
    reasons.push(`features your favorite notes: ${noteMatches.slice(0, 2).join(', ')}`);
  }
  
  if (reasons.length === 0) {
    reasons.push('offers a unique olfactory experience that complements your current collection');
  }
  
  return `This fragrance ${reasons.join(' and ')}.`;
};

const findSimilarPerfumes = (purchase: any, perfumes: Perfume[]): string[] => {
  const similar = perfumes.filter(p => {
    const purchaseNotes = [...purchase.topNotes, ...purchase.middleNotes, ...purchase.baseNotes];
    const perfumeNotes = [...p.topNotes, ...p.middleNotes, ...p.baseNotes];
    const sharedNotes = purchaseNotes.filter(note => perfumeNotes.includes(note));
    
    return p.fragranceFamily === purchase.fragranceFamily || sharedNotes.length >= 2;
  });
  
  return similar.slice(0, 2).map(p => p.name);
};