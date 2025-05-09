import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  mainImage: string;
  slug: string;
  description: string;
}

export function ProjectCard({
  title,
  mainImage,
  slug,
  description,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="group p-4 rounded-md border border-gray-200">
      <article className="bg-white rounded-lg overflow-hidden transition-all duration-200 space-y-4">
        <div className="relative h-48 w-full rounded-md overflow-hidden">
          <Image src={mainImage} alt={title} fill className="w-full h-full object-cover" />
        </div>
        <div className="">
          <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 line-clamp-2">{description}</p>
        </div>
      </article>
    </Link>
  );
}
