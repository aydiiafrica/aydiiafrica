/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/app/components/common/Container';
import { client, urlFor } from '@/app/lib/sanity';
import { PortableText } from '@portabletext/react';
import { use } from 'react';
import Image from 'next/image';
import { Gallery } from '@/app/components/common/Gallery';
import { Project } from '@/types';
import { VideoGallery } from '@/app/components/common/VideoGallery';
import { DocumentGallery } from '@/app/components/common/DocumentGallery';

const components = {
  block: {
    normal: ({ children }: any) => (
      <p className="serif mb-6 text-gray-600 leading-relaxed">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-heading mb-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-heading mb-6 mt-12">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-heading mb-4 mt-8">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-heading mb-4 mt-6">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="serif border-l-4 border-primary pl-4 italic my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="serif list-disc list-inside mb-6 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="serif list-decimal list-inside mb-6 space-y-2">
        {children}
      </ol>
    ),
  },
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8 rounded-lg overflow-hidden">
          <img
            src={urlFor(value).url()}
            alt={value.alt || ''}
            className="w-full"
          />
          {value.caption && (
            <p className="serif text-sm text-gray-500 mt-2 text-center">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const categoryTitles: { [key: string]: string } = {
    'climate-action': 'Climate Action',
    'peace-justice-strong-institutions':
      'Peace, Justice and Strong Institutions',
    'gender-equality': 'Gender Equality',
  };

  const categoryColors: { [key: string]: string } = {
    'climate-action': 'bg-green-100 text-green-800',
    'peace-justice-strong-institutions': 'bg-blue-100 text-blue-800',
    'gender-equality': 'bg-red-100 text-red-800',
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const query = `*[_type == "project" && slug.current == $slug][0] {
          title,
          description,
          category,
          mainImage,
          imageGallery,
          videoGallery,
          documentGallery,
          content
        }`;
        const result = await client.fetch(query, { slug });
        setProject(result);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }

  return (
    <article className="py-10">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
                categoryColors[project.category]
              }`}
            >
              {categoryTitles[project.category]}
            </span>
            <h1 className="text-4xl md:text-5xl font-light mb-6">
              {project.title}
            </h1>
            <p className="serif text-gray-500 mb-8">{project.description}</p>
          </div>

          {project.mainImage && (
            <div className="mb-12 rounded-lg overflow-hidden h-[20rem] md:h-[30rem]">
              <Image
                src={urlFor(project.mainImage).url()}
                alt={project.title}
                width={800}
                height={800}
                className="h-full w-full"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <PortableText value={project.content} components={components} />
          </div>

          {project.imageGallery && project.imageGallery.length > 0 && (
            <div className="mt-12 border-t border-gray-200 pt-10">
              <Gallery title="Images" media={project.imageGallery} />
            </div>
          )}

          {project.videoGallery && project.videoGallery.length > 0 && (
            <div className="mt-12 border-t border-gray-200 pt-10">
              <VideoGallery
                title="Videos"
                media={project.videoGallery}
              />
            </div>
          )}

          {project.documentGallery && project.documentGallery.length > 0 && (
            <div className="mt-12 border-t border-gray-200 py-10">
              <DocumentGallery
                title="Documents"
                media={project.documentGallery}
              />
            </div>
          )}
        </div>
      </Container>
    </article>
  );
}
