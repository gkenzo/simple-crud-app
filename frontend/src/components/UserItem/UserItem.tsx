import { Button } from '@/commons';
import { User } from '@/domain';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const UserCard = ({ user }: { user: User }) => {
  const router = useRouter();

  return (
    <Link href={`/user/${user.id}`}>
      <div className="flex flex-col my-5 h-50 bg-gray-100 p-3 rounded-sm shadow-lg border-indigo-400 border min-50 transition duration-150 ease-in-out hover:shadow-2xl">
        <span>
          <b>Id:</b> {user.id}
        </span>
        <span>
          <b>Email:</b> {user.email}
        </span>
        <span>
          <b>Name:</b> {user.name}
        </span>
        <div className="flex-grow"></div>
        <div className="self-end">
          <Button
            type="button"
            text="View details"
            className="cursor-pointer p-3 bg-indigo-600 text-white rounded border w-fit my-3 transition duration-150 ease-in-out hover:bg-white hover:text-indigo-600 hover:border-indigo-600"
            onClick={() => router.push(`/user/${user.id}`)}
          />
        </div>
      </div>
    </Link>
  );
};
