import React, { useRef } from 'react';
import { Animated } from 'react-native';
import { PanGestureHandler, PanGestureHandlerStateChangeEvent, State } from 'react-native-gesture-handler';

import { scale, verticalScale } from '../../../utils/Scaler';

interface AnimatedTravelItemProps {
  onItemRemoval(): void;
  onItemFadeIn(): void;
}

const AnimatedTravelItem: React.FC<AnimatedTravelItemProps> = ({ children, onItemRemoval, onItemFadeIn }) => {
  const position = useRef<Animated.Value>(new Animated.Value(0));
  const opacity = useRef<Animated.Value>(new Animated.Value(1));
  const width = useRef<Animated.Value>(new Animated.Value(scale(280)));
  const margin = useRef<Animated.Value>(new Animated.Value(scale(10)));

  const onHandlerStateChange = (event: PanGestureHandlerStateChangeEvent): void => {
    const { state, translationY } = event.nativeEvent;

    if (state === State.END && translationY >= 100) {
      Animated.timing(opacity.current, { toValue: 0, useNativeDriver: false }).start(() => {
        onItemFadeIn();
        Animated.sequence([
          Animated.timing(width.current, { toValue: 0, duration: 100, useNativeDriver: false }),
          Animated.timing(margin.current, { toValue: 0, duration: 100, useNativeDriver: false }),
        ]).start(() => onItemRemoval());
      });
    } else if (state === State.END) {
      Animated.spring(position.current, { toValue: 0, bounciness: 0, useNativeDriver: false }).start();
    }
  };

  return (
    <PanGestureHandler
      minDeltaY={30}
      onGestureEvent={Animated.event([{ nativeEvent: { translationY: position.current } }], {
        useNativeDriver: false,
      })}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={{
          opacity: opacity.current,
          marginRight: margin.current,
          width: width.current,
          transform: [{ translateY: position.current }],

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
