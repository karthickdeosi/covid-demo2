import { CircularTimer, PrimaryButton, TestKitIcon } from '@/components/covid-test';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    Easing,
    FadeIn,
    FadeInDown,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// For demo purposes, using 15 seconds instead of 15 minutes
// Change to 900 (15 * 60) for actual 15-minute timer
const TEST_DURATION = 15;

export default function TimerScreen() {
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, [pulseScale]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const handleTimerComplete = () => {
    setIsComplete(true);
  };

  const handleViewResults = () => {
    router.push('/covid-test/result');
  };

  const handleClose = () => {
    Alert.alert(
      'Cancel Test?',
      'Are you sure you want to cancel the current test?',
      [
        { text: 'Continue Test', style: 'cancel' },
        { text: 'Cancel Test', style: 'destructive', onPress: () => router.back() },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[AppColors.gradientStart, AppColors.background]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={AppColors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isComplete ? 'Time Complete!' : 'Waiting for Results'}
          </Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {!isComplete ? (
            <>
              {/* Timer */}
              <Animated.View
                entering={FadeIn.duration(600)}
                style={styles.timerContainer}
              >
                <Animated.View style={pulseStyle}>
                  <CircularTimer
                    duration={TEST_DURATION}
                    size={240}
                    strokeWidth={14}
                    onComplete={handleTimerComplete}
                    isRunning={!isPaused}
                  />
                </Animated.View>
              </Animated.View>

              {/* Info Card */}
              <Animated.View
                entering={FadeInDown.duration(600).delay(300)}
                style={styles.infoCard}
              >
                <View style={styles.infoIconContainer}>
                  <TestKitIcon size={60} type="timer" animated={false} />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoTitle}>Test in Progress</Text>
                  <Text style={styles.infoDescription}>
                    Your test is processing. Please wait for the timer to complete before reading results.
                  </Text>
                </View>
              </Animated.View>

              {/* Tips */}
              <Animated.View
                entering={FadeInDown.duration(600).delay(500)}
                style={styles.tipsContainer}
              >
                <Text style={styles.tipsTitle}>⏱️ While You Wait</Text>
                <View style={styles.tipsList}>
                  <TipItem 
                    icon="checkmark-circle" 
                    text="Keep test on a flat surface" 
                    delay={600}
                  />
                  <TipItem 
                    icon="eye-off" 
                    text="Avoid moving or touching the test" 
                    delay={700}
                  />
                  <TipItem 
                    icon="alert-circle" 
                    text="Do not read before timer ends" 
                    delay={800}
                  />
                </View>
              </Animated.View>
            </>
          ) : (
            <>
              {/* Complete State */}
              <Animated.View
                entering={FadeIn.duration(600)}
                style={styles.completeContainer}
              >
                <View style={styles.completeIconContainer}>
                  <LinearGradient
                    colors={[AppColors.success, '#4ADE80']}
                    style={styles.completeIconGradient}
                  >
                    <Ionicons name="checkmark" size={60} color="#FFFFFF" />
                  </LinearGradient>
                </View>
                <Text style={styles.completeTitle}>Timer Complete!</Text>
                <Text style={styles.completeDescription}>
                  Your test results are ready to be read. Please check your test cassette now.
                </Text>
              </Animated.View>

              <Animated.View
                entering={FadeInDown.duration(600).delay(300)}
                style={styles.resultPromptCard}
              >
                <TestKitIcon size={80} type="result" animated />
                <Text style={styles.promptText}>
                  Compare your test result with the reference images in the next screen.
                </Text>
              </Animated.View>
            </>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          {isComplete ? (
            <PrimaryButton
              title="Read My Results"
              onPress={handleViewResults}
              style={styles.fullButton}
            />
          ) : (
            <View style={styles.footerNote}>
              <Ionicons name="information-circle" size={20} color={AppColors.textMuted} />
              <Text style={styles.footerNoteText}>
                Results read before 15 minutes may be inaccurate
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

interface TipItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  delay: number;
}

function TipItem({ icon, text, delay }: TipItemProps) {
  return (
    <Animated.View
      entering={FadeInDown.duration(400).delay(delay)}
      style={styles.tipItem}
    >
      <View style={styles.tipIcon}>
        <Ionicons name={icon} size={18} color={AppColors.primary} />
      </View>
      <Text style={styles.tipText}>{text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.gradientStart,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  timerContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: AppColors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.small,
  },
  infoIconContainer: {
    marginRight: Spacing.md,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  infoDescription: {
    fontSize: 14,
    color: AppColors.textSecondary,
    lineHeight: 20,
  },
  tipsContainer: {
    backgroundColor: AppColors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.small,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: Spacing.md,
  },
  tipsList: {
    gap: Spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: AppColors.primaryLight + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  completeContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  completeIconContainer: {
    marginBottom: Spacing.lg,
  },
  completeIconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: Spacing.sm,
  },
  completeDescription: {
    fontSize: 16,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: Spacing.lg,
  },
  resultPromptCard: {
    backgroundColor: AppColors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    ...Shadows.small,
  },
  promptText: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: Spacing.md,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  fullButton: {
    width: '100%',
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  footerNoteText: {
    fontSize: 13,
    color: AppColors.textMuted,
  },
});

