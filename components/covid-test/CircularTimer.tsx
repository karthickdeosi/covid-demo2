import { AppColors, Spacing } from '@/constants/theme';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularTimerProps {
  duration: number; // in seconds
  size?: number;
  strokeWidth?: number;
  onComplete?: () => void;
  isRunning?: boolean;
}

export function CircularTimer({
  duration,
  size = 200,
  strokeWidth = 12,
  onComplete,
  isRunning = true,
}: CircularTimerProps) {
  const progress = useSharedValue(0);
  const [timeLeft, setTimeLeft] = React.useState(duration);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const handleComplete = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (isRunning) {
      progress.value = withTiming(1, {
        duration: duration * 1000,
        easing: Easing.linear,
      }, (finished) => {
        if (finished) {
          runOnJS(handleComplete)();
        }
      });

      // Update time display
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [duration, isRunning, progress, handleComplete]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={AppColors.primary} />
            <Stop offset="100%" stopColor={AppColors.secondary} />
          </LinearGradient>
        </Defs>
        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated progress circle */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#timerGradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>
      <View style={[styles.timeContainer, { width: size, height: size }]}>
        <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
        <Text style={styles.label}>remaining</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 48,
    fontWeight: '700',
    color: AppColors.textPrimary,
    fontVariant: ['tabular-nums'],
  },
  label: {
    fontSize: 16,
    color: AppColors.textSecondary,
    marginTop: Spacing.xs,
  },
});

