import { ToastContentProps } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

type ToasterProps = ToastContentProps<{ title: string; content: string }>;

export const Toaster = ({ data, toastProps }: ToasterProps) => {
  const isColored = toastProps.theme === 'colored';

  return (
    <div className="flex flex-col w-full">
      <h3
        className={twMerge(
          'text-sm font-semibold',
          isColored ? 'text-white' : 'text-zinc-800',
        )}
      >
        {data.title}
      </h3>
      <div className="flex items-center justify-between">
        <p className="text-sm">{data.content}</p>
      </div>
    </div>
  );
};
