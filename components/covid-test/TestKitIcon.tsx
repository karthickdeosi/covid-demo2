import { AppColors } from '@/constants/theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

interface TestKitIconProps {
  size?: number;
  animated?: boolean;
  type?: 'kit' | 'swab' | 'timer' | 'result' | 'positive' | 'negative';
}

export function TestKitIcon({ size = 120, animated = true, type = 'kit' }: TestKitIconProps) {
  const floatY = useSharedValue(0);
  const pulse = useSharedValue(1);

  React.useEffect(() => {
    if (animated) {
      floatY.value = withRepeat(
        withSequence(
          withTiming(-8, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }
  }, [animated, floatY, pulse]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }, { scale: pulse.value }],
  }));

  const renderIcon = () => {
    switch (type) {
      case 'swab':
        return <SwabIcon size={size} />;
      case 'timer':
        return <TimerIcon size={size} />;
      case 'result':
        return <ResultIcon size={size} />;
      case 'positive':
        return <PositiveIcon size={size} />;
      case 'negative':
        return <NegativeIcon size={size} />;
      default:
        return <KitIcon size={size} />;
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {renderIcon()}
    </Animated.View>
  );
}

function KitIcon({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <LinearGradient id="kitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={AppColors.primaryLight} />
          <Stop offset="100%" stopColor={AppColors.primary} />
        </LinearGradient>
        <LinearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="100%" stopColor="#F1F5F9" />
        </LinearGradient>
      </Defs>
      {/* Test kit box */}
      <Rect x="20" y="35" width="80" height="60" rx="8" fill="url(#boxGrad)" stroke={AppColors.primary} strokeWidth="2" />
      {/* Test strip */}
      <Rect x="35" y="50" width="50" height="30" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      {/* Result windows */}
      <Circle cx="50" cy="65" r="6" fill="#E2E8F0" />
      <Circle cx="70" cy="65" r="6" fill="#E2E8F0" />
      {/* Labels */}
      <Rect x="46" y="76" width="8" height="2" rx="1" fill={AppColors.textMuted} />
      <Rect x="66" y="76" width="8" height="2" rx="1" fill={AppColors.textMuted} />
      {/* COVID text */}
      <Rect x="40" y="42" width="40" height="4" rx="2" fill={AppColors.primary} />
      {/* Decorative elements */}
      <Circle cx="95" cy="25" r="4" fill={AppColors.primaryLight} opacity="0.6" />
      <Circle cx="105" cy="35" r="3" fill={AppColors.secondary} opacity="0.4" />
      <Circle cx="15" cy="80" r="3" fill={AppColors.primaryLight} opacity="0.5" />
    </Svg>
  );
}

function SwabIcon({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <LinearGradient id="swabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={AppColors.secondary} />
          <Stop offset="100%" stopColor={AppColors.secondaryLight} />
        </LinearGradient>
      </Defs>
      {/* Swab stick */}
      <Rect x="55" y="20" width="10" height="70" rx="5" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
      {/* Swab tip */}
      <Path
        d="M60 90 Q50 95 50 105 Q50 115 60 115 Q70 115 70 105 Q70 95 60 90"
        fill="url(#swabGrad)"
      />
      {/* Grip lines */}
      <Rect x="57" y="35" width="6" height="2" rx="1" fill="#CBD5E1" />
      <Rect x="57" y="42" width="6" height="2" rx="1" fill="#CBD5E1" />
      <Rect x="57" y="49" width="6" height="2" rx="1" fill="#CBD5E1" />
      {/* Decorative */}
      <Circle cx="30" cy="40" r="4" fill={AppColors.secondaryLight} opacity="0.5" />
      <Circle cx="90" cy="70" r="3" fill={AppColors.primaryLight} opacity="0.6" />
      <Circle cx="85" cy="30" r="2" fill={AppColors.cardPink} opacity="0.4" />
    </Svg>
  );
}

function TimerIcon({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <LinearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={AppColors.primary} />
          <Stop offset="100%" stopColor={AppColors.primaryLight} />
        </LinearGradient>
      </Defs>
      {/* Clock face */}
      <Circle cx="60" cy="65" r="40" fill="#FFFFFF" stroke="url(#timerGrad)" strokeWidth="4" />
      {/* Inner circle */}
      <Circle cx="60" cy="65" r="32" fill="#F0FDFA" />
      {/* Clock hands */}
      <Path d="M60 65 L60 40" stroke={AppColors.primary} strokeWidth="3" strokeLinecap="round" />
      <Path d="M60 65 L75 65" stroke={AppColors.secondary} strokeWidth="2" strokeLinecap="round" />
      {/* Center dot */}
      <Circle cx="60" cy="65" r="4" fill={AppColors.primary} />
      {/* Top button */}
      <Rect x="55" y="15" width="10" height="8" rx="2" fill={AppColors.primary} />
      {/* Hour markers */}
      <Circle cx="60" cy="38" r="2" fill={AppColors.textMuted} />
      <Circle cx="82" cy="65" r="2" fill={AppColors.textMuted} />
      <Circle cx="60" cy="92" r="2" fill={AppColors.textMuted} />
      <Circle cx="38" cy="65" r="2" fill={AppColors.textMuted} />
      {/* Decorative */}
      <Circle cx="100" cy="30" r="4" fill={AppColors.primaryLight} opacity="0.6" />
      <Circle cx="20" cy="90" r="3" fill={AppColors.secondaryLight} opacity="0.5" />
    </Svg>
  );
}

function ResultIcon({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <LinearGradient id="resultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={AppColors.cardBlue} />
          <Stop offset="100%" stopColor={AppColors.cardBlueLight} />
        </LinearGradient>
      </Defs>
      {/* Clipboard */}
      <Rect x="25" y="25" width="70" height="85" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
      {/* Clipboard top */}
      <Rect x="40" y="18" width="40" height="14" rx="4" fill="url(#resultGrad)" />
      {/* Lines */}
      <Rect x="35" y="45" width="50" height="4" rx="2" fill="#E2E8F0" />
      <Rect x="35" y="58" width="40" height="4" rx="2" fill="#E2E8F0" />
      <Rect x="35" y="71" width="45" height="4" rx="2" fill="#E2E8F0" />
      {/* Checkmark */}
      <Circle cx="60" cy="92" r="12" fill={AppColors.success} />
      <Path d="M54 92 L58 96 L67 87" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Decorative */}
      <Circle cx="100" cy="50" r="4" fill={AppColors.cardBlueLight} opacity="0.6" />
      <Circle cx="15" cy="70" r="3" fill={AppColors.primaryLight} opacity="0.5" />
    </Svg>
  );
}

function PositiveIcon({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <LinearGradient id="posGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={AppColors.warning} />
          <Stop offset="100%" stopColor="#FBBF24" />
        </LinearGradient>
      </Defs>
      {/* Test strip background */}
      <Rect x="20" y="30" width="80" height="60" rx="8" fill="#FEF3C7" stroke={AppColors.warning} strokeWidth="2" />
      {/* Test windows */}
      <G>
        <Rect x="35" y="45" width="20" height="30" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <Rect x="65" y="45" width="20" height="30" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        {/* Both lines showing - positive */}
        <Rect x="42" y="52" width="6" height="16" rx="3" fill={AppColors.error} />
        <Rect x="72" y="52" width="6" height="16" rx="3" fill={AppColors.error} />
      </G>
      {/* Labels */}
      <Rect x="40" y="78" width="10" height="3" rx="1" fill={AppColors.textMuted} />
      <Rect x="70" y="78" width="10" height="3" rx="1" fill={AppColors.textMuted} />
      {/* Warning icon */}
      <Circle cx="60" cy="15" r="10" fill={AppColors.warning} />
      <Rect x="58" y="9" width="4" height="8" rx="2" fill="#FFFFFF" />
      <Circle cx="60" cy="20" r="2" fill="#FFFFFF" />
      {/* Decorative */}
      <Circle cx="105" cy="45" r="3" fill="#FBBF24" opacity="0.5" />
      <Circle cx="10" cy="60" r="4" fill={AppColors.warning} opacity="0.4" />
    </Svg>
  );
}

function NegativeIcon({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <LinearGradient id="negGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={AppColors.success} />
          <Stop offset="100%" stopColor="#4ADE80" />
        </LinearGradient>
      </Defs>
      {/* Test strip background */}
      <Rect x="20" y="30" width="80" height="60" rx="8" fill="#DCFCE7" stroke={AppColors.success} strokeWidth="2" />
      {/* Test windows */}
      <G>
        <Rect x="35" y="45" width="20" height="30" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <Rect x="65" y="45" width="20" height="30" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        {/* Only control line showing - negative */}
        <Rect x="42" y="52" width="6" height="16" rx="3" fill={AppColors.success} />
        {/* No line in test window */}
      </G>
      {/* Labels */}
      <Rect x="40" y="78" width="10" height="3" rx="1" fill={AppColors.textMuted} />
      <Rect x="70" y="78" width="10" height="3" rx="1" fill={AppColors.textMuted} />
      {/* Checkmark icon */}
      <Circle cx="60" cy="15" r="10" fill={AppColors.success} />
      <Path d="M54 15 L58 19 L66 11" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Decorative */}
      <Circle cx="105" cy="45" r="3" fill="#4ADE80" opacity="0.5" />
      <Circle cx="10" cy="60" r="4" fill={AppColors.success} opacity="0.4" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

