import React, { useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import { PanGestureHandler, PanGestureHandlerStateChangeEvent, State } from 'react-native-gesture-handler';

import { scale, verticalScale } from '../../../../utils/Scaler';

interface AnimatedTravelItemProps {
  onItemRemoval(): void;
  onItemFadeIn(): void;
}

const AnimatedTravelItem: React.FC<AnimatedTravelItemProps> = ({ children, onItemRemoval, onItemFadeIn }) => {
  const positionY = useRef<Animated.Value>(new Animated.Value(0));
  const opacity = useRef<Animated.Value>(new Animated.Value(1));

  const onHandlerStateChange = useCallback(
    (event: PanGestureHandlerStateChangeEvent) => {
      const { state, translationY } = event.nativeEvent;

      // We use setTimeout here because RN wont
      // give us a way to use callbacks after scrollTo
      // animation complete [That could save me a lot
      // of tricks in this code :(].
      if (state === State.END && translationY >= 100) {
        Animated.timing(opacity.current, { toValue: 0, useNativeDriver: true }).start(() => {
          onItemFadeIn();
          setTimeout(() => onItemRemoval(), 100);
        });
      } else if (state === State.END) {
        Animated.spring(positionY.current, { toValue: 0, bounciness: 0, useNativeDriver: true }).start();
      }
    },
    [onItemRemoval, onItemFadeIn],
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
          opacity: opacity.current,
          marginRight: scale(10),
          width: scale(280),
          transform: [{ translateY: positionY.current }],

          height: verticalScale(220),
          backgroundColor: '#424966',
          borderRadius: 20,
          overflow: 'hidden',
        }}
      >
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default AnimatedTravelItem;
