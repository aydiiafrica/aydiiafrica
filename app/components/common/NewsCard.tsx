import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  title: string;
  featuredImage: string;
  slug: string;
  description: string;
  publishedAt?: string;
}

export const NewsCard = ({
  title,
  featuredImage,
  slug,
  description,
  publishedAt,
}: NewsCardProps) => {
  return (
    <Link
      href={`/news/${slug}`}
      className="block overflow-hidden rounded-lg border border-gray-200 transition-all duration-300 group"
    >
      <div className="space-y-4 p-4">
        <div className="relative h-48 w-full overflow-hidden rounded-md">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          {publishedAt && (
            <time className="text-sm text-gray-500 mb-2 block">
              {new Date(publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          <p className="text-gray-500 font-light line-clamp-3">{description}</p>
        </div>
      </div>
    </Link>
  );
};
