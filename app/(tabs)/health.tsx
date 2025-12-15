import { HealthCard, TestKitIcon } from '@/components/covid-test';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HealthMetric {
  id: string;
  title: string;
  value: string;
  unit: string;
  icon: string;
  lastUpdate: string;
  gradientColors: readonly [string, string, ...string[]];
}

const HEALTH_METRICS: HealthMetric[] = [
  {
    id: '1',
    title: 'MOOD',
    value: 'Satisfied',
    unit: '',
    icon: '😊',
    lastUpdate: 'Yesterday',
    gradientColors: ['#8B5CF6', '#C4B5FD'],
  },
  {
    id: '2',
    title: 'WEIGHT',
    value: '58',
    unit: 'kg',
    icon: '⚖️',
    lastUpdate: '3d ago',
    gradientColors: ['#EC4899', '#F9A8D4'],
  },
  {
    id: '3',
    title: 'TEMPERATURE',
    value: '36.6',
    unit: '°C',
    icon: '🌡️',
    lastUpdate: '3d ago',
    gradientColors: ['#3B82F6', '#93C5FD'],
  },
  {
    id: '4',
    title: 'BLOOD PRESSURE',
    value: '120/80',
    unit: '',
    icon: '❤️',
    lastUpdate: '3m ago',
    gradientColors: ['#14B8A6', '#5EEAD4'],
  },
];

export default function HealthScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
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
            <Text style={styles.title}>Health Monitoring</Text>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color={AppColors.textPrimary} />
            </TouchableOpacity>
          </Animated.View>

          {/* Health Metrics Grid */}
          <View style={styles.metricsGrid}>
            {HEALTH_METRICS.map((metric, index) => (
              <Animated.View
                key={metric.id}
                entering={FadeInRight.duration(400).delay(index * 100 + 200)}
                style={styles.metricCardWrapper}
              >
                <HealthCard
                  gradientColors={metric.gradientColors}
                  delay={0}
                  style={styles.metricCard}
                >
                  <View style={styles.metricHeader}>
                    <Text style={styles.metricLabel}>{metric.title}</Text>
                    {metric.id === '1' && (
                      <TouchableOpacity>
                        <Text style={styles.addTodayText}>Add Today</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text style={styles.metricIcon}>{metric.icon}</Text>
                  <View style={styles.metricValueContainer}>
                    <Text style={styles.metricValue}>{metric.value}</Text>
                    {metric.unit && (
                      <Text style={styles.metricUnit}>{metric.unit}</Text>
                    )}
                  </View>
                  <View style={styles.metricFooter}>
                    <Text style={styles.lastUpdateText}>last update {metric.lastUpdate}</Text>
                    {metric.id === '1' && (
                      <TouchableOpacity>
                        <Text style={styles.historyLink}>History</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </HealthCard>
              </Animated.View>
            ))}
          </View>

          {/* Custom Metrics Section */}
          <Animated.View
            entering={FadeInDown.duration(600).delay(600)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Custom Metrics</Text>
            <View style={styles.customMetricsRow}>
              <HealthCard
                gradientColors={['#0EA5E9', '#38BDF8']}
                delay={700}
                style={styles.customCard}
              >
                <Text style={styles.metricLabel}>CUSTOM</Text>
                <View style={styles.customIconContainer}>
                  <Ionicons name="clipboard" size={32} color="rgba(255,255,255,0.9)" />
                </View>
                <Text style={styles.metricValue}>12</Text>
                <Text style={styles.metricUnit}>mg</Text>
              </HealthCard>

              <TouchableOpacity style={styles.addCustomCard}>
                <View style={styles.addCustomContent}>
                  <Text style={styles.customLabel}>CUSTOM</Text>
                  <View style={styles.addIconContainer}>
                    <Ionicons name="add" size={40} color={AppColors.primary} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* COVID Test Quick Action */}
          <Animated.View
            entering={FadeInDown.duration(600).delay(800)}
            style={styles.covidTestCard}
          >
            <TouchableOpacity 
              style={styles.covidTestButton}
              onPress={() => router.push('/covid-test/instructions')}
            >
              <View style={styles.covidTestContent}>
                <TestKitIcon size={60} type="kit" animated={false} />
                <View style={styles.covidTestText}>
                  <Text style={styles.covidTestTitle}>COVID-19 Self Test</Text>
                  <Text style={styles.covidTestSubtitle}>Take a quick test at home</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color={AppColors.primary} />
            </TouchableOpacity>
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
    alignItems: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  metricCardWrapper: {
    width: '47%',
  },
  metricCard: {
    minHeight: 160,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 1,
  },
  addTodayText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    textDecorationLine: 'underline',
  },
  metricIcon: {
    fontSize: 36,
    marginBottom: Spacing.sm,
  },
  metricValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  metricUnit: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  metricFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  lastUpdateText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  historyLink: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    textDecorationLine: 'underline',
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: Spacing.md,
  },
  customMetricsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  customCard: {
    flex: 1,
    minHeight: 140,
  },
  customIconContainer: {
    marginVertical: Spacing.sm,
  },
  addCustomCard: {
    flex: 1,
    minHeight: 140,
    backgroundColor: AppColors.cardBackground,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: AppColors.primary,
    borderStyle: 'dashed',
    padding: Spacing.md,
    justifyContent: 'center',
  },
  addCustomContent: {
    alignItems: 'flex-start',
  },
  customLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: AppColors.primary,
    letterSpacing: 1,
    marginBottom: Spacing.md,
  },
  addIconContainer: {
    alignSelf: 'center',
  },
  covidTestCard: {
    backgroundColor: AppColors.cardBackground,
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
    marginBottom: Spacing.xl,
  },
  covidTestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  covidTestContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  covidTestText: {
    marginLeft: Spacing.md,
  },
  covidTestTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },
  covidTestSubtitle: {
    fontSize: 13,
    color: AppColors.textSecondary,
    marginTop: 2,
  },
});

