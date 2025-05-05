import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  mainImage: string;
  slug: string;
  category: string;
  description: string;
}

export function ProjectCard({
  title,
  mainImage,
  slug,
  category,
  description,
}: ProjectCardProps) {
  const categoryColors: { [key: string]: string } = {
    'climate-action': 'bg-green-100 text-green-800',
    'peace-justice-strong-institutions': 'bg-blue-100 text-blue-800',
    'gender-equality': 'bg-red-100 text-red-800',
  };

  const categoryTitles: { [key: string]: string } = {
    'climate-action': 'Climate Action',
    'peace-justice-strong-institutions':
      'Peace, Justice and Strong Institutions',
    'gender-equality': 'Gender Equality',
  };

  return (
    <Link href={`/projects/${slug}`} className="group">
      <article className="bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-200 ">
        <div className="relative h-48 w-full">
          <Image src={mainImage} alt={title} fill className="object-cover" />
        </div>
        <div className="p-6">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${categoryColors[category]}`}
          >
            {categoryTitles[category]}
          </span>
          <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 line-clamp-2">{description}</p>
        </div>
      </article>
    </Link>
  );
}
