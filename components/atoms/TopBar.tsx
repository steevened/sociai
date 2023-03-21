import { useRouter } from 'next/router';
import React from 'react';
import Arrow from '../icons/Svg';

export default function TopBar({
  title,
}: {
  title: string | string[] | undefined;
}) {
  const router = useRouter();
  return (
    <div className="relative py-4 shadow-app-bottom">
      <button onClick={() => router.back()} className="absolute ml-4 ">
        <Arrow />
      </button>
      <h1 className="font-bold text-center">{title}</h1>
    </div>
  );
}
