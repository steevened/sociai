import Link from 'next/link';

interface IProps {
  username: string;
  className?: string;
}

export default function Username({ className, username }: IProps) {
  return (
    <Link href={`/profile/${encodeURIComponent(username)}`}>
      <p className={`inline text-sm font-semibold ${className}`}>{username}</p>
    </Link>
  );
}
