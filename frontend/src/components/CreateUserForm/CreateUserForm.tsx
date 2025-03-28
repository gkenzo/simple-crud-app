import { Input, Button, Toaster, FormContainer } from '@/commons';
import { CreateUserSchema } from '@/core';
import { useUserInfo } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { Formik, Field } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const CreateUserForm = () => {
  const { create } = useUserInfo();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: create,
    onSuccess: () => router.push('/'),
    onError: () =>
      toast.error(Toaster, {
        data: {
          content: 'Error while creating this user',
          title: 'Something went wrong',
        },
        progress: 0.8,
        ariaLabel: 'Error while creating this user',
        autoClose: false,
        theme: 'colored',
      }),
  });

  return (
    <Formik
      onSubmit={(values) => mutate(values)}
      initialValues={{
        email: '',
        name: '',
      }}
      validationSchema={CreateUserSchema}
    >
      <FormContainer title="Create user">
        <div className="p-5 flex flex-col gap-4">
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
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer mt-2"
          />
        </div>
      </FormContainer>
    </Formik>
  );
};
