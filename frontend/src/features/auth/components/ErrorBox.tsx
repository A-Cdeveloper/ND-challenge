import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

type ErrorBoxProps = {
    message: string;
};

/**
 * Error box component for displaying error messages.
 * Uses Alert component with destructive variant.
 *
 * @param message - Error message to display
 */
export function ErrorBox({ message }: ErrorBoxProps) {
    if (!message) {
        return null;
    }

    return (
        <Alert variant="destructive" className="border-destructive rounded-none bg-destructive/10">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}