import { PrimaryButton, TestKitIcon } from '@/components/covid-test';
import { AppColors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInDown,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const HOURS = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
const PERIODS = ['AM', 'PM'];

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;

interface WheelPickerProps {
  data: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

function WheelPicker({ data, selectedIndex, onSelect }: WheelPickerProps) {
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (index >= 0 && index < data.length && index !== selectedIndex) {
      onSelect(index);
    }
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (index >= 0 && index < data.length) {
      flatListRef.current?.scrollToOffset({
        offset: index * ITEM_HEIGHT,
        animated: true,
      });
      onSelect(index);
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: selectedIndex * ITEM_HEIGHT,
        animated: false,
      });
    }, 100);
  }, []);

  return (
    <View style={styles.wheelContainer}>
      <View style={styles.selectedIndicator} />
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => `${item}-${index}`}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={{
          paddingVertical: (VISIBLE_ITEMS - 1) / 2 * ITEM_HEIGHT,
        }}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        renderItem={({ item, index }) => {
          const isSelected = index === selectedIndex;
          return (
            <TouchableOpacity
              style={styles.wheelItem}
              onPress={() => {
                flatListRef.current?.scrollToOffset({
                  offset: index * ITEM_HEIGHT,
                  animated: true,
                });
                onSelect(index);
              }}
            >
              <Text
                style={[
                  styles.wheelItemText,
                  isSelected && styles.wheelItemTextSelected,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default function AddReminderScreen() {
  const [selectedHour, setSelectedHour] = useState(9);
  const [selectedMinute, setSelectedMinute] = useState(30);
  const [selectedPeriod, setSelectedPeriod] = useState(1); // PM
  const [alarmSound, setAlarmSound] = useState(true);

  const handleClose = () => {
    router.back();
  };

  const handleNext = () => {
    // Save reminder logic here
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <LinearGradient
        colors={[AppColors.background, AppColors.background]}
        style={styles.gradient}
      >
        {/* Header with close button */}
        <Animated.View
          entering={FadeIn.duration(400)}
          style={styles.header}
        >
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="chevron-down" size={28} color={AppColors.textPrimary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Icon */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(100)}
          style={styles.iconContainer}
        >
          <TestKitIcon size={80} type="timer" animated />
        </Animated.View>

        {/* Title */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.titleContainer}
        >
          <Text style={styles.title}>What time would you like to remind?</Text>
          <Text style={styles.subtitle}>
            Sets a reminder to alert you at what point you should weight measure.
          </Text>
        </Animated.View>

        {/* Time Picker */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(300)}
          style={styles.pickerContainer}
        >
          <View style={styles.pickerRow}>
            <WheelPicker
              data={HOURS}
              selectedIndex={selectedHour}
              onSelect={setSelectedHour}
            />
            <WheelPicker
              data={MINUTES}
              selectedIndex={selectedMinute}
              onSelect={setSelectedMinute}
            />
            <WheelPicker
              data={PERIODS}
              selectedIndex={selectedPeriod}
              onSelect={setSelectedPeriod}
            />
          </View>
        </Animated.View>

        {/* Alarm Sound Toggle */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(400)}
          style={styles.toggleContainer}
        >
          <Text style={styles.toggleLabel}>Add alarm sound</Text>
          <Switch
            value={alarmSound}
            onValueChange={setAlarmSound}
            trackColor={{ false: '#E2E8F0', true: AppColors.primaryLight }}
            thumbColor={alarmSound ? AppColors.primary : '#F1F5F9'}
            ios_backgroundColor="#E2E8F0"
          />
        </Animated.View>

        {/* Next Button */}
        <Animated.View
          entering={SlideInDown.duration(600).delay(500)}
          style={styles.buttonContainer}
        >
          <PrimaryButton
            title="Next"
            onPress={handleNext}
            style={styles.nextButton}
          />
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  gradient: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: AppColors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  pickerContainer: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
  },
  wheelContainer: {
    width: 80,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: 'hidden',
    position: 'relative',
  },
  selectedIndicator: {
    position: 'absolute',
    top: (ITEM_HEIGHT * VISIBLE_ITEMS - ITEM_HEIGHT) / 2,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    backgroundColor: AppColors.primaryLight + '20',
    borderRadius: BorderRadius.md,
    zIndex: 0,
  },
  wheelItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelItemText: {
    fontSize: 22,
    color: AppColors.textMuted,
    fontWeight: '500',
  },
  wheelItemTextSelected: {
    fontSize: 26,
    color: AppColors.primary,
    fontWeight: '700',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: AppColors.cardBackground,
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
  },
  toggleLabel: {
    fontSize: 16,
    color: AppColors.textPrimary,
    fontWeight: '500',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  nextButton: {
    width: '100%',
  },
});

