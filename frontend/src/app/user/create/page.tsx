'use client';
import { BackButton, Header, Toaster } from '@/commons';
import { CreateUserForm } from '@/components';
import { CreateUserFormValues } from '@/core';
import { useUserInfo } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function CreateUserPage() {
  const { create } = useUserInfo();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: create,
  });

  const onSubmit = useCallback(
    async (values: CreateUserFormValues) => {
      const res = await (await mutation.mutateAsync(values)).json();

      if (res.ok) return router.push('/');

      toast.error(Toaster, {
        data: {
          content: 'Error while creating this user',
          title: 'Something went wrong',
        },
        progress: 0.8,
        ariaLabel: 'Error while creating this user',
        autoClose: false,
        theme: 'colored',
      });
    },
    [mutation, router],
  );

  return (
    <>
      <Header />
      <div className="flex flex-col mx-auto justify-center w-fit gap-5">
        <ToastContainer />
        <BackButton href="/" />
        <CreateUserForm onSubmit={onSubmit} />
      </div>
    </>
  );
}
