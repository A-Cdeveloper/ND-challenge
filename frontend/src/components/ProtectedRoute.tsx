import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useVerify } from '@/features/auth/hooks/useVerify';
import { useAuth } from '@/features/auth/context/AuthContext';

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
    const { data: user } = useVerify();
    const { setUser } = useAuth();

    useEffect(() => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    }, [user, setUser]);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
