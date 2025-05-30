import { useModalOverlay } from '@/context/ModalOverlayContext';
import { useAppThemeColors } from '@/hooks/useAppThemeColors';
import { BlurView } from 'expo-blur';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

const ModalOverlay = () => {
  const { isOverlayVisible } = useModalOverlay();
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = useState(false);
  const colors = useAppThemeColors();

  useEffect(() => {
    if (isOverlayVisible) {
      setShouldRender(true);
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setShouldRender(false);
      });
    }
  }, [isOverlayVisible, opacityAnim]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity: opacityAnim }]}>
      <BlurView
        intensity={5}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: colors.modalOverlay }]} />
    </Animated.View>
  );
};

export default ModalOverlay;