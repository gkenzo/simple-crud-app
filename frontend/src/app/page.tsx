'use client';

import { Header, Loading, Error } from '@/commons';
import { UsersList } from '@/components';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data, error, isPending } = useQuery({
    queryKey: ['list-users'],
    queryFn: async () => {
      const res = await fetch(`/api/users`);

      return await res.json();
    },
  });

  if (isPending) return <Loading />;

  if (error) return <Error message={error?.message} />;

  return (
    <>
      <Header />
      <UsersList users={data} />
    </>
  );
}
