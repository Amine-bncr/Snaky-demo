// TODO verify with client: prices, pack sizes, exact badge wording, image alt text.
export type ProductId = 'beurre-cacahuete' | 'lait-coco' | 'lait-amande' | 'chocolate' | 'tofu' | 'mayoveg';

export interface Product {
  id: ProductId;
  name: string;
  tagline: string;
  badges: string[];
  image: string;
  imageAlt: string;
  theme: {
    bg: string;
    accent: string;
    text: string;
  };
  priceDA: number | null;
  sizeLabel: string | null;
  packSize: number | null;
}

export const PRODUCTS: Product[] = [
  {
    id: 'beurre-cacahuete',
    name: 'Beurre de cacahuètes',
    tagline: 'Crémeux & intense.',
    badges: ['Sans sucre ajouté'],
    image: '/product-0.webp',
    imageAlt: 'Pot de beurre de cacahuètes Snaky',
    theme: { bg: '#F2DFC0', accent: '#B5702A', text: '#2B1B14' },
    priceDA: null,
    sizeLabel: null,
    packSize: null,
  },
  {
    id: 'lait-coco',
    name: 'Lait de coco',
    tagline: 'Onctueux, doux, 100 % végétal.',
    badges: [],
    image: '/product-1.webp',
    imageAlt: 'Bouteille de lait de coco Snaky sur la plage',
    theme: { bg: '#D6EEF0', accent: '#1F7F8C', text: '#141A33' },
    priceDA: null,
    sizeLabel: null,
    packSize: null,
  },
  {
    id: 'lait-amande',
    name: "Lait d'amande",
    tagline: 'Léger, doux, 100 % végétal.',
    badges: [],
    image: '/product-2.webp',
    imageAlt: "Bouteille de lait d'amande Snaky sur un fond boisé",
    theme: { bg: '#D3E5F8', accent: '#1F6FD1', text: '#141A33' },
    priceDA: null,
    sizeLabel: null,
    packSize: null,
  },
  {
    id: 'chocolate',
    name: 'Crème dessert chocolat',
    tagline: 'Intense en chocolat, à base de lait de soja.',
    badges: [],
    image: '/product-3.webp',
    imageAlt: 'Pot de crème dessert chocolat Snaky sur un plateau en bois',
    theme: { bg: '#2B1B14', accent: '#C9A24B', text: '#FBF7EE' },
    priceDA: null,
    sizeLabel: null,
    packSize: null,
  },
  {
    id: 'tofu',
    name: 'Tofu',
    tagline: 'Riche en protéines.',
    badges: ['Sans gluten', '200 g'],
    image: '/product-4.webp',
    imageAlt: 'Tofu Snaky avec son emballage',
    theme: { bg: '#0E4A2E', accent: '#A8D86E', text: '#FBF7EE' },
    priceDA: null,
    sizeLabel: '200 g',
    packSize: null,
  },
  {
    id: 'mayoveg',
    name: 'Mayoveg',
    tagline: 'La mayonnaise végétale.',
    badges: ['0 % cholestérol'],
    image: '/product-5.webp',
    imageAlt: 'Pot de Mayoveg Snaky sur une table de cuisine',
    theme: { bg: '#E2F3F7', accent: '#2A9DB8', text: '#141A33' },
    priceDA: null,
    sizeLabel: null,
    packSize: null,
  },
];

export function getProducts(): Product[] {
  return PRODUCTS;
}