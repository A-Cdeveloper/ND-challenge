import { useMutation } from '@tanstack/react-query';
import { login } from '../api/authApi';


/**
 * Hook for user login mutation.
 * Handles authentication and session creation.
 * 
 * @returns Mutation object with login function and state
 */
export function useLogin() {
    const mutation = useMutation({
        mutationFn: login,
    });
    return mutation;
}
