import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout';
import Cropper from 'react-easy-crop';
import { CreatePostLogo } from '@/components/icons/Svg';

const CreatePage: NextPageWithLayout = ({}) => {
  return (
    <div className="h-full min-h-screen flex">
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
            />
            <span className="text-md font-medium">Upload Picture</span>
          </label>
        </div>
      </div>
    </div>
  );
};

CreatePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default CreatePage;
