import { ChangeEvent, FC } from 'react';
import { CreatePostLogo } from '../icons/Svg';

interface InputFileProps {
  onFileChange: (e: ChangeEvent) => void;
}

const InputFile: FC<InputFileProps> = ({ onFileChange }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <CreatePostLogo />
      <div className="mt-5">
        <label
          htmlFor="picture"
          className="px-4 py-2 duration-200 rounded-md bg-sky-700 hover:bg-blue-500"
          role="button"
        >
          <input
            type="file"
            className="hidden appearance-none"
            id="picture"
            accept="image/*"
            onChange={onFileChange}
          />
          <span className="font-medium text-md">Upload Picture</span>
        </label>
      </div>
    </div>
  );
};

export default InputFile;
