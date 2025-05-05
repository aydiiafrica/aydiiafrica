/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/app/components/common/Container';
import { client, News, urlFor } from '@/app/lib/sanity';
import { PortableText } from '@portabletext/react';
import { use } from 'react';

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
    h4: ({ children }: any) => (
      <h4 className="text-xl font-heading mb-4 mt-6">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2">{children}</ol>
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
            <p className="text-sm text-gray-500 mt-2 text-center">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};

export default function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [article, setArticle] = useState<News | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const query = `*[_type == "news" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          description,
          featuredImage,
          content,
          publishedAt
        }`;
        const result = await client.fetch(query, { slug });
        setArticle(result);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Article not found</p>
      </div>
    );
  }

  return (
    <article className="py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-heading mb-6">
              {article.title}
            </h1>
            <p className="text-gray-500 mb-8">{article.description}</p>
            <time className="text-sm text-gray-400">
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          {article.featuredImage && (
            <div className="mb-12 rounded-lg overflow-hidden">
              <img
                src={urlFor(article.featuredImage).url()}
                alt={article.title}
                className="w-full"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <PortableText value={article.content} components={components} />
          </div>
        </div>
      </Container>
    </article>
  );
}
