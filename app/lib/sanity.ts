/* eslint-disable @typescript-eslint/no-explicit-any */

import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production', // Using the correct dataset name directly
  apiVersion: '2024-05-04',
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Typed queries
export interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  gallery: any[];
  date: string;
  content: any[]; // Adding content field
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
