import { FC } from 'react';
import Button from '../atoms/Button';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  setProductToDelete: (value: null) => void;
  handleDeleteProduct: () => void;
}

const ConfirmModal: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  setProductToDelete,
  handleDeleteProduct,
}) => {
  return (
    <>
      <div
        onClick={() => {
          setProductToDelete(null);
          setIsModalOpen(false);
        }}
        className={`fixed inset-0 h-screen bg-black/80 backdrop-blur-3xl z-50 duration-200 flex items-center justify-center ${
          isModalOpen ? '' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="p-4 mx-4 bg-white rounded-md shadow-lg w-96"
        >
          <h2 className="pb-2 text-xl font-semibold">Are you sure?</h2>

          <p className="pt-2 text-blue-gray-500 shadow-app-top">
            Do you really want to delete this product? This process cannot be
            undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => {
                setProductToDelete(null);
                setIsModalOpen(false);
              }}
              className="border border-blue-300"
            >
              Cancel
            </Button>

            <Button
              onClick={() => {
                handleDeleteProduct();
                setProductToDelete(null);
                setIsModalOpen(false);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
