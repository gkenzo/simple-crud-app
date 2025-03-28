import { Button, Input, Loading, Toaster, Error, FormContainer } from '@/commons';
import { UpdateUserSchema } from '@/core';
import { User } from '@/domain';
import { useUserInfo } from '@/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Field, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const UserDetailsForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const { find, update, remove } = useUserInfo();
  const { data, error, isPending } = useQuery<User, Error>({
    queryKey: ['get-user', userId],
    queryFn: () => find(userId),
    enabled: !!userId,
  });

  const {mutate: updateMutation} = useMutation({
    mutationFn: update,
    onSuccess: () => {
      toast(Toaster, {
        data: {
          content: 'User updated successfully',
          title: 'Success!',
        },
        progress: 0.8,
        ariaLabel: 'User updated successfully!',
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

  const {mutate: removeMutation} = useMutation({
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

  if (isPending) return <Loading />;

  if (error) return <Error message={error?.message} />;

  const { id, email, name } = data;

  return (
    <Formik
      onSubmit={updateMutation}
      initialValues={{
        id,
        email,
        name,
      }}
      validationSchema={UpdateUserSchema}
      enableReinitialize
    >
      <FormContainer title="User details">
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
            placeholder="john.doe@example.com"
            as={Input}
            label="Email"
          />
          <Field name="name" placeholder="John Doe" as={Input} label="Name" />
          <Button
            text="Submit"
            type="submit"
            className="bg-transparent hover:bg-indigo-600 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded cursor-pointer mt-2 transition ease-in-out duration-200"
          />
          <Button
            text="Remove"
            type="button"
            onClick={() => removeMutation(id)}
            className="bg-transparent text-red-400 hover:text-red-700 font-semibold py-2 px-4 cursor-pointer mt-2 transition ease-in-out duration-200"
          />
        </div>
      </FormContainer>
    </Formik>
  );
};
