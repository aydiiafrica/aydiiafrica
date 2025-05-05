/* eslint-disable @typescript-eslint/no-explicit-any */

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-05-05',
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export interface News {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  featuredImage: any;
  content: any[];
  publishedAt: string;
}

export interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  gallery: any[];
  content: any[];
  date: string;
}
