import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useVerify } from '@/features/auth/hooks/useVerify';
import { useAuth } from '@/features/auth/context/AuthContext';
import Loading from './Loading';

type ProtectedRouteProps = {
    children: ReactNode;
};

/**
 * Protected route component that verifies user authentication.
 * Redirects to login if user is not authenticated.
 * 
 * @param children - Child components to render if authenticated
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { data: user, isLoading } = useVerify();
    const { setUser } = useAuth();

    useEffect(() => {
        if (user) {
            setUser(user);
        } else if (!isLoading) {
            setUser(null);
        }
    }, [user, isLoading, setUser]);

    if (isLoading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
