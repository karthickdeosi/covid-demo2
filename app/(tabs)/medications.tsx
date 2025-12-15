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
    View
} from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
  icon: string;
}

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

const MEDICATIONS: { [key: string]: Medication[] } = {
  Morning: [
    { id: '1', name: 'NeuroCaps', dosage: '2cap', time: '1:10 PM', taken: true, icon: '💊' },
  ],
  Afternoon: [
    { id: '2', name: 'VitaCure', dosage: '2cap', time: '1:10 PM', taken: true, icon: '💊' },
    { id: '3', name: 'Allergon', dosage: '2cap', time: '1:10 PM', taken: false, icon: '💊' },
  ],
  Evening: [
    { id: '4', name: 'SleepWell', dosage: '2cap', time: '1:10 PM', taken: true, icon: '💊' },
  ],
};

export default function MedicationsScreen() {
  const [selectedDay, setSelectedDay] = useState(15);

  const handleAddReminder = () => {
    router.push('/reminder/add');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <LinearGradient
        colors={[AppColors.gradientStart, AppColors.background]}
        style={styles.gradient}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInDown.duration(600)}
          style={styles.header}
        >
          <View style={styles.headerLeft}>
            <Ionicons name="diamond" size={24} color={AppColors.secondary} />
          </View>
          <Text style={styles.headerTitle}>Medications</Text>
          <TouchableOpacity style={styles.headerRight}>
            <Ionicons name="calendar" size={24} color={AppColors.textPrimary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Calendar Strip */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(100)}
          style={styles.calendarStrip}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.calendarContent}
          >
            {DAYS.map((day, index) => (
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

        {/* Date Header */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.dateHeader}
        >
          <Text style={styles.dateTitle}>Thursday, October {selectedDay}</Text>
          <TouchableOpacity style={styles.todayButton}>
            <Text style={styles.todayText}>Today</Text>
            <Ionicons name="play" size={12} color={AppColors.primary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Medications List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(MEDICATIONS).map(([timeOfDay, meds], sectionIndex) => (
            <Animated.View
              key={timeOfDay}
              entering={FadeInDown.duration(500).delay(300 + sectionIndex * 100)}
              style={styles.section}
            >
              <View style={styles.sectionHeader}>
                <Ionicons
                  name={
                    timeOfDay === 'Morning'
                      ? 'sunny-outline'
                      : timeOfDay === 'Afternoon'
                      ? 'partly-sunny-outline'
                      : 'moon-outline'
                  }
                  size={18}
                  color={AppColors.textSecondary}
                />
                <Text style={styles.sectionTitle}>{timeOfDay}</Text>
              </View>
              {meds.map((med, index) => (
                <Animated.View
                  key={med.id}
                  entering={FadeInRight.duration(400).delay(400 + index * 100)}
                >
                  <MedicationCard medication={med} />
                </Animated.View>
              ))}
            </Animated.View>
          ))}
        </ScrollView>

        {/* Floating Add Button */}
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleAddReminder}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[AppColors.primary, AppColors.primaryDark]}
            style={styles.floatingButtonGradient}
          >
            <Ionicons name="add" size={28} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

interface MedicationCardProps {
  medication: Medication;
}

function MedicationCard({ medication }: MedicationCardProps) {
  return (
    <View style={styles.medCard}>
      <TouchableOpacity
        style={[
          styles.checkButton,
          medication.taken && styles.checkButtonChecked,
        ]}
      >
        {medication.taken && (
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        )}
      </TouchableOpacity>
      <View style={styles.medIcon}>
        <Text style={styles.medIconText}>{medication.icon}</Text>
      </View>
      <View style={styles.medInfo}>
        <Text style={styles.medName}>{medication.name}</Text>
        <Text style={styles.medDosage}>{medication.dosage}</Text>
      </View>
      <Text style={styles.medTime}>{medication.time}</Text>
    </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerLeft: {
    width: 44,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },
  headerRight: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AppColors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },
  calendarStrip: {
    paddingVertical: Spacing.sm,
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
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  dateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
  todayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  todayText: {
    fontSize: 14,
    fontWeight: '500',
    color: AppColors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 120,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: AppColors.textSecondary,
  },
  medCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.small,
  },
  checkButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: AppColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  checkButtonChecked: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  medIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: AppColors.primaryLight + '30',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  medIconText: {
    fontSize: 24,
  },
  medInfo: {
    flex: 1,
  },
  medName: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.textPrimary,
  },
  medDosage: {
    fontSize: 13,
    color: AppColors.textSecondary,
    marginTop: 2,
  },
  medTime: {
    fontSize: 14,
    color: AppColors.textSecondary,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 110,
    right: Spacing.lg,
    ...Shadows.large,
  },
  floatingButtonGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

