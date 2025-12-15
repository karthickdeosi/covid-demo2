import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  url?: string;
}

const RESOURCES: ResourceItem[] = [
  {
    id: '1',
    title: 'CDC COVID-19 Guidelines',
    description: 'Official testing and isolation guidelines',
    icon: 'shield-checkmark',
    color: AppColors.primary,
    url: 'https://www.cdc.gov/covid',
  },
  {
    id: '2',
    title: 'WHO COVID-19 Information',
    description: 'Global health updates and recommendations',
    icon: 'globe',
    color: AppColors.secondary,
    url: 'https://www.who.int/covid-19',
  },
  {
    id: '3',
    title: 'Symptom Checker',
    description: 'Check if you should get tested',
    icon: 'medical',
    color: AppColors.cardPink,
  },
  {
    id: '4',
    title: 'Find Testing Centers',
    description: 'Locate nearby testing facilities',
    icon: 'location',
    color: AppColors.cardBlue,
  },
  {
    id: '5',
    title: 'Vaccination Info',
    description: 'Learn about COVID-19 vaccines',
    icon: 'fitness',
    color: AppColors.success,
  },
  {
    id: '6',
    title: 'FAQs',
    description: 'Common questions about self-testing',
    icon: 'help-circle',
    color: AppColors.warning,
  },
];

const FAQ_ITEMS = [
  {
    question: 'How accurate are at-home COVID tests?',
    answer: 'When used correctly, at-home COVID-19 antigen tests are highly accurate, especially during the first week of infection when viral loads are highest.',
  },
  {
    question: 'When should I test?',
    answer: 'Test if you have symptoms, have been exposed to someone with COVID-19, or before/after travel or gatherings.',
  },
  {
    question: 'What if my test is positive?',
    answer: 'Isolate from others, monitor your symptoms, and contact your healthcare provider. Inform close contacts.',
  },
  {
    question: 'How long should I wait for results?',
    answer: 'Most at-home tests require 15 minutes. Do not read results after 30 minutes as they may be inaccurate.',
  },
];

export default function ExploreScreen() {
  const handleResourcePress = (resource: ResourceItem) => {
    if (resource.url) {
      Linking.openURL(resource.url);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[AppColors.gradientStart, AppColors.background]}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View
            entering={FadeInDown.duration(600)}
            style={styles.header}
          >
            <Text style={styles.title}>Resources</Text>
            <Text style={styles.subtitle}>
              Helpful information and guidelines
            </Text>
          </Animated.View>

          {/* Quick Links */}
          <Animated.View
            entering={FadeInDown.duration(600).delay(100)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Quick Links</Text>
            <View style={styles.resourcesGrid}>
              {RESOURCES.slice(0, 4).map((resource, index) => (
                <Animated.View
                  key={resource.id}
                  entering={FadeInRight.duration(400).delay(index * 100 + 200)}
                  style={styles.resourceCardWrapper}
                >
                  <TouchableOpacity
                    style={styles.resourceCard}
                    onPress={() => handleResourcePress(resource)}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.resourceIcon,
                        { backgroundColor: resource.color + '20' },
                      ]}
                    >
                      <Ionicons
                        name={resource.icon}
                        size={24}
                        color={resource.color}
                      />
                    </View>
                    <Text style={styles.resourceTitle} numberOfLines={2}>
                      {resource.title}
                    </Text>
                    <Text style={styles.resourceDescription} numberOfLines={2}>
                      {resource.description}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* More Resources */}
          <Animated.View
            entering={FadeInDown.duration(600).delay(400)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>More Resources</Text>
            {RESOURCES.slice(4).map((resource, index) => (
              <Animated.View
                key={resource.id}
                entering={FadeInRight.duration(400).delay(index * 100 + 500)}
              >
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => handleResourcePress(resource)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.listItemIcon,
                      { backgroundColor: resource.color + '20' },
                    ]}
                  >
                    <Ionicons
                      name={resource.icon}
                      size={22}
                      color={resource.color}
                    />
                  </View>
                  <View style={styles.listItemContent}>
                    <Text style={styles.listItemTitle}>{resource.title}</Text>
                    <Text style={styles.listItemDescription}>
                      {resource.description}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={AppColors.textMuted}
                  />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </Animated.View>

          {/* FAQs */}
          <Animated.View
            entering={FadeInDown.duration(600).delay(600)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            {FAQ_ITEMS.map((faq, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.duration(400).delay(index * 100 + 700)}
              >
                <FAQCard question={faq.question} answer={faq.answer} />
              </Animated.View>
            ))}
          </Animated.View>

          {/* Emergency Banner */}
          <Animated.View
            entering={FadeInDown.duration(600).delay(900)}
            style={styles.emergencyBanner}
          >
            <LinearGradient
              colors={[AppColors.error, '#F87171']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.emergencyGradient}
            >
              <Ionicons name="call" size={24} color="#FFFFFF" />
              <View style={styles.emergencyContent}>
                <Text style={styles.emergencyTitle}>Emergency?</Text>
                <Text style={styles.emergencyText}>
                  Call 911 if you have severe symptoms
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

interface FAQCardProps {
  question: string;
  answer: string;
}

function FAQCard({ question, answer }: FAQCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <TouchableOpacity
      style={styles.faqCard}
      onPress={() => setIsExpanded(!isExpanded)}
      activeOpacity={0.8}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{question}</Text>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={AppColors.textMuted}
        />
      </View>
      {isExpanded && (
        <Animated.View entering={FadeInDown.duration(300)}>
          <Text style={styles.faqAnswer}>{answer}</Text>
        </Animated.View>
      )}
    </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  header: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: AppColors.textSecondary,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: Spacing.md,
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  resourceCardWrapper: {
    width: '47%',
  },
  resourceCard: {
    backgroundColor: AppColors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.small,
  },
  resourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 12,
    color: AppColors.textSecondary,
    lineHeight: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.small,
  },
  listItemIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: 2,
  },
  listItemDescription: {
    fontSize: 13,
    color: AppColors.textSecondary,
  },
  faqCard: {
    backgroundColor: AppColors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.small,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: AppColors.textPrimary,
    paddingRight: Spacing.sm,
  },
  faqAnswer: {
    fontSize: 14,
    color: AppColors.textSecondary,
    lineHeight: 22,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
  },
  emergencyBanner: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  emergencyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  emergencyContent: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  emergencyText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});
