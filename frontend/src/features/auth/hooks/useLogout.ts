import { useMutation } from '@tanstack/react-query';
import { logout } from '../api/authApi';

/**
 * Hook for user logout mutation.
 * Handles session destruction and cookie clearing.
 * 
 * @returns Mutation object with logout function and state
 */
export function useLogout() {
  const mutation = useMutation({
    mutationFn: logout,
  });
  return mutation;
}
