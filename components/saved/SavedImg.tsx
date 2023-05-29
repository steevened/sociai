import { SavePost } from '@/pages/saved';
import Image from 'next/image';
import { CommentIcon, LikesIconIn } from '../icons/Svg';
import { FC } from 'react';
import { useRouter } from 'next/router';

interface Props {
  comments: number;
  likes: number;
  image: string;
  id: string;
}

const SavedImg: FC<Props> = ({ comments, likes, image, id }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/post/${id}`)}
      className="relative flex items-center justify-center w-full h-full overflow-hidden aspect-square group "
    >
      <Image
        src={image}
        alt="saved post"
        width={1000}
        height={1000}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 items-center justify-center hidden cursor-pointer bg-black/50 group-hover:flex">
        <div className="flex flex-col items-center gap-1 font-semibold">
          <div className="flex gap-2">
            <LikesIconIn /> <span>{likes}</span>
          </div>
          <div className="flex gap-2">
            <CommentIcon /> <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedImg;
