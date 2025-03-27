'use client';
import { Loading, Error, BackButton, Header } from '@/commons';
import { UserDetailsForm } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { use } from 'react';
import { ToastContainer } from 'react-toastify';

type UserDetailPageProps = {
  params: Promise<{ userId: string }>;
};

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const { userId } = use(params);
  const { data, error, isPending, isLoading } = useQuery({
    queryKey: ['get-user'],
    queryFn: async () => {
      const res = await fetch(`/api/user/${userId}`);

      return await res.json();
    },
    refetchOnMount: 'always',
  });

  if (isPending || isLoading) return <Loading />;

  if (error) return <Error message={error?.message} />;

  return (
    <>
      <Header />
      <div className="flex flex-col mx-auto justify-center w-fit gap-5">
        <ToastContainer />
        <BackButton href="/" />
        <UserDetailsForm id={data.id} email={data.email} name={data.name} />
      </div>
    </>
  );
}
