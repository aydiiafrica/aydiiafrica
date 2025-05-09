'use client';

import { urlFor } from '@/app/lib/sanity';
import { Media } from '@/types';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import { MasonryPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/masonry.css';
import { getImageDimensions } from '@/app/lib/utils';
interface PhotoGalleryProps {
  media: Media[];
  title: string;
}

export function Gallery({ media, title }: PhotoGalleryProps) {
  const [index, setIndex] = useState(-1);

  const images = media.map((m) => {
    if (m.file) {
      const { width, height } = getImageDimensions(m.file.asset._ref);
      return {
        src: urlFor(m.file.asset._ref).url(),
        width,
        height,
      };
    }

    const { width, height } = getImageDimensions(m.asset._ref);
    return {
      src: urlFor(m.asset._ref).url(),
      width,
      height,
    };
  });

  return (
    <section className="grid gap-10">
      <article>
        <h3 className="text-2xl md:text-3xl font-light">{title}</h3>
      </article>

      <MasonryPhotoAlbum
        photos={images}
        onClick={({ index: current }) => setIndex(current)}
      />

      <Lightbox
        index={index}
        close={() => setIndex(-1)}
        open={index >= 0}
        slides={images}
      />
    </section>
  );
}
