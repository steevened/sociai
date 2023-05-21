import Image from 'next/image';
import { FC } from 'react';

interface CreateFormProps {
  croppedImage: string;
  caption: string;
  setCaption: (caption: string) => void;
  onSumbit: () => void;
}

const CreateForm: FC<CreateFormProps> = ({
  croppedImage,
  setCaption,
  caption,
  onSumbit,
}) => {
  return (
    <div className="w-full p-5 ">
      <div className="flex gap-3">
        <div className="w-1/4">
          <Image
            className="w-full"
            src={croppedImage}
            alt="image"
            width={1000}
            height={1000}
          />
        </div>
        <div className="w-full ">
          <form className="h-full">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full h-full p-2 bg-black md:min-h-full shadow-app-shadow focus:outline-none"
              placeholder="Write a caption"
            />
          </form>
        </div>
      </div>
      <div className="mt-5">
        <button
          onClick={onSumbit}
          className="w-full px-4 py-2 duration-200 rounded-md bg-sky-700 hover:bg-blue-500"
        >
          <span className="font-medium text-md">Post</span>
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
