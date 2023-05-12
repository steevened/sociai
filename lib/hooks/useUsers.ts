import useSWR from 'swr';
import { UsersResponse } from '../interfaces/user-response.interface';

function useUsers() {
  const { data, error, isLoading } = useSWR<UsersResponse>('/api/users');

  return {
    users: data?.users,
    isLoading,
    error,
  };
}

export { useUsers };
