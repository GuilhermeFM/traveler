import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

import { scale, verticalScale } from '../../utils/Scaler';

const StatisticsLoader: React.FC = (props) => {
  return (
    <ContentLoader
      speed={1}
      width="100%"
      height="100%"
      backgroundColor="#424966"
      foregroundColor="#dbdbdb"
      {...props}
    >
      {/* Header */}
      <Rect
        x={scale(0)}
        y={verticalScale(0)}
        rx={scale(15) / 2}
        ry={scale(15) / 2}
        width={verticalScale(120)}
        height={scale(15)}
      />

      {/* SubHeader - left */}
      <Rect
        x={scale(20)}
        y={verticalScale(40)}
        rx={scale(13) / 2}
        ry={scale(13) / 2}
        width={scale(120)}
        height={verticalScale(13)}
      />

      {/* Content -left */}
      <Rect
        x={scale(20)}
        y={verticalScale(70)}
        rx={scale(18) / 2}
        ry={scale(18) / 2}
        width={scale(60)}
        height={verticalScale(18)}
      />

      {/* SubHeader - Right */}
      <Rect
        x={scale(180)}
        y={verticalScale(40)}
        rx={scale(13) / 2}
        ry={scale(13) / 2}
        width={scale(120)}
        height={verticalScale(13)}
      />

      {/* Content - Right */}
      <Rect
        x={scale(180)}
        y={verticalScale(70)}
        rx={scale(18) / 2}
        ry={scale(18) / 2}
        width={scale(60)}
        height={verticalScale(18)}
      />
    </ContentLoader>
  );
};

export default StatisticsLoader;
