import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '@/context/AuthContext';

type PublicRouteProps = {
    children: ReactNode;
};

/**
 * Public route component that redirects authenticated users.
 * Redirects to home if user is already authenticated.
 * 
 * @param children - Child components to render if not authenticated
 */
export function PublicRoute({ children }: PublicRouteProps) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
