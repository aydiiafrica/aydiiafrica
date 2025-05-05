import Image from 'next/image';
import Link from 'next/link';

interface EventCardProps {
  title: string;
  images: string[];
  slug: string;
  date: string;
}

export const EventCard = ({ title, images, slug, date }: EventCardProps) => {
  return (
    <Link
      href={`/events/${slug}`}
      className="block overflow-hidden rounded-lg border border-gray-200 transition-all duration-300"
    >
      {images.length > 0 && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-xl font-semibold line-clamp-2 text-gray-900 hover:text-primary transition-colors">
          {title}
        </h3>
        <time className="text-sm text-gray-500 mt-1 block">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>
    </Link>
  );
};
