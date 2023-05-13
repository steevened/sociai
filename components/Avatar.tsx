import Image from 'next/image';
import Link from 'next/link';
import { ComponentPropsWithoutRef, HtmlHTMLAttributes } from 'react';
import avatar from '../public/avatar.jpeg';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
  imageUrl: string;
}

export default function Avatar({ className, imageUrl }: Props) {
  return (
    <div
      className={`${
        !className && 'w-12'
      } rounded-full overflow-hidden ${className}`}
    >
      <Image src={imageUrl} alt="avatar" width={100} height={100} />
    </div>
  );
}
