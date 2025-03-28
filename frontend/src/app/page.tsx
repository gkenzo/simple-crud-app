'use client';

import { Header, Loading, Error } from '@/commons';
import { UsersList } from '@/components';
import { User } from '@/domain';
import { useUserInfo } from '@/hooks';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { list } = useUserInfo();
  const { data, error, isPending } = useQuery<{ items: User[] }, Error>({
    queryKey: ['list-users'],
    queryFn: list,
  });

  if (isPending) return <Loading />;

  if (error) return <Error message={error?.message} />;

  return (
    <>
      <Header />
      <UsersList users={data?.items} total={data?.items?.length} />
    </>
  );
}
