import { useMutation } from '@tanstack/react-query';
import { register } from '../api/authApi';

/**
 * Hook for user registration mutation.
 * Handles account creation and session setup.
 * 
 * @returns Mutation object with register function and state
 */
export function useRegister() {
  const mutation = useMutation({
    mutationFn: register,
  });
  return mutation;
}
