import Image from 'next/image';
import NotificationContainer from './NotificationContainer';

export default function CommentNotification() {
  return (
    <NotificationContainer prompt="commented your post.">
      <div className="w-12 h-12 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1621500917010-3915ad3cabbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
          alt="post"
          width={100}
          height={100}
        />
      </div>
    </NotificationContainer>
  );
}
