import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';

export const useAuth = () => {
  const { user, loading, error, setUser, setLoading, setError } = useAuthStore();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe;
  }, [setUser, setLoading]);

  return { user, loading, error, setError };
};