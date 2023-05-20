import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout';
import Cropper, { Area } from 'react-easy-crop';
import Arrow, { AspectLogo, CreatePostLogo } from '@/components/icons/Svg';
import TopBar from '@/components/atoms/TopBar';
import { ChangeEvent, Fragment, useCallback, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import getCroppedImg from '@/lib/utils/cropImage';

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
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
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
    setCroppedImage(null);
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(file, croppedAreaPixels);
      console.log('donee', { croppedImage });
      setCroppedImage(croppedImage as any);
      setFile(undefined);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, file]);

  console.log(croppedImage);

  return (
    <>
      <TopBar title="Create new post" />
      <div className="h-full min-h-[calc(100vh-56px)] flex relative">
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
      </div>
      {file && (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm ">
          <div className="bg-app-bg text-lg flex items-center justify-between py-4 px-4 text-white z-[60] shadow-app-bottom">
            <button
              onClick={() => {
                setCroppedImage(null);
                setFile(undefined);
              }}
            >
              <Arrow />
            </button>
            <p>Crop</p>
            <button onClick={showCroppedImage} className="text-blue-500">
              Next
            </button>
          </div>
          <div
            // onClick={(e) => e.stopPropagation()}
            className=" w-full h-full max-h-[calc(100%-60px)] absolute"
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
            <span className="absolute bottom-10  z-[100] w-full flex items-center justify-center gap-5 px-10 max-w-sm -translate-x-1/2 left-1/2">
              <Menu as="div" className="relative">
                <Menu.Button className="p-2 bg-gray-900 rounded-full">
                  <AspectLogo />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 px-2 py-3 space-y-3 bg-gray-900 rounded-lg bottom-full shadow-app-shadow">
                    <Menu.Item>
                      <button
                        onClick={() => setAspect(1 / 1)}
                        className={`flex items-center gap-5 font-semibold  ${
                          aspect === 1 / 1 ? 'text-white' : 'text-gray-400'
                        }`}
                      >
                        1:1
                        <span
                          className={`w-4 h-4 border  rounded-sm ${
                            aspect === 1 / 1
                              ? 'border-white'
                              : 'border-gray-400'
                          }`}
                        />
                      </button>
                    </Menu.Item>

                    <Menu.Item>
                      <button
                        onClick={() => setAspect(4 / 5)}
                        className={`flex items-center gap-5 font-semibold  ${
                          aspect === 4 / 5 ? 'text-white' : 'text-gray-400'
                        }`}
                      >
                        4:5
                        <span
                          className={`w-4 h-4 border  rounded-sm ${
                            aspect === 4 / 5
                              ? 'border-white'
                              : 'border-gray-400'
                          }`}
                        />
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        onClick={() => setAspect(16 / 9)}
                        className={`flex items-center gap-5 font-semibold  ${
                          aspect === 16 / 9 ? 'text-white' : 'text-gray-400'
                        }`}
                      >
                        16:9
                        <span
                          className={`w-4 h-4 border  rounded-sm ${
                            aspect === 16 / 9
                              ? 'border-white'
                              : 'border-gray-400'
                          }`}
                        />
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
              />
            </span>
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
