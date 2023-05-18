import { FC, PropsWithChildren } from 'react';
import Avatar from '../Avatar';
import Username from '../links/Username';

interface Props {
  prompt: string;
}

const NotificationContainer: FC<PropsWithChildren<Props>> = ({
  children,
  prompt,
}) => {
  return (
    <div className="flex items-center px-2 py-4 cursor-pointer hover:bg-gray-900 shadow-app-bottom">
      <div className="flex items-center gap-2 grow">
        <Avatar />
        <div className="text-sm">
          <Username username="piero" id="1" /> <span>{prompt}</span>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default NotificationContainer;
