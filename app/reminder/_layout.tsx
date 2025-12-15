import { AppColors } from '@/constants/theme';
import { Stack } from 'expo-router';

export default function ReminderLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: AppColors.background },
        animation: 'slide_from_bottom',
        presentation: 'modal',
      }}
    >
      <Stack.Screen name="add" />
    </Stack>
  );
}

