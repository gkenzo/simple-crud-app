'use client';
import { BackButton, Header } from '@/commons';
import { CreateUserForm } from '@/components';
import { ToastContainer } from 'react-toastify';

export default function CreateUserPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col mx-auto justify-center w-fit gap-5">
        <ToastContainer />
        <BackButton content="< Back to list" href="/" />
        <CreateUserForm />
      </div>
    </>
  );
}
