import { useQuery } from "@tanstack/react-query";

interface AuthUser {
  id: string;
  username: string;
}

export function useAuth() {
  const { data: user, isLoading, error } = useQuery<AuthUser>({
    queryKey: ["/api/auth/me"],
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
  };
}
