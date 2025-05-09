'use client';

import { urlFor } from '@/app/lib/sanity';
import { Media } from '@/types';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Video from 'yet-another-react-lightbox/plugins/video';
import { getFileAsset } from '@sanity/asset-utils';
import { getImageDimensions } from '@/app/lib/utils';
import { MasonryPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/masonry.css';

interface VideoGalleryProps {
  media: Media[];
  title: string;
}

export function VideoGallery({ media, title }: VideoGalleryProps) {
  const [index, setIndex] = useState(-1);
  const videos = media.map((m) => {
    const video = getFileAsset(m.videoFile, {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET_ID,
    });

    return {
      type: 'video' as const,
      src: video.url,
      poster: urlFor(m.thumbnail.asset._ref).url(),
      width: 1280,
      height: 720,
      sources: [
        {
          src: getFileAsset(m.videoFile, {
            projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
            dataset: process.env.NEXT_PUBLIC_SANITY_DATASET_ID,
          }).url,
          type: `video/${video.extension}`,
        },
      ],
    };
  });

  const images = media.map((m) => {
    const { width, height } = getImageDimensions(m.thumbnail.asset._ref);
    return {
      src: urlFor(m.thumbnail.asset._ref).url(),
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
        plugins={[Video]}
        slides={videos}
      />
    </section>
  );
}
