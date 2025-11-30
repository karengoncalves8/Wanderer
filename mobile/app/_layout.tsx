
import { SessionProvider, useSession } from '@/context/AuthContext';
import { SplashScreenController } from '@/splash/splash';
import { Stack } from 'expo-router';
import '@/config/i18next';
import { useTranslation } from 'react-i18next';

import Toast from 'react-native-toast-message';
import { useEffect } from 'react';


export default function Root() {
  // Set up the auth context and render your layout inside of it.
  return (
    <SessionProvider>
      <SplashScreenController />
      <RootNavigator />
    </SessionProvider>
  );
}

// Create a new component that can access the SessionProvider context later.
function RootNavigator() {
  const { session } = useSession();

  const { i18n } = useTranslation();

  useEffect(() => {
    if (session?.user?.preferencias?.idioma) {
      i18n.changeLanguage(session.user.preferencias.idioma.toLowerCase());
    }
  }, [session?.user?.preferencias?.idioma]);

  return (
    <>
    <Stack>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" options={{
          headerShown: false,
        }}/>
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="login/index" options={{
          headerShown: false, 
        }} />
        <Stack.Screen name="register/index" options={{
          headerShown: false, 
        }} />
      </Stack.Protected>
    </Stack>
    <Toast />
    </>
  );
}
