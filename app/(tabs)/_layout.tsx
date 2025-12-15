import { AppColors, Shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: AppColors.primary,
          tabBarInactiveTintColor: AppColors.textMuted,
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarItemStyle: styles.tabBarItem,
          tabBarShowLabel: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon 
                name={focused ? 'calendar' : 'calendar-outline'} 
                color={color} 
                focused={focused} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="health"
          options={{
            title: 'Health',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon 
                name={focused ? 'heart' : 'heart-outline'} 
                color={color} 
                focused={focused} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="placeholder"
          options={{
            title: '',
            tabBarButton: () => <FloatingActionButton />,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}
        />
        <Tabs.Screen
          name="medications"
          options={{
            title: 'Meds',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon 
                name={focused ? 'medical' : 'medical-outline'} 
                color={color} 
                focused={focused} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon 
                name={focused ? 'person' : 'person-outline'} 
                color={color} 
                focused={focused} 
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

interface TabBarIconProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  focused: boolean;
}

function TabBarIcon({ name, color, focused }: TabBarIconProps) {
  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
      <Ionicons name={name} size={24} color={color} />
    </View>
  );
}

function FloatingActionButton() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handlePress = () => {
    router.push('/covid-test/instructions');
  };

  return (
    <View style={styles.fabContainer}>
      <AnimatedTouchable
        style={[styles.fab, animatedStyle]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </AnimatedTouchable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    backgroundColor: AppColors.cardBackground,
    borderTopWidth: 0,
    height: Platform.OS === 'ios' ? 100 : 100,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...Shadows.large,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  tabBarItem: {
    paddingTop: 4,
  },
  iconContainer: {
    width: 44,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  iconContainerFocused: {
    backgroundColor: AppColors.primaryLight + '30',
  },
  fabContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    top: -20,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.large,
  },
});
