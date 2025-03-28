import { User } from '@/domain';
import { UserCard } from '@/components';
import { Button, Loading, Error } from '@/commons';
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

const EmptyUserList = () => {
  const router = useRouter();
  return (
    <div className="max-w-screen-xl w-screen flex flex-col items-center justify-center h-84">
      <span>No user found</span>
      <Button
        type="button"
        text="Create user"
        className="cursor-pointer p-3 bg-slate-800 text-white rounded border w-fit my-3 transition duration-150 ease-in-out hover:bg-white hover:text-black"
        onClick={() => router.push(`/user/create`)}
      />
    </div>
  );
};

export const UsersList = () => {
  const { list } = useUserInfo();
  const { data, error, isPending } = useQuery<{ items: User[] }, Error>({
    queryKey: ['list-users'],
    queryFn: list,
  });

  if (isPending) return <Loading />;

  if (error) return <Error message={error?.message} />;

  const { items: users } = data;
  const total = users.length;

  return (
    <div className="mx-auto max-w-screen-xl flex flex-col">
      {!!total && <span className="text-right">Total users: {total}</span>}
      <div className="grid grid-cols-1 gap-8 px-1 md:grid-cols-2 lg:grid-cols-3">
        {users ? (
          users.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <EmptyUserList />
        )}
      </div>
    </div>
  );
};
