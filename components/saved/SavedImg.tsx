import { SavePost } from '@/pages/saved';
import Image from 'next/image';
import { CommentOutlined, StarOutlined } from '../icons/Svg';

const SavedImg = ({ id, comments, likes, imgLink }: SavePost) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden aspect-square group">
      <Image src={imgLink} alt="saved post" width={200} height={200} />
      <div className="absolute inset-0 items-center justify-center hidden cursor-pointer bg-black/50 group-hover:flex">
        <div className="flex flex-col items-center gap-1 font-semibold">
          <div className="flex gap-2">
            <StarOutlined /> <span>{likes}</span>
          </div>
          <div className="flex gap-2">
            <CommentOutlined /> <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedImg;
