import React, { useRef, useCallback } from 'react';
import { FlatList, Platform, UIManager, LayoutAnimation } from 'react-native';

import { scale, verticalScale } from '../../utils/Scaler';
import { Position } from '../../native/GPSForegroundService';

import TravelItemAnimated from './TravelItem/Animated';
import TravelItem from './TravelItem';

export interface Travel {
  id: string;
  travelDate: number;
  totalDistance: number;
  coordenates: Position[];
}

interface TravelProps {
  travels: Travel[];
  onItemRemoval: (id: string) => void;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Travels: React.FC<TravelProps> = ({ travels, onItemRemoval }) => {
  const travelsRef = useRef<FlatList>(null);

  const handleOnItemFadeIn = useCallback(
    (id) => {
      const index = travels.findIndex((travel) => travel.id === id);

      if (index === travels.length - 1) {
        travelsRef.current?.scrollToIndex({ animated: true, index: index - 1 });

        // We use setTimeout here because RN wont
        // give us a way to use callbacks after scrollTo
        // animation complete [That could save me a lot
        // of tricks in this code :(].
        setTimeout(() => {
          LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.linear, duration: 100 });
          onItemRemoval(id);
        }, 100);
      } else {
        LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.linear, duration: 100 });
        onItemRemoval(id);
      }
    },
    [travels, onItemRemoval],
  );

  return (
    <FlatList<Travel>
      horizontal
      style={{
        marginTop: verticalScale(20),
        marginLeft: scale(15),
      }}
      ref={travelsRef}
      data={travels}
      snapToInterval={scale(290)}
      snapToAlignment="end"
      showsHorizontalScrollIndicator={false}
      keyExtractor={(currentTravel) => currentTravel.id}
      renderItem={({ item: currentTravel }) => (
        <TravelItemAnimated onItemFadeIn={() => handleOnItemFadeIn(currentTravel.id)}>
          <TravelItem
            route={currentTravel.coordenates}
            date={currentTravel.travelDate}
            distance={currentTravel.totalDistance}
          />
        </TravelItemAnimated>
      )}
    />
  );
};

export default Travels;
