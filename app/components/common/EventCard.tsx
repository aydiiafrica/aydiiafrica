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
      className="h-[20rem] relative block overflow-hidden rounded-lg border border-gray-200 transition-all duration-300"
    >
      {images.length > 0 && (
     
          <Image
            src={images[0]}
            alt={title}
            fill
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
      
      )}

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-end text-left text-white bg-black/50 p-6">
        <h3 className="text-xl font-semibold line-clamp-2 hover:text-primary transition-colors">
          {title}
        </h3>
        <time className="text-sm mt-2 block">
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
