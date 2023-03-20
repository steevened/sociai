import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div
      className={`app-shadow base-colors  rounded-md ${
        !className && 'p-4'
      } mb-5 ${className}`}
    >
      {children}
    </div>
  );
}
