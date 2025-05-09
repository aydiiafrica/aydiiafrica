/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { Container } from '../components/common/Container';
import { ProjectCard } from '@/app/components/common/ProjectCard';
import { client, urlFor } from '@/app/lib/sanity';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/app/lib/cn';
import { use } from 'react';
import { Gallery } from '../components/common/Gallery';

interface SDG {
  title: string;
  description: string;
  mainImage: any;
  images: any[];
  colorScheme: {
    border: string;
    heading: string;
  };
}

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  sdgs: Array<{ _ref: string }>;
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [sdg, setSdg] = useState<SDG | null>(null);
  const { category } = use(params);

  useEffect(() => {
    const fetchSdgAndProjects = async () => {
      try {
        // Fetch SDG data
        const sdgQuery = `*[_type == "sdg" && slug.current == $category][0] {
          title,
          description,
          mainImage,
          images,
          colorScheme
        }`;
        const sdgData = await client.fetch(sdgQuery, { category });

        if (!sdgData) {
          router.push('/');
          return;
        }

        setSdg(sdgData);

        // Fetch projects that reference this SDG
        const projectsQuery = `*[_type == "project" && references(*[_type == "sdg" && slug.current == $category]._id)] {
          _id,
          title,
          slug,
          description,
          mainImage {
            asset -> {
              url
            }
          }
        }`;
        const projectsData = await client.fetch(projectsQuery, { category });
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSdgAndProjects();
  }, [category, router]);

  if (!sdg) {
    return null;
  }

  return (
    <main className="py-20">
      <Container>
        <article className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <div className="relative h-[10rem] w-[10rem] rounded-md overflow-hidden">
              <Image
                src={urlFor(sdg.mainImage).url()}
                alt={sdg.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h1
              className={cn('text-4xl font-heading', sdg.colorScheme.heading)}
            >
              {sdg.title}
            </h1>
            <p className="w-full md:max-w-[80ch] text-gray-500 font-light">
              {sdg.description}
            </p>
          </div>

          {sdg.images && sdg.images.length > 0 && (
            <div className="mt-8">
              {/* <h2
                className={cn(
                  'text-2xl font-heading mb-6',
                  sdg.colorScheme.heading
                )}
              >
                Gallery
              </h2> */}


                <Gallery title="Gallery" media={sdg.images} />

              {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sdg.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden"
                  >
                    <Image
                      src={urlFor(image).url()}
                      alt={`${sdg.title} - Image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div> */}
            </div>
          )}

          <div className="mt-16">
            <h2
              className={cn(
                'text-2xl font-heading mb-6',
                sdg.colorScheme.heading
              )}
            >
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {!projects.length && (
                <div className="flex flex-col items-center justify-center p-5 col-span-full gap-2 min-h-[20rem]">
                  <h3 className={cn('text-lg', sdg.colorScheme.heading)}>
                    No projects yet
                  </h3>
                  <p className="text-sm text-gray-400">
                    Please check back later
                  </p>
                </div>
              )}

              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  title={project.title}
                  mainImage={project.mainImage.asset.url}
                  slug={project.slug.current}
                  description={project.description}
                />
              ))}
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}
