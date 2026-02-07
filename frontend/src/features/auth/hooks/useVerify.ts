import { useQuery } from '@tanstack/react-query';
import { verify } from '../api/authApi';

/**
 * Hook for verifying user session.
 * Checks if current session is valid and returns user data.
 * 
 * @returns Query object with user data and state
 */
export function useVerify() {
  const query = useQuery({
    queryKey: ['auth', 'verify'],
    queryFn: verify,
  });
  return query;
}
