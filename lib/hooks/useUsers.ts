import useSWR from 'swr';
import {
  UserByIDResponse,
  UsersResponse,
} from '../interfaces/user-response.interface';

function useUsers() {
  const { data, error, isLoading } = useSWR<UsersResponse>('/api/users');

  return {
    users: data?.users,
    isLoading,
    error,
  };
}

function useUserById(id: string) {
  const { data, error, isLoading } = useSWR<UserByIDResponse>(
    `/api/users/${id}`
  );

  return {
    user: data?.user,
    isLoading,
    error,
  };
}

function useUserByEmail(email: string) {
  const { data, error, isLoading } = useSWR<UserByIDResponse>(
    `/api/users/email/${email}`
  );

  return {
    user: data?.user,
    isLoading: isLoading || !data?.user,
    error,
  };
}

export { useUsers, useUserById, useUserByEmail };
