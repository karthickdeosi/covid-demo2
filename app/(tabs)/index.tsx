import { HealthCard, PrimaryButton, TestKitIcon } from '@/components/covid-test';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInRight,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DaySchedule {
  date: number;
  day: string;
  isSelected: boolean;
  hasMeds: boolean;
}

const DAYS: DaySchedule[] = [
  { date: 11, day: 'Sun', isSelected: false, hasMeds: false },
  { date: 12, day: 'Mon', isSelected: false, hasMeds: false },
  { date: 13, day: 'Tue', isSelected: false, hasMeds: true },
  { date: 14, day: 'Wed', isSelected: false, hasMeds: false },
  { date: 15, day: 'Thu', isSelected: true, hasMeds: true },
  { date: 16, day: 'Fri', isSelected: false, hasMeds: false },
  { date: 17, day: 'Sat', isSelected: false, hasMeds: false },
];

export default function HomeScreen() {
  const [selectedDay, setSelectedDay] = useState(15);

  const handleStartTest = () => {
    router.push('/covid-test/instructions');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <LinearGradient
        colors={[AppColors.gradientStart, AppColors.gradientEnd, AppColors.background]}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View 
            entering={FadeInDown.duration(600).delay(100)}
            style={styles.header}
          >
            <View>
              <Text style={styles.greeting}>Hello! 👋</Text>
              <Text style={styles.title}>COVID-19 Self Test</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color={AppColors.textPrimary} />
            </TouchableOpacity>
          </Animated.View>

          {/* Calendar Strip */}
          <Animated.View
            entering={FadeInDown.duration(600).delay(150)}
            style={styles.calendarStrip}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.calendarContent}
            >
              {DAYS.map((day) => (
                <TouchableOpacity
                  key={day.date}
                  style={[
                    styles.dayItem,
                    day.date === selectedDay && styles.dayItemSelected,
                  ]}
                  onPress={() => setSelectedDay(day.date)}
                >
                  <Text
                    style={[
                      styles.dayDate,
                      day.date === selectedDay && styles.dayDateSelected,
                    ]}
                  >
                    {day.date}
                  </Text>
                  <Text
                    style={[
                      styles.dayName,
                      day.date === selectedDay && styles.dayNameSelected,
                    ]}
                  >
                    {day.day}
                  </Text>
                  {day.hasMeds && (
                    <View
                      style={[
                        styles.medIndicator,
                        day.date === selectedDay && styles.medIndicatorSelected,
                      ]}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>

          {/* Main Test Card */}
          <Animated.View
            entering={FadeInDown.duration(600).delay(200)}
            style={styles.mainCardContainer}
          >
            <LinearGradient
              colors={[AppColors.primary, AppColors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.mainCard}
            >
              <View style={styles.mainCardContent}>
                <View style={styles.mainCardText}>
                  <Text style={styles.mainCardTitle}>Start Your Test</Text>
                  <Text style={styles.mainCardSubtitle}>
                    Follow simple steps to complete your COVID-19 self-test at home
                  </Text>
                  <View style={styles.mainCardButton}>
                    <PrimaryButton
                      title="Begin Test"
                      onPress={handleStartTest}
                      variant="secondary"
                    />
                  </View>
                </View>
                <View style={styles.mainCardIcon}>
                  <TestKitIcon size={100} type="kit" animated />
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Health Cards Grid */}
          <Animated.View
            entering={FadeInDown.duration(600).delay(300)}
            style={styles.sectionHeader}
          >
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </Animated.View>

          <View style={styles.cardsGrid}>
            <HealthCard
              gradientColors={[AppColors.cardPurple, AppColors.cardPurpleLight]}
              delay={400}
              onPress={() => router.push('/covid-test/history')}
              style={styles.gridCard}
            >
              <Text style={styles.cardLabel}>HISTORY</Text>
              <View style={styles.cardIconSmall}>
                <TestKitIcon size={60} type="result" animated={false} />
              </View>
              <Text style={styles.cardValue}>View Results</Text>
              <Text style={styles.cardSubtext}>Past tests</Text>
            </HealthCard>

            <HealthCard
              gradientColors={[AppColors.cardTeal, AppColors.cardTealLight]}
              delay={500}
              onPress={handleStartTest}
              style={styles.gridCard}
            >
              <Text style={styles.cardLabel}>NEW TEST</Text>
              <View style={styles.cardIconSmall}>
                <TestKitIcon size={60} type="swab" animated={false} />
              </View>
              <Text style={styles.cardValue}>Start Now</Text>
              <Text style={styles.cardSubtext}>~15 minutes</Text>
            </HealthCard>
          </View>

          {/* Info Cards */}
          <View style={styles.cardsGrid}>
            <HealthCard
              gradientColors={['#3B82F6', '#60A5FA']}
              delay={600}
              onPress={() => router.push('/reminder/add')}
              style={styles.gridCard}
            >
              <Text style={styles.cardLabel}>REMINDER</Text>
              <View style={styles.cardIconSmall}>
                <TestKitIcon size={60} type="timer" animated={false} />
              </View>
              <Text style={styles.cardValue}>Set Alert</Text>
              <Text style={styles.cardSubtext}>Daily reminder</Text>
            </HealthCard>

            <HealthCard
              gradientColors={['#EC4899', '#F472B6']}
              delay={700}
              style={styles.gridCard}
            >
              <Text style={styles.cardLabel}>HELP</Text>
              <View style={styles.cardIconSmall}>
                <Text style={styles.helpIcon}>?</Text>
              </View>
              <Text style={styles.cardValue}>Guide</Text>
              <Text style={styles.cardSubtext}>Instructions</Text>
            </HealthCard>
          </View>

          {/* Tips Section */}
          <Animated.View
            entering={FadeInRight.duration(600).delay(800)}
            style={styles.tipsContainer}
          >
            <Text style={styles.sectionTitle}>Tips for Accurate Results</Text>
            <View style={styles.tipCard}>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet}>
                  <Text style={styles.tipBulletText}>1</Text>
                </View>
                <Text style={styles.tipText}>
                  Wash your hands thoroughly before testing
                </Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet}>
                  <Text style={styles.tipBulletText}>2</Text>
                </View>
                <Text style={styles.tipText}>
                  Follow the swab technique carefully
                </Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipBullet}>
                  <Text style={styles.tipBulletText}>3</Text>
                </View>
                <Text style={styles.tipText}>
                  Wait the full 15 minutes for results
                </Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  greeting: {
    fontSize: 16,
    color: AppColors.textSecondary,
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AppColors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },
  calendarStrip: {
    marginBottom: Spacing.lg,
    marginHorizontal: -Spacing.lg,
  },
  calendarContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  dayItem: {
    width: 50,
    height: 70,
    borderRadius: BorderRadius.lg,
    backgroundColor: AppColors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },
  dayItemSelected: {
    backgroundColor: AppColors.primary,
  },
  dayDate: {
    fontSize: 18,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
  dayDateSelected: {
    color: '#FFFFFF',
  },
  dayName: {
    fontSize: 12,
    color: AppColors.textSecondary,
    marginTop: 2,
  },
  dayNameSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  medIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: AppColors.primary,
    marginTop: 4,
  },
  medIndicatorSelected: {
    backgroundColor: '#FFFFFF',
  },
  mainCardContainer: {
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.large,
  },
  mainCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
  },
  mainCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainCardText: {
    flex: 1,
    paddingRight: Spacing.md,
  },
  mainCardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: AppColors.textLight,
    marginBottom: Spacing.sm,
  },
  mainCardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  mainCardButton: {
    alignSelf: 'flex-start',
  },
  mainCardIcon: {
    marginLeft: 'auto',
  },
  sectionHeader: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: Spacing.sm,
  },
  cardsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  gridCard: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  cardIconSmall: {
    marginBottom: Spacing.sm,
    height: 60,
    justifyContent: 'center',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: AppColors.textLight,
  },
  cardSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  helpIcon: {
    fontSize: 40,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  tipsContainer: {
    marginTop: Spacing.md,
  },
  tipCard: {
    backgroundColor: AppColors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.small,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  tipBullet: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  tipBulletText: {
    color: AppColors.textLight,
    fontWeight: '600',
    fontSize: 14,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: AppColors.textSecondary,
    lineHeight: 20,
  },
});
