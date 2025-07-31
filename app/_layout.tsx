// app/_layout.tsx
import { Stack } from 'expo-router';
import { PaperProvider, DefaultTheme } from 'react-native-paper';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    surface: '#ffffff',
    text: '#000000',
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={lightTheme}>
      <Stack screenOptions={{ headerTitle: 'Cosmos' }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
      </Stack>
    </PaperProvider>
  );
}
