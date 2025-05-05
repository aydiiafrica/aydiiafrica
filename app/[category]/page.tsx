'use client';

import { useState, useEffect } from 'react';
import { Container } from '../components/common/Container';
import { ProjectCard } from '@/app/components/common/ProjectCard';
import { client } from '@/lib/sanity';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/cn';
import { use } from 'react';

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
}

const sdgItems = [
  {
    id: 13,
    title: 'Climate Action',
    slug: 'climate-action',
    subtitle: 'Take urgent action to combat climate change and its impacts',
    description:
      'We raise awareness on climate-related loss and damage affecting vulnerable communities, especially women and girls. Our advocacy promotes climate justice by supporting local voices in policy dialogues and community-based responses to floods, droughts, displacement, and environmental degradation.',
    image: '/sdg/sdg13.png',
    color: 'border-green-500  transition-all duration-200',
    p: 'text-gray-500',
    heading: 'text-green-900',
  },
  {
    id: 16,
    title: 'Peace, Justice and Strong Institutions',
    slug: 'peace-justice-strong-institutions',
    subtitle:
      'Promote peaceful and inclusive societies, provide access to justice, and build effective, accountable institutions',
    description:
      "AYDII Africa works to strengthen youth and women's participation in governance and peacebuilding. From anti-trafficking campaigns to human rights education and institutional accountability, we help create just, inclusive communities with strong civic voices.",
    image: '/sdg/sdg16.png',
    color: 'border-blue-500 transition-all duration-200',
    p: 'text-gray-500',
    heading: 'text-blue-900',
  },
  {
    id: 5,
    title: 'Gender Equality',
    slug: 'gender-equality',
    subtitle: 'Achieve gender equality and empower all women and girls',
    description:
      'Gender equity is at the heart of all our programs. We empower women and girls through education, menstrual health advocacy, economic inclusion, and leadership development, ensuring they are active agents of change in their communities.',
    image: '/sdg/sdg5.png',
    color: 'border-red-500 transition-all duration-200',
    p: 'text-gray-500',
    heading: 'text-red-900',
  },
];

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const { category } = use(params);

  const sdg = sdgItems.find(
    (i) => i.slug.toLowerCase() === category.toLowerCase()
  );

  // Redirect to home if category not found
  useEffect(() => {
    if (!sdg) {
      router.push('/');
    }
  }, [sdg, router]);

  useEffect(() => {
    const fetchProjects = async () => {
      const query = `*[_type == "project" && category == $category] {
        _id,
        title,
        slug,
        category,
        description,
        mainImage {
          asset -> {
            url
          }
        }
      }`;
      const result = await client.fetch(query, { category });
      setProjects(result);
    };

    if (sdg) {
      fetchProjects();
    }
  }, [category, sdg]);

  // If category not found, return null as we're redirecting
  if (!sdg) {
    return null;
  }

  return (
    <main className="py-20">
      <Container>
        <article className="flex flex-col gap-10 items-start justify-center">
          {sdg.image && (
            <div className="relative h-[10rem] w-[10rem] rounded-md overflow-hidden">
              <Image
                src={sdg.image}
                alt={`SDG ${sdg.id} - ${sdg.title}`}
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
          <h1 className={`text-4xl font-heading`}>{sdg.title}</h1>
          <p className="w-full md:max-w-[80ch] text-gray-500 font-light">
            {sdg.description}
          </p>
        </article>

        <div className="mt-18 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!Boolean(projects.length) && (
            <div className="flex flex-col items-center justify-center p-5 col-span-full gap-2 min-h-[20rem]">
              <h1 className={cn(`text-lg ${sdg.heading}`)}>No projects yet</h1>
              <p className="text-sm text-gray-400">Please check back later</p>
            </div>
          )}

          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              mainImage={project.mainImage.asset.url}
              slug={project.slug.current}
              category={project.category}
              description={project.description}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}
