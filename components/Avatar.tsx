import Image from 'next/image';
import avatar from '../public/avatar.jpeg';

export default function Avatar() {
  return (
    <div className="w-12 rounded-full overflow-hidden">
      <Image src={avatar} alt="avatar" />
    </div>
  );
}
