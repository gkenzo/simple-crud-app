import Link from 'next/link';

const HeaderItem = ({ message, href }: { message: string; href: string }) => {
  return (
    <li>
      <Link
        className="text-white transition hover:text-gray-300 font-bold"
        href={href}
      >
        {message}
      </Link>
    </li>
  );
};

export const Header = () => {
  return (
    <header className="bg-indigo-900 mb-5">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <HeaderItem message="List users" href={'/'} />
              <HeaderItem message="Create user" href={'/user/create'} />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
