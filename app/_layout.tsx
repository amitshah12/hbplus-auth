import { useEffect } from 'react';
import {
  Stack,
  useRouter,
  useSegments,
  useGlobalSearchParams,
} from 'expo-router';
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';
import LoadingScreen from '../src/components/LoadingScreen';

function RouteGuard() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const params = useGlobalSearchParams<{ preview?: string }>();

  const inDashboard = segments[0] === 'dashboard';
  const isDevelopmentPreview =
    __DEV__ && inDashboard && params.preview === '1';

  useEffect(() => {
    if (loading) return;

    if (!user && inDashboard && !isDevelopmentPreview) {
      router.replace('/');
    } else if (user && !inDashboard) {
      router.replace('/dashboard');
    }
  }, [user, loading, inDashboard, isDevelopmentPreview, router]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user && inDashboard && !isDevelopmentPreview) {
    return <LoadingScreen />;
  }

  if (user && !inDashboard) {
    return <LoadingScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="dashboard" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard />
    </AuthProvider>
  );
}
