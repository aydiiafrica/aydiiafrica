/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Container } from '@/app/components/common/Container';
import { client, urlFor } from '@/app/lib/sanity';
import { TeamMember as TeamMemberType } from '@/types';
import { PortableText } from 'next-sanity';
import { use, useEffect, useState } from 'react';
import Image from 'next/image'

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

const TeamMember = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [teamMember, setTeamMember] = useState<TeamMemberType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = use(params);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const query = `*[_type == "teamMember" && slug.current == $slug][0] {
            fullName,
            avatar,
            content,
            role
          }`;
        const result = await client.fetch(query, { slug });
        setTeamMember(result);
      } catch (error) {
        console.error('Error fetching user:', error);
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

  if (!teamMember) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  return (
    <main>
      <Container>
        <div className="max-w-3xl mx-auto py-10">
          <div className="flex items-center justify-center flex-col gap-8 text-center mb-16">
            <figure className="h-[15rem] w-[15rem] overflow-hidden rounded-full">
              <Image
                src={urlFor(teamMember.avatar).url()}
                alt={teamMember.fullName}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </figure>

            <article className='space-y-3'>
              <h4 className="font-light text-4xl">{teamMember.fullName}</h4>
              <p className="text-gray-500 font-light">{teamMember.role}</p>
            </article>
          </div>

          <div className="prose prose-lg max-w-none">
            <PortableText value={teamMember.content} components={components} />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default TeamMember;
