'use client';

import { Media } from '@/types';
import Link from 'next/link';
import { getFileAsset } from '@sanity/asset-utils';
import Button from './Button';

interface DocumentGalleryProps {
  media: Media[];
  title: string;
}

export function DocumentGallery({ media, title }: DocumentGalleryProps) {
  const documents = media.map((m) => {
    const doc = getFileAsset(m.documentFile, {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET_ID,
    });

    return { id: doc._id, url: doc.url, name: m.documentName };
  });

  return (
    <section className="grid gap-10">
      <article>
        <h3 className="text-2xl md:text-3xl font-light">{title}</h3>
      </article>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {documents.map((item) => (
          <Link
            passHref
            href={item.url}
            key={item.id}
            target="_blank"
            className="border text-secondary border-gray-200 rounded-md p-6 space-y-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-type-icon lucide-file-type"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M9 13v-1h6v1" />
              <path d="M12 12v6" />
              <path d="M11 18h2" />
            </svg>

            <h4 className='text-black font-light'>{item.name}</h4>

            <Button variant="secondary-alt" className=''>Download</Button>
          </Link>
        ))}
      </div>
    </section>
  );
}
