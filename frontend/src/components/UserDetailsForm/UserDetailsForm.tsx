import { Button, Input, Toaster } from '@/commons';
import { UpdateUserSchema } from '@/core';
import { User } from '@/domain';
import { useUserInfo } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

type UserDetailsProps = User;

interface FormValues {
  id: string;
  email: string;
  name: string;
}

export const UserDetailsForm = (props: UserDetailsProps) => {
  const { id, email, name } = props;
  const { update, remove } = useUserInfo();
  const router = useRouter();

  const mutationUpdate = useMutation({
    mutationFn: update,
    onSuccess: () => {
      toast(Toaster, {
        data: {
          content: 'User updated',
          title: 'Success!',
        },
        progress: 0.8,
        ariaLabel: 'User updated!',
        autoClose: false,
      });
    },
    onError: () => {
      toast.error(Toaster, {
        data: {
          content: 'Error while updating this user',
          title: 'Something went wrong',
        },
        progress: 0.8,
        ariaLabel: 'Error while updating this user',
        autoClose: false,
        theme: 'colored',
      });
    },
  });

  const mutationRemove = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      router.push('/');
    },
    onError: () => {
      toast.error(Toaster, {
        data: {
          content: 'Error while deleting this user',
          title: 'Something went wrong',
        },
        progress: 0.8,
        ariaLabel: 'Error while deleting this user',
        autoClose: false,
        theme: 'colored',
      });
    },
  });

  const onSubmit = useCallback(
    async (values: FormValues) => {
      mutationUpdate.mutate(values);
    },
    [mutationUpdate],
  );

  const onRemove = useCallback(
    async (id: string) => {
      mutationRemove.mutate(id);
    },
    [mutationRemove],
  );

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        id,
        email,
        name,
      }}
      validationSchema={UpdateUserSchema}
      enableReinitialize
    >
      <Form className="flex flex-col w-75 rounded-xl border gap-4 max-w-sm overflow-hidden shadow-lg">
        <div className="px-6 py-4 bg-slate-800 text-white">
          <h1 className="text-lg font-bold">User details</h1>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <Field
            name="id"
            disabled={true}
            as={Input}
            className="bg-gray-200 cursor-not-allowed"
            label="Id"
          />
          <Field
            type="email"
            name="email"
            placeholder="Email"
            as={Input}
            label="Email"
          />
          <Field name="name" placeholder="Name" as={Input} label="Name" />
          <Button
            text="Submit"
            type="submit"
            className="bg-transparent hover:bg-indigo-600 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded cursor-pointer mt-2 transition ease-in-out duration-200"
          />
          <Button
            text="Remove"
            type="button"
            onClick={() => onRemove(id)}
            className="bg-transparent text-red-400 hover:text-red-700 font-semibold py-2 px-4 cursor-pointer mt-2 transition ease-in-out duration-200"
          />
        </div>
      </Form>
    </Formik>
  );
};
