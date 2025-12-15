import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    FadeInDown,
    FadeInRight,
    Layout,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TestResult {
  id: string;
  date: Date;
  result: 'positive' | 'negative' | 'invalid';
  notes?: string;
}

// Mock data for demonstration
const MOCK_RESULTS: TestResult[] = [
  {
    id: '1',
    date: new Date(2024, 11, 10, 14, 30),
    result: 'negative',
  },
  {
    id: '2',
    date: new Date(2024, 11, 5, 9, 15),
    result: 'negative',
  },
  {
    id: '3',
    date: new Date(2024, 10, 28, 11, 0),
    result: 'positive',
    notes: 'Mild symptoms',
  },
  {
    id: '4',
    date: new Date(2024, 10, 20, 16, 45),
    result: 'invalid',
    notes: 'Retested',
  },
  {
    id: '5',
    date: new Date(2024, 10, 15, 8, 30),
    result: 'negative',
  },
];

type FilterType = 'all' | 'positive' | 'negative' | 'invalid';

export default function HistoryScreen() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredResults = MOCK_RESULTS.filter(
    (r) => filter === 'all' || r.result === filter
  );

  const getResultColor = (result: TestResult['result']) => {
    switch (result) {
      case 'positive':
        return AppColors.error;
      case 'negative':
        return AppColors.success;
      case 'invalid':
        return AppColors.warning;
    }
  };

  const getResultBgColor = (result: TestResult['result']) => {
    switch (result) {
      case 'positive':
        return '#FEE2E2';
      case 'negative':
        return '#DCFCE7';
      case 'invalid':
        return '#FEF3C7';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const stats = {
    total: MOCK_RESULTS.length,
    negative: MOCK_RESULTS.filter((r) => r.result === 'negative').length,
    positive: MOCK_RESULTS.filter((r) => r.result === 'positive').length,
    invalid: MOCK_RESULTS.filter((r) => r.result === 'invalid').length,
  };

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
          <Text style={styles.headerTitle}>Test History</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Stats Cards */}
        <Animated.View
          entering={FadeInDown.duration(500)}
          style={styles.statsContainer}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statsScroll}
          >
            <StatCard
              label="Total Tests"
              value={stats.total}
              color={AppColors.primary}
              delay={100}
            />
            <StatCard
              label="Negative"
              value={stats.negative}
              color={AppColors.success}
              delay={200}
            />
            <StatCard
              label="Positive"
              value={stats.positive}
              color={AppColors.error}
              delay={300}
            />
            <StatCard
              label="Invalid"
              value={stats.invalid}
              color={AppColors.warning}
              delay={400}
            />
          </ScrollView>
        </Animated.View>

        {/* Filter Tabs */}
        <Animated.View
          entering={FadeInDown.duration(500).delay(200)}
          style={styles.filterContainer}
        >
          <FilterTab
            label="All"
            isActive={filter === 'all'}
            onPress={() => setFilter('all')}
          />
          <FilterTab
            label="Negative"
            isActive={filter === 'negative'}
            onPress={() => setFilter('negative')}
            color={AppColors.success}
          />
          <FilterTab
            label="Positive"
            isActive={filter === 'positive'}
            onPress={() => setFilter('positive')}
            color={AppColors.error}
          />
          <FilterTab
            label="Invalid"
            isActive={filter === 'invalid'}
            onPress={() => setFilter('invalid')}
            color={AppColors.warning}
          />
        </Animated.View>

        {/* Results List */}
        <FlatList
          data={filteredResults}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInRight.duration(400).delay(index * 100)}
              layout={Layout.springify()}
            >
              <TouchableOpacity style={styles.resultCard} activeOpacity={0.8}>
                <View
                  style={[
                    styles.resultIndicator,
                    { backgroundColor: getResultBgColor(item.result) },
                  ]}
                >
                  <Ionicons
                    name={
                      item.result === 'negative'
                        ? 'checkmark-circle'
                        : item.result === 'positive'
                        ? 'alert-circle'
                        : 'help-circle'
                    }
                    size={28}
                    color={getResultColor(item.result)}
                  />
                </View>
                <View style={styles.resultContent}>
                  <Text
                    style={[
                      styles.resultLabel,
                      { color: getResultColor(item.result) },
                    ]}
                  >
                    {item.result.charAt(0).toUpperCase() + item.result.slice(1)}
                  </Text>
                  <Text style={styles.resultDate}>{formatDate(item.date)}</Text>
                  {item.notes && (
                    <Text style={styles.resultNotes}>{item.notes}</Text>
                  )}
                </View>
                <View style={styles.resultTime}>
                  <Text style={styles.timeText}>{formatTime(item.date)}</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={AppColors.textMuted}
                  />
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
          ListEmptyComponent={
            <Animated.View
              entering={FadeInDown.duration(500)}
              style={styles.emptyContainer}
            >
              <Ionicons
                name="document-text-outline"
                size={64}
                color={AppColors.textMuted}
              />
              <Text style={styles.emptyText}>No tests found</Text>
              <Text style={styles.emptySubtext}>
                Results matching your filter will appear here
              </Text>
            </Animated.View>
          }
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  color: string;
  delay: number;
}

function StatCard({ label, value, color, delay }: StatCardProps) {
  return (
    <Animated.View
      entering={FadeInRight.duration(400).delay(delay)}
      style={[styles.statCard, { borderLeftColor: color }]}
    >
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );
}

interface FilterTabProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  color?: string;
}

function FilterTab({ label, isActive, onPress, color }: FilterTabProps) {
  return (
    <TouchableOpacity
      style={[
        styles.filterTab,
        isActive && {
          backgroundColor: color || AppColors.primary,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.filterTabText,
          isActive && styles.filterTabTextActive,
        ]}
      >
        {label}
      </Text>
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
  statsContainer: {
    marginBottom: Spacing.md,
  },
  statsScroll: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  statCard: {
    backgroundColor: AppColors.cardBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    minWidth: 100,
    borderLeftWidth: 4,
    ...Shadows.small,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    color: AppColors.textSecondary,
    marginTop: 2,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  filterTab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: AppColors.cardBackground,
    ...Shadows.small,
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '500',
    color: AppColors.textSecondary,
  },
  filterTabTextActive: {
    color: AppColors.textLight,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.sm,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.small,
  },
  resultIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  resultContent: {
    flex: 1,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  resultDate: {
    fontSize: 14,
    color: AppColors.textSecondary,
    marginTop: 2,
  },
  resultNotes: {
    fontSize: 12,
    color: AppColors.textMuted,
    marginTop: 2,
    fontStyle: 'italic',
  },
  resultTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  timeText: {
    fontSize: 13,
    color: AppColors.textMuted,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.textSecondary,
    marginTop: Spacing.md,
  },
  emptySubtext: {
    fontSize: 14,
    color: AppColors.textMuted,
    marginTop: Spacing.xs,
  },
});

