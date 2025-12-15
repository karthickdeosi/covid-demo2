import { PrimaryButton, StepIndicator, TestKitIcon } from '@/components/covid-test';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    FadeInRight,
    SlideInRight,
    SlideOutLeft
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface Step {
  id: number;
  title: string;
  description: string;
  icon: 'kit' | 'swab' | 'timer' | 'result';
  tips: string[];
}

const STEPS: Step[] = [
  {
    id: 0,
    title: 'Prepare Your Test Kit',
    description: 'Open the test kit package and lay out all components on a clean, flat surface.',
    icon: 'kit',
    tips: [
      'Wash hands thoroughly for 20 seconds',
      'Check expiration date on the kit',
      'Ensure all components are present',
    ],
  },
  {
    id: 1,
    title: 'Collect Your Sample',
    description: 'Using the swab provided, gently insert it into both nostrils and rotate 5 times.',
    icon: 'swab',
    tips: [
      'Insert swab about 2.5 cm (1 inch)',
      'Rotate slowly against the nostril wall',
      'Repeat for both nostrils with same swab',
    ],
  },
  {
    id: 2,
    title: 'Apply Sample to Test',
    description: 'Place the swab in the extraction tube and mix well. Apply drops to the test cassette.',
    icon: 'kit',
    tips: [
      'Swirl swab in solution for 30 seconds',
      'Squeeze tube while removing swab',
      'Apply exactly 3-4 drops to sample well',
    ],
  },
  {
    id: 3,
    title: 'Wait for Results',
    description: 'Place the test on a flat surface and wait 15 minutes for results to appear.',
    icon: 'timer',
    tips: [
      'Do not read results after 30 minutes',
      'Keep test on flat, stable surface',
      'Avoid touching the result window',
    ],
  },
];

export default function InstructionsScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to timer screen
      router.push('/covid-test/timer');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    router.back();
  };

  const currentStepData = STEPS[currentStep];

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
          <Text style={styles.headerTitle}>Test Instructions</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Step Indicator */}
        <StepIndicator
          currentStep={currentStep}
          totalSteps={STEPS.length}
          labels={['Prepare', 'Collect', 'Apply', 'Wait']}
        />

        {/* Step Content */}
        <Animated.View
          key={currentStep}
          entering={SlideInRight.duration(400)}
          exiting={SlideOutLeft.duration(300)}
          style={styles.content}
        >
          {/* Icon */}
          <View style={styles.iconContainer}>
            <TestKitIcon size={150} type={currentStepData.icon} animated />
          </View>

          {/* Title & Description */}
          <View style={styles.textContainer}>
            <Text style={styles.stepNumber}>Step {currentStep + 1} of {STEPS.length}</Text>
            <Text style={styles.title}>{currentStepData.title}</Text>
            <Text style={styles.description}>{currentStepData.description}</Text>
          </View>

          {/* Tips Card */}
          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>💡 Tips</Text>
            {currentStepData.tips.map((tip, index) => (
              <Animated.View
                key={index}
                entering={FadeInRight.duration(400).delay(index * 100)}
                style={styles.tipItem}
              >
                <View style={styles.tipBullet}>
                  <Ionicons name="checkmark" size={14} color={AppColors.textLight} />
                </View>
                <Text style={styles.tipText}>{tip}</Text>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Navigation Buttons */}
        <View style={styles.navigation}>
          {currentStep > 0 ? (
            <TouchableOpacity onPress={handlePrevious} style={styles.backButton}>
              <Ionicons name="chevron-back" size={20} color={AppColors.primary} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder} />
          )}

          <PrimaryButton
            title={currentStep === STEPS.length - 1 ? 'Start Timer' : 'Next'}
            onPress={handleNext}
            style={styles.nextButton}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
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
  iconContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  stepNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: AppColors.primary,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: AppColors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: 16,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: Spacing.md,
  },
  tipsCard: {
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
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  tipBullet: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: AppColors.textSecondary,
    lineHeight: 20,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  backButtonText: {
    fontSize: 16,
    color: AppColors.primary,
    fontWeight: '500',
  },
  nextButton: {
    minWidth: 140,
  },
});

