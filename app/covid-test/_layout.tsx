import { AppColors } from '@/constants/theme';
import { Stack } from 'expo-router';

export default function CovidTestLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: AppColors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="instructions" />
      <Stack.Screen name="timer" />
      <Stack.Screen 
        name="result" 
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen name="history" />
    </Stack>
  );
}

