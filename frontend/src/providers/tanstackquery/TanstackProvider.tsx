import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type TanstackProviderProps = {
  children: React.ReactNode;
};

/**
 * QueryClient instance for React Query.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

/**
 * TanstackProvider component wraps the application with React Query context.
 */
const TanstackProvider = ({ children }: TanstackProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.DEV && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default TanstackProvider;
