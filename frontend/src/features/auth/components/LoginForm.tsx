import { Link, useNavigate } from 'react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useLogin } from '../hooks/useLogin';
import { useState } from 'react';
import { ErrorBox } from './ErrorBox';

/**
 * Login form component.
 * Displays email and password fields with login button.
 */
export function LoginForm() {

    const { mutate: login, isPending } = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        
        // Validation
        if (!email || !password) {
            setError('Email and password are required');
            return;
        }
        
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        
        login({ email, password }, {
            onSuccess: () => {
                navigate('/');
            },
            onError: (error) => {
                setError(error.message);
            },
        });
    };

    return (
        <div className="bg-card text-card-foreground rounded-lg border border-border shadow-lg p-6 w-full max-w-sm">
            <div className="space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold">Login</h1>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                            required
                            aria-required="true"
                            aria-describedby="email-description"
                            className='rounded-none'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isPending}
                        />
                        <p id="email-description" className="sr-only">
                            Enter your email address
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            required
                            aria-required="true"
                            aria-describedby="password-description"
                            className='rounded-none'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isPending}
                        />
                        <p id="password-description" className="sr-only">
                            Enter your password
                        </p>
                    </div>
                    {error && <ErrorBox message={error} />}
                    <Button type="submit" className="w-full rounded-none cursor-pointer" disabled={isPending}>
                        {isPending ? 'Logging in...' : 'Login'}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <Link
                        to="/register"
                        className="text-primary hover:underline font-medium"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}
