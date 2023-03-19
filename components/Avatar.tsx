import Image from 'next/image';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';
import avatar from '../public/avatar.jpeg';

interface Props extends ComponentPropsWithoutRef<'div'> {
  className?: string;
}

export default function Avatar({ className }: Props) {
  return (
    <div className={`w-12 rounded-full overflow-hidden ${className}`}>
      <Image src={avatar} alt="avatar" />
    </div>
  );
}
