'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Container } from './Container';
import Button from './Button';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { cn } from '@/app/lib/cn';

const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Join Us', href: '/join' },
  { name: 'News', href: '/news' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isScrolled, isScrolling } = useScrollPosition();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-300
        ${
          isScrolled
            ? 'translate-y-0 shadow-lg bg-primary'
            : isScrolling
            ? '-translate-y-full border-transparent'
            : 'relative top-0 left-0 w-full translate-y-0 bg-primary border border-primary-100'
        }
      `}
    >
      <Container>
        <div className="flex items-center justify-between py-5 md:py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src={'/logo-white.png'}
              alt="Aydiiafrica Logo"
              className="h-24 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-9">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-md font-normal transition-colors text-white',
                  pathname === item.href ? 'underlined' : 'underline-animate'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button href="/join" variant={'white'} size="lg">
              <span>Donate Now</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-sm md:hidden p-2 text-white border border-white transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-y-auto ${
            isMobileMenuOpen ? 'min-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="border-gray-200 flex gap-4 flex-col items-start justify-center">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  `block text-xl font-normal transition-colors text-white`,
                  pathname === item.href ? '' : ''
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button
              href="/donate"
              variant={'white-alt'}
              size="lg"
              className="flex items-center gap-4 w-full mt-5"
            >
              <span>Donate</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-hand-heart-icon lucide-hand-heart"
              >
                <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
                <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
                <path d="m2 15 6 6" />
                <path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" />
              </svg>
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
