import { Stack } from 'expo-router';

export default function AppLayout() {
  // This renders the navigation stack for all authenticated app routes.
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="itinerary-map" options={{ title: 'Itinerário' }} />
      <Stack.Screen name="booking-flights" options={{ presentation: 'modal', title: 'Resultados' }} />
      <Stack.Screen name="booking-hotel" options={{ presentation: 'modal', title: 'Resultados' }} />
    </Stack>
  );
}
