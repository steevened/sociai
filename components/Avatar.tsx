import Image from 'next/image';
import { HtmlHTMLAttributes } from 'react';
import avatar from '../public/avatar.jpg';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
  imageUrl?: string;
}

export default function Avatar({ className, imageUrl }: Props) {
  return (
    <div
      className={`${
        !className && 'w-12'
      } rounded-full overflow-hidden ${className}`}
    >
      <Image src={imageUrl || avatar} alt="avatar" width={1000} height={1000} />
    </div>
  );
}
