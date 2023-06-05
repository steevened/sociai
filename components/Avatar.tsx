import Image from 'next/image';
import { FC, HtmlHTMLAttributes } from 'react';
import avatar from '../public/avatar.jpg';
import { useRouter } from 'next/router';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  imageUrl?: string;
  userId: string;
}

const Avatar: FC<Props> = ({ className, imageUrl, userId }: Props) => {
  const router = useRouter();
  return (
    <div
      role="button"
      onClick={() => router.push(`/profile/${userId}`)}
      className={`${
        !className && 'w-12'
      } rounded-full overflow-hidden ${className}`}
    >
      <Image src={imageUrl || avatar} alt="avatar" width={1000} height={1000} />
    </div>
  );
};

export default Avatar;
