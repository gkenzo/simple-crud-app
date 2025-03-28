'use client';
import { BackButton, Header } from '@/commons';
import { UserDetailsForm } from '@/components';
import { use } from 'react';
import { ToastContainer } from 'react-toastify';

type UserDetailPageProps = {
  params: Promise<{ userId: string }>;
};

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const { userId } = use(params);

  return (
    <>
      <Header />
      <div className="flex flex-col mx-auto justify-center w-fit gap-5">
        <ToastContainer />
        <BackButton content="< Back to list" href="/" />
        <UserDetailsForm userId={userId} />
      </div>
    </>
  );
}
