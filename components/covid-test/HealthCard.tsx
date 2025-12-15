import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

interface HealthCardProps {
  children: React.ReactNode;
  gradientColors?: readonly [string, string, ...string[]];
  style?: ViewStyle;
  onPress?: () => void;
  delay?: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function HealthCard({
  children,
  gradientColors = [AppColors.cardPurple, AppColors.cardPurpleLight],
  style,
  onPress,
  delay = 0,
}: HealthCardProps) {
  const scale = useSharedValue(1);
  const progress = useSharedValue(0);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      progress.value = withSpring(1, { damping: 12, stiffness: 100 });
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: interpolate(progress.value, [0, 1], [30, 0]) },
      ],
      opacity: progress.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <AnimatedTouchable
      style={[styles.container, animatedStyle, style]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  gradient: {
    padding: Spacing.md,
    minHeight: 140,
  },
});

