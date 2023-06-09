import { FC, HtmlHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'danger';
  variant?: 'normal' | 'outline' | 'text';
  className?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  color = 'primary',
  variant = 'normal',
  className = '',
  disabled = false,
  ...restProps
}) => {
  const styles = {
    normal: {
      primary: 'bg-sky-700 hover:bg-blue-500',
      secondary: 'text-black bg-gray-300 hover:bg-gray-400',
      danger: 'text-white bg-red-500 hover:bg-red-600',
    },
    outline: {
      primary: 'text-white border border-white hover:bg-white hover:text-black',
      secondary: 'shadow-app-shadow-2 hover:bg-gray-300 hover:text-black',
      danger:
        'text-red-500 border border-red-500 hover:bg-red-500 hover:text-white',
    },
    text: {
      primary: 'text-white hover:bg-white hover:text-black',
      secondary: 'hover:bg-gray-900',
      danger: 'text-red-500 hover:bg-red-500 hover:text-white',
    },
  };

  return (
    <button
      {...restProps}
      disabled={disabled}
      className={`px-4 py-2 duration-200 rounded-md text-xs md:text-sm disabled:pointer-events-none disabled:opacity-50 ${styles[variant][color]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
