import { HTMLAttributes, ReactNode } from 'react';

export interface DivProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
