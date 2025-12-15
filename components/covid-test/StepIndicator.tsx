import { AppColors, BorderRadius, Spacing } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <StepDot
            key={index}
            isActive={index === currentStep}
            isCompleted={index < currentStep}
            index={index}
          />
        ))}
      </View>
      {labels && labels[currentStep] && (
        <Text style={styles.label}>{labels[currentStep]}</Text>
      )}
    </View>
  );
}

interface StepDotProps {
  isActive: boolean;
  isCompleted: boolean;
  index: number;
}

function StepDot({ isActive, isCompleted }: StepDotProps) {
  const width = useSharedValue(isActive ? 24 : 8);
  const backgroundColor = useSharedValue(
    isActive ? AppColors.primary : isCompleted ? AppColors.primary : '#E2E8F0'
  );

  React.useEffect(() => {
    width.value = withTiming(isActive ? 24 : 8, {
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
    backgroundColor.value = withTiming(
      isActive ? AppColors.primary : isCompleted ? AppColors.primaryLight : '#E2E8F0',
      { duration: 300 }
    );
  }, [isActive, isCompleted, width, backgroundColor]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
    backgroundColor: backgroundColor.value,
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: BorderRadius.full,
  },
  label: {
    marginTop: Spacing.sm,
    fontSize: 14,
    color: AppColors.textSecondary,
    fontWeight: '500',
  },
});

