import { Menu, Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';
import { MenuDotsIcon, EditIcon, TrashIcon } from '../icons/Svg';
import { useModal } from '@/lib/hooks';

interface EditPostMenuProps {
  onEdit: (value?: any) => void;
  onDelete: (value?: any) => void;
}

const EditPostMenu: FC<EditPostMenuProps> = ({ onEdit, onDelete }) => {
  const { isModalOpen, setIsModalOpen } = useModal();

  return (
    <Menu as="div" className="relative text-gray-400 ">
      <Menu.Button className="p-1 duration-100 rounded-full hover:bg-gray-900 active:scale-95 hover:scale-105">
        <MenuDotsIcon />
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
        <Menu.Items className="absolute z-[999] p-2 mt-1 space-y-2 bg-black rounded-md -right-1 w-36 shadow-app-shadow">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={onEdit}
                className={`flex w-full gap-2 items-center duration-200  px-2 py-2 rounded-md text-sm ${
                  active && 'bg-gray-900'
                }`}
              >
                <>
                  <EditIcon />
                  Edit
                </>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => setIsModalOpen(true)}
                className={`flex w-full gap-2 items-center duration-200  px-2 py-2 rounded-md text-red-500 text-sm ${
                  active && 'bg-gray-900'
                }`}
              >
                <>
                  <TrashIcon />
                  Delete
                </>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default EditPostMenu;
