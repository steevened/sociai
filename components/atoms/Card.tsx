import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div className={`shadow-app-shadow rounded-md ${className}`}>
      {children}
    </div>
  );
}
