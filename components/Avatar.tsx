import Image from 'next/image';
import Link from 'next/link';
import avatar from '../public/avatar.jpeg';

export default function Avatar() {
  return (
    <div className="w-12 rounded-full overflow-hidden">
      <Link href={'/profile'}>
        <Image src={avatar} alt="avatar" />
      </Link>
    </div>
  );
}
