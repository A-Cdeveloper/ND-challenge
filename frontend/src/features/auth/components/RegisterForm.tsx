import { Link, useNavigate } from 'react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRegister } from '../hooks/useRegister';
import { useReducer } from 'react';
import { ErrorBox } from './ErrorBox';

type RegisterState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    error: string;
};

type RegisterAction =
    | { type: 'SET_FIELD'; field: keyof Omit<RegisterState, 'error'>; value: string }
    | { type: 'SET_ERROR'; error: string }
    | { type: 'RESET' };

const initialState: RegisterState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    error: '',
};

function registerReducer(state: RegisterState, action: RegisterAction): RegisterState {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'SET_ERROR':
            return { ...state, error: action.error };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

/**
 * Register form component.
 * Displays firstName, lastName, email and password fields with register button.
 */
export function RegisterForm() {
    const { mutate: register, isPending } = useRegister();
    const [state, dispatch] = useReducer(registerReducer, initialState);
    const navigate = useNavigate();

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'SET_ERROR', error: '' });

        // Validation
        if (!state.firstName || !state.lastName || !state.email || !state.password) {
            dispatch({ type: 'SET_ERROR', error: 'All fields are required' });
            return;
        }

        if (state.password.length < 6) {
            dispatch({ type: 'SET_ERROR', error: 'Password must be at least 6 characters long' });
            return;
        }

        register({ firstName: state.firstName, lastName: state.lastName, email: state.email, password: state.password }, {
            onSuccess: () => {
                navigate('/');
            },
            onError: (error) => {
                dispatch({ type: 'SET_ERROR', error: error.message });
            },
        });
    };

    return (
        <div className="bg-card text-card-foreground rounded-lg border border-border shadow-lg p-6 w-full max-w-sm">
            <div className="space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold">Register</h1>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            type="text"
                            name="firstName"
                            autoComplete="given-name"
                            placeholder="Enter your first name"
                            required
                            aria-required="true"
                            aria-describedby="firstName-description"
                            className="rounded-none"
                            value={state.firstName}
                            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'firstName', value: e.target.value })}
                            disabled={isPending}
                        />
                        <p id="firstName-description" className="sr-only">
                            Enter your first name
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            type="text"
                            name="lastName"
                            autoComplete="family-name"
                            placeholder="Enter your last name"
                            required
                            aria-required="true"
                            aria-describedby="lastName-description"
                            className="rounded-none"
                            value={state.lastName}
                            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'lastName', value: e.target.value })}
                            disabled={isPending}
                        />
                        <p id="lastName-description" className="sr-only">
                            Enter your last name
                        </p>
                    </div>

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
                            className="rounded-none"
                            value={state.email}
                            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
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
                            autoComplete="new-password"
                            placeholder="Enter your password"
                            required
                            aria-required="true"
                            aria-describedby="password-description"
                            className="rounded-none"
                            value={state.password}
                            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })}
                            disabled={isPending}
                        />
                        <p id="password-description" className="sr-only">
                            Enter your password
                        </p>
                    </div>

                    {state.error && <ErrorBox message={state.error} />}

                    <Button type="submit" className="w-full rounded-none cursor-pointer" disabled={isPending}>
                        {isPending ? 'Registering...' : 'Register'}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <span className="text-muted-foreground">Already have an account? </span>
                    <Link
                        to="/login"
                        className="text-primary hover:underline font-medium"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
