import Link from 'next/link';
import { Container } from './components/common/Container';

export default function NotFound() {
  return (
    <div className="">
      <Container>
        <div className="min-h-screen md:min-h-[40rem] py-20 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl md:text-5xl font-heading mb-8">
            Oops page not found
          </h2>
          <p className="text-gray-500 font-light mb-8 max-w-[60ch]">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. You might want
            to check if you typed the address correctly.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </Container>
    </div>
  );
}
