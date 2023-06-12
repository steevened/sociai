import { FC } from 'react';
import Button from '../atoms/Button';
import { useUiStore } from '@/store/uiStore/uiStore';

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ onConfirm, onCancel }) => {
  const { toggleModal } = useUiStore();

  return (
    <div
      onClick={() => toggleModal(false)}
      className="fixed inset-0 flex items-center justify-center px-5 bg-black/95 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm px-2 py-4 bg-black rounded-md cursor-default h-min shadow-app-shadow"
      >
        <h2 className="pb-2 text-xl font-semibold">Are you sure?</h2>

        <p className="pt-2 text-blue-gray-500 shadow-app-top">
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2 mt-4 ">
          <Button
            onClick={() => {
              toggleModal(false);
              onCancel();
            }}
          >
            Cancel
          </Button>

          <Button
            color="danger"
            onClick={() => {
              onConfirm();
              toggleModal(false);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
