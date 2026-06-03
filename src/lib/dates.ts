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

export type DateIdea = {
  id: string;
  title: string;
  tag: string;
  category: DateCategory;
  city: City;
  steps: string[];
  duration: string;
  price: string;
  rating: number;
  ratingCount: number;
  variant: CardVariant;
  forSingles: boolean;
  forCouples: boolean;
};

export const DATES: DateIdea[] = [
  {
    id: "vignoble-spa",
    title: "Vignoble & Spa",
    tag: "1ère date",
    category: "first-date",
    city: "Montréal",
    steps: [
      "Dégustation de vins en après-midi",
      "Balade dans les vignes",
      "Soirée spa & soupe chaude",
    ],
    duration: "5–6h",
    price: "~$120/pers.",
    rating: 4.8,
    ratingCount: 312,
    variant: "rose",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "coucher-soleil",
    title: "Coucher de soleil",
    tag: "Anniversaire",
    category: "anniversary",
    city: "Laval",
    steps: [
      "Bouquet surprise livré",
      "Point de vue panoramique",
      "Dîner gastronomique réservé",
    ],
    duration: "4–5h",
    price: "~$180/pers.",
    rating: 4.9,
    ratingCount: 198,
    variant: "gold",
    forSingles: false,
    forCouples: true,
  },
  {
    id: "lac-chalet",
    title: "Lac & Chalet",
    tag: "Aventure",
    category: "adventure",
    city: "Magog",
    steps: [
      "Kayak sur le Memphrémagog",
      "Pique-nique au bord de l'eau",
      "Feu de camp & étoiles",
    ],
    duration: "Journée",
    price: "~$95/pers.",
    rating: 4.6,
    ratingCount: 87,
    variant: "dark",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "patin-vieux-port",
    title: "Patin & Chocolat chaud",
    tag: "Hiver",
    category: "winter",
    city: "Montréal",
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
    id: "brunch-galerie",
    title: "Brunch & Galerie",
    tag: "Art & Culture",
    category: "art-culture",
    city: "Montréal",
    steps: [
      "Brunch dans le Mile End",
      "Visite d'une galerie d'art",
      "Café artisanal pour conclure",
    ],
    duration: "4h",
    price: "~$55/pers.",
    rating: 4.7,
    ratingCount: 156,
    variant: "gold",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "escape-cocktails",
    title: "Escape Room & Cocktails",
    tag: "1ère date",
    category: "first-date",
    city: "Montréal",
    steps: [
      "Escape room thématique 60 min",
      "Debrief autour de cocktails signés",
      "Resto tapas optionnel",
    ],
    duration: "3–4h",
    price: "~$70/pers.",
    rating: 4.7,
    ratingCount: 234,
    variant: "dark",
    forSingles: true,
    forCouples: true,
  },
  {
    id: "cours-cuisine",
    title: "Cours de cuisine privé",
    tag: "Gastronomie",
    category: "gastronomy",
    city: "Laval",
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
    forSingles: false,
    forCouples: true,
  },
  {
    id: "spa-nordique",
    title: "Spa Nordique",
    tag: "Anniversaire",
    category: "anniversary",
    city: "Brossard",
    steps: [
      "Bains chauds & froids alternés",
      "Massage en duo",
      "Soirée tisane & feu de bois",
    ],
    duration: "Demi-journée",
    price: "~$140/pers.",
    rating: 4.9,
    ratingCount: 178,
    variant: "gold",
    forSingles: false,
    forCouples: true,
  },
  {
    id: "cidrerie-automne",
    title: "Cidrerie & Pommes",
    tag: "Nature",
    category: "nature",
    city: "Magog",
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
];

export function starsString(rating: number): string {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}
