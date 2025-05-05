/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/app/components/common/Container';
import { client, urlFor } from '@/app/lib/sanity';
import { PortableText } from '@portabletext/react';
import { use } from 'react';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  category: string;
  mainImage: any;
  images: any[];
  body: any[];
}

const components = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-6 text-gray-600 leading-relaxed">{children}</p>
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
          images,
          body
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
    <article className="py-20">
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
            <h1 className="text-4xl md:text-5xl font-heading mb-6">
              {project.title}
            </h1>
            <p className="text-gray-500 mb-8">{project.description}</p>
          </div>

          {project.mainImage && (
            <div className="mb-12 rounded-lg overflow-hidden">
              <Image
                src={urlFor(project.mainImage).url()}
                alt={project.title}
                width={1200}
                height={675}
                className="w-full"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <PortableText value={project.body} components={components} />
          </div>

          {project.images && project.images.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-heading mb-6">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images.map((image: any, index: number) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden"
                  >
                    <Image
                      src={urlFor(image).url()}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </article>
  );
}
