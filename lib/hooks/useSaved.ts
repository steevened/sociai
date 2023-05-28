import useSWR from 'swr';
import { SavedResponse } from '../interfaces/saved.interface';

const useSaved = () => {
  const { data, error, isLoading, mutate } =
    useSWR<SavedResponse>('/api/saved');

  return {
    data: data?.saved,
    isLoading,
    error,
    mutate,
  };
};

export { useSaved };
