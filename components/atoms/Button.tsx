import { FC, PropsWithChildren } from 'react';

interface ButtonProps {
  color?: 'primary' | 'secondary';
  variant?: 'normal' | 'outline' | 'text';
  className?: string;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  color = 'primary',
  variant = 'normal',
  className = '',
}) => {
  const styles = {
    normal: {
      primary: 'bg-sky-700 hover:bg-blue-500',
      secondary: 'text-black bg-gray-300 hover:bg-gray-400',
    },
    outline: {
      primary: 'text-white border border-white hover:bg-white hover:text-black',
      secondary: 'shadow-app-shadow-2 hover:bg-gray-300 hover:text-black',
    },
    text: {
      primary: 'text-white hover:bg-white hover:text-black',
      secondary: 'hover:bg-gray-900',
    },
  };

  return (
    <button
      className={`px-4 py-2 duration-200 rounded-md text-xs md:text-sm ${styles[variant][color]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
