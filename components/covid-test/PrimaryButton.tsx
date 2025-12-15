import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function PrimaryButton({
  title,
  onPress,
  style,
  disabled = false,
  loading = false,
  variant = 'primary',
}: PrimaryButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const getGradientColors = (): readonly [string, string, ...string[]] => {
    if (disabled) return ['#CBD5E1', '#94A3B8'];
    switch (variant) {
      case 'secondary':
        return [AppColors.secondary, AppColors.secondaryLight];
      case 'outline':
        return ['transparent', 'transparent'];
      default:
        return [AppColors.primary, AppColors.primaryLight];
    }
  };

  return (
    <AnimatedTouchable
      style={[styles.container, animatedStyle, style]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
      disabled={disabled || loading}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.gradient,
          variant === 'outline' && styles.outlineGradient,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={AppColors.textLight} />
        ) : (
          <Text
            style={[
              styles.text,
              variant === 'outline' && styles.outlineText,
              disabled && styles.disabledText,
            ]}
          >
            {title}
          </Text>
        )}
      </LinearGradient>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.small,
  },
  gradient: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  outlineGradient: {
    borderWidth: 2,
    borderColor: AppColors.primary,
    borderRadius: BorderRadius.xl,
  },
  text: {
    color: AppColors.textLight,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  outlineText: {
    color: AppColors.primary,
  },
  disabledText: {
    color: '#F1F5F9',
  },
});

