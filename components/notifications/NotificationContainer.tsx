import { DivProps } from '@/lib/interfaces/components.interface';
import Avatar from '../Avatar';
import Username from '../links/Username';

interface Props extends DivProps {
  prompt: string;
}

export default function NotificationContainer({ children, prompt }: Props) {
  return (
    <div className="flex items-center px-2 py-4 cursor-pointer hover:bg-gray-900 shadow-app-bottom">
      <div className="flex items-center gap-2 grow">
        <Avatar />
        <div className="text-sm">
          <Username username="piero" /> <span>{prompt}</span>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
