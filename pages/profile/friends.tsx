import Avatar from '@/components/Avatar';
import Card from '@/components/Card';
import Layout from '@/components/Layout';
import React from 'react';
import { ReactElement } from 'react';

interface Friend {
  id: number;
  name: string;
  mutualFriends: number;
}

const friends: Friend[] = [
  {
    id: 1,
    name: 'Sam Perks',
    mutualFriends: 7,
  },
  {
    id: 2,
    name: 'Mark Clark',
    mutualFriends: 6,
  },
  {
    id: 3,
    name: 'Jonh Silver',
    mutualFriends: 2,
  },
  {
    id: 4,
    name: 'Pedro Jimenez',
    mutualFriends: 10,
  },
];

const Friends = () => {
  return (
    <Card>
      <h2 className="text-3xl">Friends</h2>
      <div className="mt-4">
        <div className="grid grid-cols-2 gap-y-6">
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center gap-2">
              <Avatar className="w-16" />
              <div>
                <h3 className="font-semibold">{friend.name}</h3>
                <p className="text-xs mt-1 text-gray-500">
                  {friend.mutualFriends} mutual friends
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

Friends.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Friends;
