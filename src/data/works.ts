// src/data/works.ts

export interface Project {
  id: string;
  image: string;
  url: string;
  titleKey: string;
  descriptionKey: string;
  pageCount: number;
  price: number;
  features: string[];
}

export const worksData: Project[] = [
  {
    id: 'daisoubus',
    image: '/images/works/daisoubus.jp_1280.webp',
    url: 'https://daisoubus.jp/',
    titleKey: 'works.daisoubus.title',
    descriptionKey: 'works.daisoubus.description',
    pageCount: 17,
    price: 700000,
    features: [
      'works.daisoubus.features.0',
      'works.daisoubus.features.1',
      'works.daisoubus.features.2',
      'works.daisoubus.features.3',
    ],
  },
  {
    id: 'mononest',
    image: '/images/works/mononest.jp_1280.webp',
    url: 'https://mononest.jp/',
    titleKey: 'works.mononest.title',
    descriptionKey: 'works.mononest.description',
    pageCount: 5,
    price: 250000,
    features: [
      'works.mononest.features.0',
      'works.mononest.features.1',
      'works.mononest.features.2',
    ],
  },
]; 