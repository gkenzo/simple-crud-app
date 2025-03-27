import { MouseEventHandler } from 'react';

interface ButtonProps {
  text: string;
  type: 'submit' | 'reset' | 'button' | undefined;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Button = (props: ButtonProps) => {
  const { text, type, className, onClick } = props;

  return (
    <button type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
};
