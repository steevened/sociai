import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout';
import { Area } from 'react-easy-crop';
import TopBar from '@/components/atoms/TopBar';
import { useCallback, useState } from 'react';
import getCroppedImg from '@/lib/utils/cropImage';
import InputFile from '@/components/create/InputFile';
import CreateForm from '@/components/create/CreateForm';
import UploadModal from '@/components/create/UploadModal';

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
  const [caption, setCaption] = useState('');

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
      <div className="h-full min-h-[calc(100vh-56px)] flex relative ">
        {!croppedImage ? (
          <InputFile onFileChange={onFileChange} />
        ) : (
          <CreateForm
            caption={caption}
            setCaption={setCaption}
            croppedImage={croppedImage}
          />
        )}
      </div>
      {file && (
        <UploadModal
          aspect={aspect}
          crop={crop}
          file={file}
          onCropComplete={onCropComplete}
          setAspect={setAspect}
          setCrop={setCrop}
          setCroppedImage={setCroppedImage}
          setFile={setFile}
          setZoom={setZoom}
          showCroppedImage={showCroppedImage}
          zoom={zoom}
        />
      )}
    </>
  );
};

CreatePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default CreatePage;
