import Link from 'next/link';

interface IProps {
  username?: string;
  className?: string;
  id: string;
}

export default function Username({ className, username, id }: IProps) {
  return (
    <Link href={`/profile/${id}`}>
      <p className={`inline text-sm font-semibold ${className}`}>
        {username || 'username'}
      </p>
    </Link>
  );
}
