import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout';
import Cropper from 'react-easy-crop';
import { CreatePostLogo } from '@/components/icons/Svg';
import TopBar from '@/components/atoms/TopBar';
import { ChangeEvent, useState } from 'react';

function readFile(file: File) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

const CreatePage: NextPageWithLayout = ({}) => {
  const [file, setFile] = useState<unknown>(undefined);

  file && console.log(file);

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      setFile(imageDataUrl);
    }
  };

  return (
    <>
      <TopBar title="Create new post" />
      <div className="h-full min-h-[calc(100vh-56px)] flex">
        <div className="flex items-center justify-center   w-full flex-col">
          <CreatePostLogo />
          <div className="mt-5">
            <label
              htmlFor="picture"
              className="px-4 py-2 bg-sky-700 rounded-md hover:bg-blue-500 duration-200"
              role="button"
            >
              <input
                type="file"
                className="appearance-none hidden"
                id="picture"
                accept="image/*"
                onChange={onFileChange}
              />
              <span className="text-md font-medium">Upload Picture</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

CreatePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default CreatePage;
