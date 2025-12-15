import { PrimaryButton, TestKitIcon } from '@/components/covid-test';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    FadeIn,
    FadeInDown,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

type ResultType = 'positive' | 'negative' | 'invalid' | null;

interface ResultOption {
  type: ResultType;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  icon: 'positive' | 'negative' | 'kit';
}

const RESULT_OPTIONS: ResultOption[] = [
  {
    type: 'negative',
    title: 'Negative',
    description: 'One line at C (Control)',
    color: AppColors.success,
    bgColor: '#DCFCE7',
    icon: 'negative',
  },
  {
    type: 'positive',
    title: 'Positive',
    description: 'Two lines at C and T',
    color: AppColors.error,
    bgColor: '#FEE2E2',
    icon: 'positive',
  },
  {
    type: 'invalid',
    title: 'Invalid',
    description: 'No line or only T line',
    color: AppColors.warning,
    bgColor: '#FEF3C7',
    icon: 'kit',
  },
];

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function ResultScreen() {
  const [selectedResult, setSelectedResult] = useState<ResultType>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    if (selectedResult) {
      setIsConfirmed(true);
    }
  };

  const handleDone = () => {
    router.replace('/');
  };

  const handleRetake = () => {
    router.replace('/covid-test/instructions');
  };

  if (isConfirmed && selectedResult) {
    return (
      <ResultConfirmation 
        result={selectedResult} 
        onDone={handleDone}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[AppColors.gradientStart, AppColors.background]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={AppColors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Read Your Result</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Instruction */}
          <Animated.View
            entering={FadeInDown.duration(600)}
            style={styles.instructionContainer}
          >
            <Text style={styles.instructionTitle}>
              What does your test show?
            </Text>
            <Text style={styles.instructionText}>
              Compare your test result with the options below and select the one that matches.
            </Text>
          </Animated.View>

          {/* Result Options */}
          <View style={styles.optionsContainer}>
            {RESULT_OPTIONS.map((option, index) => (
              <ResultOptionCard
                key={option.type}
                option={option}
                isSelected={selectedResult === option.type}
                onSelect={() => setSelectedResult(option.type)}
                delay={index * 100 + 200}
              />
            ))}
          </View>

          {/* Info Card */}
          <Animated.View
            entering={FadeInDown.duration(600).delay(600)}
            style={styles.infoCard}
          >
            <Ionicons name="information-circle" size={24} color={AppColors.info} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Result Interpretation</Text>
              <Text style={styles.infoText}>
                A faint line in the test region (T) still indicates a positive result. 
                Invalid results require a new test.
              </Text>
            </View>
          </Animated.View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <PrimaryButton
            title="Confirm Result"
            onPress={handleConfirm}
            disabled={!selectedResult}
            style={styles.fullButton}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

interface ResultOptionCardProps {
  option: ResultOption;
  isSelected: boolean;
  onSelect: () => void;
  delay: number;
}

function ResultOptionCard({ option, isSelected, onSelect, delay }: ResultOptionCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderColor: isSelected ? option.color : '#E2E8F0',
    borderWidth: isSelected ? 2 : 1,
    backgroundColor: isSelected ? option.bgColor : AppColors.cardBackground,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(delay)}>
      <AnimatedTouchable
        style={[styles.optionCard, animatedStyle]}
        onPress={onSelect}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.optionIconContainer}>
          <TestKitIcon size={70} type={option.icon} animated={false} />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={[styles.optionTitle, { color: option.color }]}>
            {option.title}
          </Text>
          <Text style={styles.optionDescription}>{option.description}</Text>
        </View>
        <View style={[styles.radioButton, isSelected && { borderColor: option.color }]}>
          {isSelected && (
            <View style={[styles.radioButtonInner, { backgroundColor: option.color }]} />
          )}
        </View>
      </AnimatedTouchable>
    </Animated.View>
  );
}

interface ResultConfirmationProps {
  result: ResultType;
  onDone: () => void;
  onRetake: () => void;
}

function ResultConfirmation({ result, onDone, onRetake }: ResultConfirmationProps) {
  const getResultInfo = () => {
    switch (result) {
      case 'negative':
        return {
          title: 'Negative Result',
          subtitle: 'COVID-19 Not Detected',
          description: 'Your test did not detect COVID-19. Continue following local health guidelines and monitor for symptoms.',
          color: AppColors.success,
          bgGradient: ['#DCFCE7', '#BBF7D0'] as const,
          icon: 'negative' as const,
          recommendations: [
            'Continue wearing masks in crowded places',
            'Maintain good hand hygiene',
            'Monitor for symptoms',
            'Test again if symptoms develop',
          ],
        };
      case 'positive':
        return {
          title: 'Positive Result',
          subtitle: 'COVID-19 Detected',
          description: 'Your test detected COVID-19. Please follow isolation guidelines and contact your healthcare provider.',
          color: AppColors.error,
          bgGradient: ['#FEE2E2', '#FECACA'] as const,
          icon: 'positive' as const,
          recommendations: [
            'Self-isolate immediately',
            'Contact your healthcare provider',
            'Inform close contacts',
            'Monitor symptoms closely',
          ],
        };
      case 'invalid':
      default:
        return {
          title: 'Invalid Result',
          subtitle: 'Test Unsuccessful',
          description: 'Your test result is invalid. This may be due to insufficient sample or test error. Please perform a new test.',
          color: AppColors.warning,
          bgGradient: ['#FEF3C7', '#FDE68A'] as const,
          icon: 'kit' as const,
          recommendations: [
            'Use a new test kit',
            'Ensure adequate sample collection',
            'Follow instructions carefully',
            'Wait full 15 minutes',
          ],
        };
    }
  };

  const info = getResultInfo();

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={info.bgGradient}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.confirmationContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Result Icon */}
          <Animated.View
            entering={FadeIn.duration(600)}
            style={styles.resultIconContainer}
          >
            <View style={[styles.resultIconBg, { backgroundColor: info.color + '20' }]}>
              <TestKitIcon size={120} type={info.icon} animated />
            </View>
          </Animated.View>

          {/* Result Text */}
          <Animated.View
            entering={FadeInUp.duration(600).delay(200)}
            style={styles.resultTextContainer}
          >
            <Text style={[styles.resultTitle, { color: info.color }]}>
              {info.title}
            </Text>
            <Text style={styles.resultSubtitle}>{info.subtitle}</Text>
            <Text style={styles.resultDescription}>{info.description}</Text>
          </Animated.View>

          {/* Recommendations */}
          <Animated.View
            entering={FadeInUp.duration(600).delay(400)}
            style={styles.recommendationsCard}
          >
            <Text style={styles.recommendationsTitle}>📋 Recommendations</Text>
            {info.recommendations.map((rec, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.duration(400).delay(500 + index * 100)}
                style={styles.recommendationItem}
              >
                <View style={[styles.recBullet, { backgroundColor: info.color }]}>
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                </View>
                <Text style={styles.recommendationText}>{rec}</Text>
              </Animated.View>
            ))}
          </Animated.View>

          {/* Timestamp */}
          <Animated.View
            entering={FadeIn.duration(600).delay(800)}
            style={styles.timestampContainer}
          >
            <Ionicons name="time-outline" size={16} color={AppColors.textMuted} />
            <Text style={styles.timestampText}>
              Test completed: {new Date().toLocaleString()}
            </Text>
          </Animated.View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.confirmationFooter}>
          {result === 'invalid' ? (
            <PrimaryButton
              title="Take New Test"
              onPress={onRetake}
              style={styles.fullButton}
            />
          ) : (
            <>
              <TouchableOpacity style={styles.secondaryButton} onPress={onRetake}>
                <Text style={styles.secondaryButtonText}>Take Another Test</Text>
              </TouchableOpacity>
              <PrimaryButton
                title="Done"
                onPress={onDone}
                style={styles.doneButton}
              />
            </>
          )}
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
  backButton: {
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  instructionContainer: {
    marginBottom: Spacing.lg,
  },
  instructionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: Spacing.sm,
  },
  instructionText: {
    fontSize: 16,
    color: AppColors.textSecondary,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
  },
  optionIconContainer: {
    marginRight: Spacing.md,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: AppColors.info + '15',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: AppColors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  fullButton: {
    width: '100%',
  },
  // Confirmation styles
  confirmationContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  resultIconContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  resultIconBg: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTextContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  resultSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: Spacing.md,
  },
  resultDescription: {
    fontSize: 16,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: Spacing.md,
  },
  recommendationsCard: {
    backgroundColor: AppColors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.small,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: Spacing.md,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  recBullet: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: AppColors.textSecondary,
    lineHeight: 20,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  timestampText: {
    fontSize: 13,
    color: AppColors.textMuted,
  },
  confirmationFooter: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  secondaryButton: {
    flex: 1,
    height: 56,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.primary,
  },
  doneButton: {
    flex: 1,
  },
});

