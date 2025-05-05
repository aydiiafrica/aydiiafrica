'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from './common/Container';
import { NewsCard } from './common/NewsCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { client, News as NewsType, urlFor } from '../lib/sanity';

gsap.registerPlugin(ScrollTrigger);

const News = () => {
  const [news, setNews] = useState<NewsType[]>([]);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const fetchNews = async () => {
      const query = `*[_type == "news"] | order(publishedAt desc) [0...3] {
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, cardsRef.current], {
        opacity: 0,
        y: 50,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center+=100',
        onEnter: () => {
          gsap.to(headingRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          });
          gsap.to(cardsRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out',
          });
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gray-50 border-y border-gray-100"
    >
      <Container>
        <div ref={headingRef} className="text-left mb-12">
          <h2 className="text-4xl md:text-5xl font-heading mb-4">Latest News</h2>
          <p className="text-gray-500 font-light">
            Stay updated with our latest initiatives and community impact
            projects across Africa.
          </p>
        </div>
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {news.map((item) => (
            <NewsCard
              key={item._id}
              title={item.title}
              featuredImage={urlFor(item.featuredImage).url()}
              slug={item.slug.current}
              description={item.description}
              publishedAt={item.publishedAt}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default News;
