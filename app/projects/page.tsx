'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/app/components/common/Container';
import { ProjectCard } from '@/app/components/common/ProjectCard';
import { client, urlFor } from '@/app/lib/sanity';

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  description: string;
  mainImage: any;
}

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const query = `*[_type == "project"] {
        _id,
        title,
        slug,
        category,
        description,
        mainImage
      }`;
      const result = await client.fetch(query);
      setProjects(result);
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-20 md:py-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading mb-6">Our Projects</h1>
          <p className="text-gray-500">
            Explore our impactful projects aligned with the UN Sustainable Development Goals.
          </p>
        </div>

        <div className="mb-12 max-w-md mx-auto">
          <input
            type="search"
            placeholder="Search projects"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              mainImage={urlFor(project.mainImage).url()}
              slug={project.slug.current}
              category={project.category}
              description={project.description}
            />
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-8">
              No projects found matching your search.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}