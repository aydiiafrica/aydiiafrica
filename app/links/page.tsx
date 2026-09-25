import { Container } from '../components/common/Container';
import Link from 'next/link';

const LINKS = [
  {
    name: 'Website',
    href: 'https://www.aydiiafrica.org',
    detail: 'www.aydiiafrica.org',
  },
  {
    name: 'Partner With Us',
    href: '/partner',
    detail: 'Institutional partnerships',
  },
  {
    name: 'Donate',
    href: '/donate',
    detail: 'Support the work',
  },
  {
    name: 'Join / Volunteer',
    href: '/join',
    detail: 'Get involved',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/aydiiafrica/',
    detail: 'AYDii Africa',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/aydii_africa',
    detail: '@aydii_africa',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/16ugtY4bQy/',
    detail: 'AYDii Africa',
  },
  {
    name: 'Email',
    href: 'mailto:info@aydiiafrica.org',
    detail: 'info@aydiiafrica.org',
  },
  {
    name: 'Call / WhatsApp',
    href: 'tel:+2348037369474',
    detail: '+234 803 736 9474',
  },
];

const LinksPage = () => {
  return (
    <main>
      <article className="bg-primary text-white text-center h-[15rem] md:h-[20rem] mb-16 py-20 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-light md:text-5xl font-heading mb-6">
          Connect With AYDii Africa
        </h1>
        <p className="text-white font-light max-w-xl">
          Official links for Advocacy for Youth Women and Girls Development
          Impact Initiative for Africa.
        </p>
      </article>

      <section className="pb-20">
        <Container>
          <div className="max-w-xl mx-auto space-y-4">
            {LINKS.map((link) => {
              const isExternal = link.href.startsWith('http');
              const className =
                'block w-full border border-gray-200 hover:border-primary rounded-md p-5 transition-all duration-300';

              const inner = (
                <>
                  <p className="font-light text-2xl">{link.name}</p>
                  <p className="text-gray-500 font-light">{link.detail}</p>
                </>
              );

              if (link.href.startsWith('mailto:') || link.href.startsWith('tel:')) {
                return (
                  <a key={link.name} href={link.href} className={className}>
                    {inner}
                  </a>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={className}
                  {...(isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
};

export default LinksPage;
