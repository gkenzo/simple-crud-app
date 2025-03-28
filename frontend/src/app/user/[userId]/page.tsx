'use client';
import { Loading, Error, BackButton, Header } from '@/commons';
import { UserDetailsForm } from '@/components';
import { User } from '@/domain';
import { useUserInfo } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { use } from 'react';
import { ToastContainer } from 'react-toastify';

type UserDetailPageProps = {
  params: Promise<{ userId: string }>;
};

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const { userId } = use(params);
  const { find } = useUserInfo();
  const { data, error, isPending } = useQuery<User, Error>({
    queryKey: ['get-user', userId],
    queryFn: () => find(userId),
    enabled: !!userId,
  });

  if (isPending) return <Loading />;

  if (error) return <Error message={error?.message} />;

  return (
    <>
      <Header />
      <div className="flex flex-col mx-auto justify-center w-fit gap-5">
        <ToastContainer />
        <BackButton href="/" />
        <UserDetailsForm id={data?.id} email={data?.email} name={data?.name} />
      </div>
    </>
  );
}
