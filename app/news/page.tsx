'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/app/components/common/Container';
import { NewsCard } from '@/app/components/common/NewsCard';
import { client, News, urlFor } from '@/app/lib/sanity';

export default function NewsListPage() {
  const [news, setNews] = useState<News[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      const query = `*[_type == "news"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        description,
        featuredImage,
        publishedAt
      }`;
      const result = await client.fetch(query);
      setNews(result);
    };

    fetchNews();
  }, []);

  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-20 md:py-32">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading mb-6">Latest News</h1>
          <p className="text-gray-500">
            Stay updated with our latest initiatives and impact stories from
            across Africa.
          </p>
        </div>

        <div className="mb-12 max-w-md mx-auto">
          <input
            type="search"
            placeholder="Search news"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <NewsCard
              key={item._id}
              title={item.title}
              featuredImage={urlFor(item.featuredImage).url()}
              slug={item.slug.current}
              description={item.description}
              publishedAt={item.publishedAt}
            />
          ))}
          {filteredNews.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-8">
              No news found matching your search.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
