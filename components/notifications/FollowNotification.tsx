import Avatar from '../Avatar';
import Username from '../links/Username';
import NotificationContainer from './NotificationContainer';

export default function FollowNotification({
  className,
}: {
  className?: string;
}) {
  return (
    <NotificationContainer prompt="started following you.">
      <button className="px-4 py-1 font-medium text-white duration-200 bg-teal-600 rounded-md active:scale-95 hover:bg-emerald-600">
        Follow
      </button>
    </NotificationContainer>
  );
}
