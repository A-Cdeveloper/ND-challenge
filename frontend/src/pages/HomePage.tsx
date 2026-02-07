import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useLogout } from '@/features/auth/hooks/useLogout';

const HomePage = () => {
  const { user, setUser } = useAuth();
  const { mutate: logout, isPending } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setUser(null);
        navigate('/login');
      },
    });
  };

  return (
    <div className="space-y-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">
        Welcome {user?.firstName} {user?.lastName}
      </h1>
      <Button
        onClick={handleLogout}
        disabled={isPending}
        className="rounded-none cursor-pointer"
      >
        {isPending ? 'Logging out...' : 'Logout'}
      </Button>
    </div>
  );
};

export default HomePage;