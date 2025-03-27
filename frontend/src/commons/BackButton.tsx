import Link from 'next/link';

interface BackButtonProps {
  href: string;
  content?: string;
}

export const BackButton = ({ href, content }: BackButtonProps) => {
  return (
    <Link
      href={href}
      className="mx-2 bg-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-white hover:bg-gray-100 rounded px-2 py-2 text-sm w-fit"
    >
      {content ? content : '< Go Back'}{' '}
    </Link>
  );
};
