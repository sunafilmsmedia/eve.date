export type DateCategory =
  | "first-date"
  | "anniversary"
  | "nature"
  | "gastronomy"
  | "winter"
  | "adventure"
  | "art-culture";

export type City = "Montréal" | "Laval" | "Brossard" | "Magog";
export type CardVariant = "rose" | "gold" | "dark";

export type DateOccasion =
  // Singles
  | "1ere-date"
  | "2eme-date"
  | "3eme-date+"
  | "casual"
  // Couples
  | "date-night"
  | "anniversaire"
  | "saint-valentin"
  | "birthday"
  // Both
  | "weekend";

export type Season = "printemps" | "ete" | "automne" | "hiver" | "all";

export type DateIdea = {
  id: string;
  title: string;
  category: DateCategory;
  city: City;
  occasions: DateOccasion[];
  seasons: Season[];
  steps: string[];
  duration: string;
  price: string;
  rating: number;
  ratingCount: number;
  variant: CardVariant;
  forSingles: boolean;
  forCouples: boolean;
};

export const CATEGORIES: { value: DateCategory; label: string; emoji: string }[] = [
  { value: "art-culture", label: "Art & Culture", emoji: "🎨" },
  { value: "gastronomy", label: "Gastronomie", emoji: "🍷" },
  { value: "nature", label: "Nature & Plein air", emoji: "🌿" },
  { value: "adventure", label: "Aventure", emoji: "🎯" },
  { value: "winter", label: "Hiver", emoji: "❄️" },
  { value: "anniversary", label: "Anniversaire", emoji: "💍" },
  { value: "first-date", label: "1ères dates", emoji: "🌹" },
];

export const DATES: DateIdea[] = [
  {
    id: "cafe-mont-royal",
    title: "Café & Mont-Royal",
    category: "nature",
    city: "Montréal",
    occasions: ["1ere-date", "2eme-date", "casual"],
    seasons: ["printemps", "ete", "automne"],
    steps: [
      "Café spécialité dans le Plateau",
      "Marche jusqu'au Mont-Royal",
      "Belvédère & panorama de Montréal",
    ],
    duration: "3h",
    price: "~$25/pers.",
    rating: 4.7,
    ratingCount: 543,
    variant: "rose",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "brunch-galerie",
    title: "Brunch & Galerie",
    category: "art-culture",
    city: "Montréal",
    occasions: ["1ere-date", "casual", "date-night"],
    seasons: ["all"],
    steps: [
      "Brunch dans le Mile End",
      "Visite d'une galerie d'art locale",
      "Café artisanal pour conclure",
    ],
    duration: "4h",
    price: "~$55/pers.",
    rating: 4.7,
    ratingCount: 234,
    variant: "gold",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "musee-cafe",
    title: "Musée & Café",
    category: "art-culture",
    city: "Montréal",
    occasions: ["1ere-date", "casual"],
    seasons: ["all"],
    steps: [
      "Visite du Musée des Beaux-Arts",
      "Discussion devant les œuvres",
      "Café & dessert pour conclure",
    ],
    duration: "3-4h",
    price: "~$45/pers.",
    rating: 4.6,
    ratingCount: 312,
    variant: "dark",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "escape-cocktails",
    title: "Escape Room & Cocktails",
    category: "adventure",
    city: "Montréal",
    occasions: ["1ere-date", "2eme-date"],
    seasons: ["all"],
    steps: [
      "Escape room thématique 60 min",
      "Debrief autour de cocktails signés",
      "Resto tapas optionnel",
    ],
    duration: "3–4h",
    price: "~$70/pers.",
    rating: 4.7,
    ratingCount: 234,
    variant: "rose",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "marche-jean-talon",
    title: "Marché & Brunch",
    category: "gastronomy",
    city: "Montréal",
    occasions: ["2eme-date", "casual", "weekend"],
    seasons: ["printemps", "ete", "automne"],
    steps: [
      "Tour du Marché Jean-Talon",
      "Dégustation chez les producteurs",
      "Brunch dans la Petite-Italie",
    ],
    duration: "4h",
    price: "~$40/pers.",
    rating: 4.8,
    ratingCount: 421,
    variant: "gold",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "comedie-cocktails",
    title: "Comédie & Cocktails",
    category: "art-culture",
    city: "Montréal",
    occasions: ["2eme-date", "date-night"],
    seasons: ["all"],
    steps: [
      "Spectacle de stand-up au Bordel ou Comedy Nest",
      "Cocktails dans le Vieux-Mtl",
      "Marche romantique au Vieux-Port",
    ],
    duration: "4h",
    price: "~$75/pers.",
    rating: 4.6,
    ratingCount: 187,
    variant: "dark",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "patin-vieux-port",
    title: "Patin & Chocolat",
    category: "winter",
    city: "Montréal",
    occasions: ["1ere-date", "2eme-date", "date-night"],
    seasons: ["hiver"],
    steps: [
      "Patinage au Vieux-Port",
      "Pause chocolat chaud",
      "Balade dans le Vieux-Mtl",
    ],
    duration: "3h",
    price: "~$35/pers.",
    rating: 4.5,
    ratingCount: 421,
    variant: "rose",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "karting-fondue",
    title: "Karting & Fondue",
    category: "adventure",
    city: "Brossard",
    occasions: ["2eme-date", "date-night", "casual"],
    seasons: ["all"],
    steps: [
      "Sessions de karting indoor",
      "Trophée à celui qui gagne 😉",
      "Fondue chinoise pour célébrer",
    ],
    duration: "4h",
    price: "~$85/pers.",
    rating: 4.5,
    ratingCount: 156,
    variant: "gold",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "cours-cuisine",
    title: "Cours de cuisine privé",
    category: "gastronomy",
    city: "Laval",
    occasions: ["3eme-date+", "date-night", "anniversaire"],
    seasons: ["all"],
    steps: [
      "Cours de cuisine avec un chef",
      "Préparation d'un menu 3 services",
      "Dégustation à deux à la maison",
    ],
    duration: "4h",
    price: "~$110/pers.",
    rating: 4.8,
    ratingCount: 92,
    variant: "rose",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "vignoble-spa",
    title: "Vignoble & Spa",
    category: "gastronomy",
    city: "Magog",
    occasions: ["anniversaire", "saint-valentin", "date-night", "weekend"],
    seasons: ["printemps", "ete", "automne"],
    steps: [
      "Dégustation de vins en après-midi",
      "Balade dans les vignes",
      "Soirée spa & souper romantique",
    ],
    duration: "5–6h",
    price: "~$140/pers.",
    rating: 4.8,
    ratingCount: 312,
    variant: "gold",
    forSingles: false,
    forCouples: true,
  },
  {
    id: "coucher-soleil",
    title: "Coucher de soleil",
    category: "gastronomy",
    city: "Laval",
    occasions: ["anniversaire", "saint-valentin", "birthday"],
    seasons: ["printemps", "ete", "automne"],
    steps: [
      "Bouquet surprise livré",
      "Point de vue panoramique au coucher du soleil",
      "Dîner gastronomique réservé",
    ],
    duration: "4–5h",
    price: "~$180/pers.",
    rating: 4.9,
    ratingCount: 198,
    variant: "dark",
    forSingles: false,
    forCouples: true,
  },
  {
    id: "spa-nordique",
    title: "Spa Nordique",
    category: "gastronomy",
    city: "Brossard",
    occasions: ["anniversaire", "saint-valentin", "date-night"],
    seasons: ["hiver", "automne"],
    steps: [
      "Bains chauds & froids alternés",
      "Massage en duo",
      "Soirée tisane & feu de bois",
    ],
    duration: "Demi-journée",
    price: "~$140/pers.",
    rating: 4.9,
    ratingCount: 178,
    variant: "rose",
    forSingles: false,
    forCouples: true,
  },
  {
    id: "lac-chalet",
    title: "Lac & Chalet",
    category: "nature",
    city: "Magog",
    occasions: ["weekend", "anniversaire", "saint-valentin"],
    seasons: ["ete", "automne"],
    steps: [
      "Kayak sur le Memphrémagog",
      "Pique-nique au bord de l'eau",
      "Feu de camp & étoiles",
    ],
    duration: "Journée",
    price: "~$95/pers.",
    rating: 4.6,
    ratingCount: 87,
    variant: "gold",
    forSingles: false,
    forCouples: true,
  },
  {
    id: "cidrerie-automne",
    title: "Cidrerie & Pommes",
    category: "nature",
    city: "Magog",
    occasions: ["casual", "date-night", "weekend", "2eme-date"],
    seasons: ["automne"],
    steps: [
      "Cueillette de pommes en verger",
      "Dégustation de cidres locaux",
      "Tarte chaude & crème fraîche",
    ],
    duration: "5h",
    price: "~$45/pers.",
    rating: 4.6,
    ratingCount: 67,
    variant: "rose",
    forSingles: true,
    forCouples: true,
  },
  // ─── Huîtres à 1$ à Laval — promos en cours ─────────────
  {
    id: "huitres-gatto-matto",
    title: "Huîtres à 1$ · Gatto Matto",
    category: "gastronomy",
    city: "Laval",
    occasions: ["2eme-date", "date-night", "casual"],
    seasons: ["all"],
    steps: [
      "Jeudi dès 17h · 1950 rue Claude-Gagné #302, Laval",
      "Douzaines d'huîtres à 1$ + verre à partager",
      "Ambiance italienne chic près de Place Bell",
    ],
    duration: "1–2h",
    price: "~$25–40/pers.",
    rating: 4.7,
    ratingCount: 118,
    variant: "gold",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "huitres-mme-bovary",
    title: "Huîtres à 1$ · Mme Bovary",
    category: "gastronomy",
    city: "Laval",
    occasions: ["2eme-date", "date-night", "weekend"],
    seasons: ["all"],
    steps: [
      "Jeudi 17h à 22h · 1780 av. Pierre-Péladeau, Laval",
      "Douzaines d'huîtres fraîches à 1$",
      "Vibe bistro français au cœur du Centropolis",
    ],
    duration: "2h",
    price: "~$30–50/pers.",
    rating: 4.8,
    ratingCount: 156,
    variant: "rose",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "huitres-boating-club",
    title: "Huîtres à 1$ · Le Boating Club",
    category: "gastronomy",
    city: "Laval",
    occasions: ["date-night", "weekend", "casual"],
    seasons: ["all"],
    steps: [
      "Dimanche dès 17h · 30 boul. Curé-Labelle (Sainte-Rose)",
      "Douzaines d'huîtres à 1$ vue sur l'eau",
      "Cocktails et ambiance yacht club",
    ],
    duration: "2h",
    price: "~$30–45/pers.",
    rating: 4.6,
    ratingCount: 97,
    variant: "dark",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "huitres-lucilles",
    title: "Huîtres à 1$ · Lucille's",
    category: "gastronomy",
    city: "Laval",
    occasions: ["1ere-date", "2eme-date", "casual", "date-night"],
    seasons: ["all"],
    steps: [
      "Tous les jours · 2565 boul. Daniel-Johnson (Carrefour Laval)",
      "Douzaines d'huîtres à 1$ à toute heure",
      "Menu de mer complet si vous avez encore faim",
    ],
    duration: "1–2h",
    price: "~$25–40/pers.",
    rating: 4.5,
    ratingCount: 234,
    variant: "rose",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "huitres-vertigo",
    title: "Huîtres à 1$ · Vertigo",
    category: "gastronomy",
    city: "Laval",
    occasions: ["1ere-date", "2eme-date", "casual"],
    seasons: ["all"],
    steps: [
      "Lundi au jeudi 17h à 19h · côté bar seulement",
      "1880 av. Pierre-Péladeau (Centropolis)",
      "Huîtres à 1$ + cocktails signature",
    ],
    duration: "1–1h30",
    price: "~$25–35/pers.",
    rating: 4.7,
    ratingCount: 189,
    variant: "gold",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "huitres-123-dzo",
    title: "Huîtres à 1$ · 123 Dzô",
    category: "gastronomy",
    city: "Laval",
    occasions: ["2eme-date", "date-night", "casual"],
    seasons: ["all"],
    steps: [
      "Mardi et mercredi dès 17h · 2121 boul. le Carrefour, Laval",
      "Douzaines d'huîtres à 1$",
      "Cuisine asiatique fusion, cocktails créatifs",
    ],
    duration: "1–2h",
    price: "~$30–45/pers.",
    rating: 4.6,
    ratingCount: 142,
    variant: "dark",
    forSingles: true,
    forCouples: true,
  },
];

export function starsString(rating: number): string {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}
