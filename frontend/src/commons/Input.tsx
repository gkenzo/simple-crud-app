import { ErrorMessage, Field } from 'formik';
import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const Input = (props: InputProps) => {
  const { name, label, className, ...rest } = props;
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
      >
        {label}
      </label>
      <Field
        name={name}
        {...rest}
        className={twMerge(
          'block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent',
          className,
        )}
      />
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
};
