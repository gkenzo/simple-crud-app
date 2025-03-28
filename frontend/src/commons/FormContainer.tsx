import { Form } from 'formik';
import { ReactElement } from 'react';

interface FormContainerProps {
  title: string;
  children: ReactElement;
}
export const FormContainer = ({ title, children }: FormContainerProps) => {
  return (
    <Form className="flex flex-col w-120 rounded-xl border gap-4 max-w-sm overflow-hidden shadow-lg">
      <div className="px-6 py-4 bg-indigo-900 text-white">
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
      {children}
    </Form>
  );
};
