import { Input, Button } from '@/commons';
import { CreateUserFormValues, CreateUserSchema } from '@/core';
import { Formik, Form, Field } from 'formik';

interface CreateUserFormProps {
  onSubmit: (values: CreateUserFormValues) => void;
}

export const CreateUserForm = ({ onSubmit }: CreateUserFormProps) => {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        email: '',
        name: '',
      }}
      validationSchema={CreateUserSchema}
    >
      <Form className="flex flex-col w-75 rounded-xl border gap-4 max-w-sm overflow-hidden shadow-lg">
        <div className="px-6 py-4 bg-slate-800 text-white">
          <h1 className="text-lg font-bold">Create user</h1>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <Field
            type="email"
            name="email"
            placeholder="New user email"
            as={Input}
            label="Email"
          />
          <Field
            name="name"
            placeholder="New user name"
            as={Input}
            label="Name"
          />
          <Button
            text="Submit"
            type="submit"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer mt-2"
          />
        </div>
      </Form>
    </Formik>
  );
};
