import { Menu } from '@headlessui/react';
import router from 'next/router';
import { FC, useContext } from 'react';
import { ConfigLogo } from '../icons/Svg';
import { AuthContext } from '@/context';

interface ConfigMenuProps {}

const ConfigMenu: FC<ConfigMenuProps> = ({}) => {
  const { logout } = useContext(AuthContext);

  return (
    <Menu>
      <Menu.Button>
        <ConfigLogo />
      </Menu.Button>
      <Menu.Items
        as="div"
        className="absolute right-0 p-2 mr-2 bg-black rounded-md mt-7 shadow-app-shadow w-28 "
      >
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => {
                logout();
                router.push('/');
              }}
              className={`${
                active ? 'bg-gray-900' : ''
              } block w-full text-left px-4 py-2 text-sm rounded-md`}
            >
              Log Out
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default ConfigMenu;
