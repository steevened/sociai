import Image from 'next/image';
import { FC } from 'react';

interface ImagecontainerProps {
  image: string;
  caption?: string;
}

const Imagecontainer: FC<ImagecontainerProps> = ({ image, caption }) => {
  return (
    <Image
      width={2000}
      height={2000}
      src={image}
      alt={caption || 'image post'}
    />
  );
};

export default Imagecontainer;
