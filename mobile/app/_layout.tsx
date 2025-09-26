
import { SessionProvider, useSession } from '@/context/AuthContext';
import { SplashScreenController } from '@/splash/splash';
import { Stack } from 'expo-router';



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

  return (
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
      </Stack.Protected>
    </Stack>
  );
}
