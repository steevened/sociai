import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div
      className={`bg-white shadow-md shadow-gray-300 rounded-md ${
        !className && 'p-4'
      } mb-5 ${className}`}
    >
      {children}
    </div>
  );
}
