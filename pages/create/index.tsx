import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout';
import Cropper, { Area } from 'react-easy-crop';
import Arrow, { CreatePostLogo } from '@/components/icons/Svg';
import TopBar from '@/components/atoms/TopBar';
import { ChangeEvent, useCallback, useState } from 'react';

function readFile(file: File) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

const CreatePage: NextPageWithLayout = ({}) => {
  const [file, setFile] = useState<string | undefined>(undefined);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(4 / 5);
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      console.log(croppedArea, croppedAreaPixels);
    },
    []
  );

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setFile(imageDataUrl as string);
    }
    e.target.value = '';
  };

  return (
    <>
      <TopBar title="Create new post" />
      <div className="h-full min-h-[calc(100vh-56px)] flex relative">
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
      {file && (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm ">
          <div className="bg-app-bg text-lg flex items-center justify-between py-4 px-4 text-white z-[60] shadow-app-bottom">
            <button onClick={() => setFile(undefined)}>
              <Arrow />
            </button>
            <p>Crop</p>
            <button className="text-blue-500">Next</button>
          </div>
          <div
            // onClick={(e) => e.stopPropagation()}
            className=" w-full h-[calc(100%-60px)] absolute"
          >
            <Cropper
              image={file}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
        </div>
      )}
    </>
  );
};

CreatePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default CreatePage;
