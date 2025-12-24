import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_HORIZONTAL_PADDING = 20 * 2;
const CONTAINER_HORIZONTAL_PADDING = 12 * 2;
const ESTIMATED_CONTAINER_WIDTH = SCREEN_WIDTH - TAB_BAR_HORIZONTAL_PADDING - CONTAINER_HORIZONTAL_PADDING;

type TabConfig = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const TAB_CONFIG: Record<string, TabConfig> = {
  index: { label: 'Modes', icon: 'apps' },
  create: { label: 'Create', icon: 'create' },
  collections: { label: 'Collections', icon: 'albums' },
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [containerWidth, setContainerWidth] = useState(ESTIMATED_CONTAINER_WIDTH);

  // Only consider routes that have a config entry so calculations stay in sync
  const visibleRoutes = useMemo(
    () => state.routes.filter((route) => TAB_CONFIG[route.name]),
    [state.routes]
  );

  const currentRoute = state.routes[state.index];
  const visibleIndex = Math.max(
    visibleRoutes.findIndex((route) => route.key === currentRoute.key),
    0
  );

  const animatedIndex = useRef(new Animated.Value(visibleIndex)).current;
  const tabCount = visibleRoutes.length;
  const animationRange = useMemo(() => visibleRoutes.map((_, idx) => idx), [visibleRoutes]);
  const layoutMeasuredRef = useRef(false);

  useEffect(() => {
    Animated.spring(animatedIndex, {
      toValue: visibleIndex,
      stiffness: 180,
      damping: 18,
      mass: 0.8,
      useNativeDriver: true,
    }).start();
  }, [state.index, animatedIndex]);

  const itemWidth = useMemo(() => {
    if (!containerWidth || tabCount === 0) return 0;
    return containerWidth / tabCount;
  }, [containerWidth, tabCount]);

  const highlightWidth = useMemo(() => {
    if (itemWidth <= 0) return 0;
    return Math.max(itemWidth - 12, 0);
  }, [itemWidth]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const measuredWidth = event.nativeEvent.layout.width;
    if (!layoutMeasuredRef.current || Math.abs(measuredWidth - containerWidth) > 3) {
      setContainerWidth(measuredWidth);
      layoutMeasuredRef.current = true;
    }
  };

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 6) }]}>
      <View style={styles.container} onLayout={handleLayout}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.activeHalo,
            {
              width: highlightWidth || (ESTIMATED_CONTAINER_WIDTH / tabCount - 12),
              opacity: highlightWidth > 0 ? 1 : 0,
              transform: [
                {
                  translateX: Animated.multiply(
                    animatedIndex,
                    itemWidth || (tabCount ? ESTIMATED_CONTAINER_WIDTH / tabCount : 0)
                  ),
                },
              ],
            },
          ]}
        />
        {visibleRoutes.map((route, index) => {
          const isFocused = route.key === currentRoute.key;
          const { options } = descriptors[route.key];
          const config = TAB_CONFIG[route.name];

          if (!config) return null;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const rawLabel = options.tabBarLabel ?? options.title ?? config.label;
          const label = typeof rawLabel === 'string' ? rawLabel : config.label;
          const iconScale = animatedIndex.interpolate({
            inputRange: animationRange,
            outputRange: animationRange.map((i) => (i === index ? 1 : 0.92)),
            extrapolate: 'clamp',
          });

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={typeof label === 'string' ? label : undefined}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.item}>
              <Animated.View style={[styles.iconWrapper, { transform: [{ scale: iconScale }] }]}>
                <Ionicons
                  name={config.icon}
                  size={22}
                  color={isFocused ? '#FFFFFF' : '#8C8FA3'}
                />
              </Animated.View>
              <Text style={[styles.label, isFocused && styles.labelActive]} numberOfLines={1}>
                {label as string}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Modes',
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          title: 'Collections',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 40,
    backgroundColor: '#09090aff',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#201F24',
    borderRadius: 50,
    paddingHorizontal: 0,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    overflow: 'hidden',
    borderWidth: 0.1,
    borderColor: '#33313C',
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    marginHorizontal: 6,
    gap: 4,
  },
  iconWrapper: {
    marginBottom: 4,
  },
  label: {
    color: '#8C8FA3',
    fontSize: 10,
    fontWeight: '500',
  },
  labelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  activeHalo: {
    position: 'absolute',
    top: 6,
    bottom: 6,
    left: 6,
    borderRadius: 50,
    backgroundColor: '#414045',
  },
});
