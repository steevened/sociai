import { FC, Fragment } from 'react';
import Arrow, { AspectLogo } from '../icons/Svg';
import Cropper, { Area } from 'react-easy-crop';
import { Menu, Transition } from '@headlessui/react';

interface Crop {
  x: number;
  y: number;
}

interface UploadModalProps {
  setCroppedImage: (croppedImage: any) => void;
  setFile: (file: string | undefined) => void;
  showCroppedImage: () => void;
  file: string;
  crop: Crop;
  zoom: number;
  aspect: number;
  setAspect: (aspect: number) => void;
  setCrop: (crop: Crop) => void;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  setZoom: (zoom: number) => void;
}

const UploadModal: FC<UploadModalProps> = ({
  setCroppedImage,
  setFile,
  showCroppedImage,
  file,
  crop,
  zoom,
  aspect,
  setAspect,
  setCrop,
  onCropComplete,
  setZoom,
}) => {
  return (
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
            <Menu.Button className="p-2 rounded-full bg-gray-900/60">
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
              <Menu.Items className="absolute left-0 w-20 px-2 py-3 space-y-3 rounded-lg bg-gray-900/60 bottom-full shadow-app-shadow">
                <Menu.Item>
                  <button
                    onClick={() => setAspect(1 / 1)}
                    className={`flex items-center justify-between gap-5 font-semibold  w-full  ${
                      aspect === 1 / 1 ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    <p>1:1</p>
                    <span
                      className={`w-4 h-4 border  rounded-sm ${
                        aspect === 1 / 1 ? 'border-white' : 'border-gray-400'
                      }`}
                    />
                  </button>
                </Menu.Item>

                <Menu.Item>
                  <button
                    onClick={() => setAspect(4 / 5)}
                    className={`flex items-center gap-5 font-semibold w-full justify-between  ${
                      aspect === 4 / 5 ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    4:5
                    <span
                      className={`w-3 h-4 border  rounded-sm ${
                        aspect === 4 / 5 ? 'border-white' : 'border-gray-400'
                      }`}
                    />
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    onClick={() => setAspect(16 / 9)}
                    className={`flex items-center justify-between gap-5 font-semibold w-full ${
                      aspect === 16 / 9 ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    16:9
                    <span
                      className={`w-10 h-2 border  rounded-sm ${
                        aspect === 16 / 9 ? 'border-white' : 'border-gray-400'
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
  );
};

export default UploadModal;
