import React, { useRef, useCallback } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { PanGestureHandler, PanGestureHandlerStateChangeEvent, State } from 'react-native-gesture-handler';

interface AnimatedTravelItemProps {
  onItemFadeIn(): void;
  style: ViewStyle;
}

const AnimatedTravelItem: React.FC<AnimatedTravelItemProps> = ({ children, style, onItemFadeIn }) => {
  const positionY = useRef<Animated.Value>(new Animated.Value(0));
  const opacity = useRef<Animated.Value>(new Animated.Value(1));

  const onHandlerStateChange = useCallback(
    (event: PanGestureHandlerStateChangeEvent) => {
      const { state, translationY } = event.nativeEvent;

      if (state === State.END && translationY >= 100) {
        Animated.timing(opacity.current, { toValue: 0, useNativeDriver: true }).start(() => {
          onItemFadeIn();
        });
      } else if (state === State.END) {
        Animated.spring(positionY.current, { toValue: 0, bounciness: 0, useNativeDriver: true }).start();
      }
    },
    [onItemFadeIn],
  );

  return (
    <PanGestureHandler
      minDeltaY={30}
      onGestureEvent={Animated.event([{ nativeEvent: { translationY: positionY.current } }], {
        useNativeDriver: true,
      })}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={{
          ...style,
          opacity: opacity.current,
          transform: [{ translateY: positionY.current }],
        }}
      >
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default AnimatedTravelItem;
