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
  {
    id: 'rakufirst',
    image: '/images/works/raku-first.co.jp-1280.webp',
    url: 'https://raku-first.co.jp/',
    titleKey: 'works.rakufirst.title',
    descriptionKey: 'works.rakufirst.description',
    pageCount: 12,
    price: 480000,
    features: [
      'works.rakufirst.features.0',
      'works.rakufirst.features.1',
      'works.rakufirst.features.2',
    ],
  },
  {
    id: 'rakutto',
    image: '/images/works/www.rakutto.com_index-1280.webp',
    url: 'https://www.rakutto.com/index',
    titleKey: 'works.rakutto.title',
    descriptionKey: 'works.rakutto.description',
    pageCount: 10,
    price: 520000,
    features: [
      'works.rakutto.features.0',
      'works.rakutto.features.1',
      'works.rakutto.features.2',
    ],
  },
]; 