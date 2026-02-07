import { createContext, use, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/types/user';

type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

/**
 * Provides authentication context to the application.
 * Manages user state and authentication status.
 * 
 * @param children - Child components that will have access to auth context
 */
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    const value: AuthContextType = {
        user,
        setUser,
        isAuthenticated: !!user,
    };

    return <AuthContext value={value}>{children}</AuthContext>;
}

/**
 * Hook to access authentication context.
 * Must be used within AuthProvider.
 * 
 * @returns Authentication context with user data and setter functions
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = use(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
