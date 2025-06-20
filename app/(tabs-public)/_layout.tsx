import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { APP_PATH } from '@/paths';
import { AuthTokens, getTokenFromSecureStore } from '@/utils/SecureStoreHelper';
import { Ionicons } from '@expo/vector-icons';
import { Href, router, Tabs, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';



export default function PublicTabsLayout() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    const checkAuth = async () => {
      if (isLoggedIn) {
        router.replace(APP_PATH.private.profile as Href);
      } else {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isCheckingAuth) return null;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary.main,
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
