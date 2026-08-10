import { useTheme } from '@shopify/restyle';
import React, { useMemo } from 'react';
import Svg, { G, Path } from 'react-native-svg';

import Box from 'src/components/Box';
import { Theme } from 'src/styling/restyle/defaultTheme';

interface PieChartDataItem {
  value: number;
  color: string;
  label: string;
}

export interface PieChartProps {
  data: PieChartDataItem[];
  width?: number;
  height?: number;
  innerRadiusRatio?: number;
  sliceGapDegrees?: number;
}

const DEFAULT_SIZE = 162;
const OUTER_RADIUS = 81;
const INNER_RADIUS = 65;
const SLICE_CORNER_RADIUS = 4;

const polarToCartesian = (center: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: center + radius * Math.cos(angleInRadians),
    y: center + radius * Math.sin(angleInRadians),
  };
};

const describeDonutSlice = (
  center: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number,
  cornerRadius = SLICE_CORNER_RADIUS,
) => {
  const sliceAngle = endAngle - startAngle;
  const clampedCornerRadius = Math.min(
    cornerRadius,
    (outerRadius - innerRadius) / 2 - 0.1,
    ((sliceAngle * Math.PI) / 180) * outerRadius * 0.25,
    ((sliceAngle * Math.PI) / 180) * innerRadius * 0.25,
  );

  if (clampedCornerRadius <= 0) {
    const outerStart = polarToCartesian(center, outerRadius, endAngle);
    const outerEnd = polarToCartesian(center, outerRadius, startAngle);
    const innerStart = polarToCartesian(center, innerRadius, startAngle);
    const innerEnd = polarToCartesian(center, innerRadius, endAngle);
    const largeArcFlag = sliceAngle <= 180 ? '0' : '1';

    return [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerStart.x} ${innerStart.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${innerEnd.x} ${innerEnd.y}`,
      'Z',
    ].join(' ');
  }

  const outerAngleInset = (clampedCornerRadius / outerRadius) * (180 / Math.PI);
  const innerAngleInset = (clampedCornerRadius / innerRadius) * (180 / Math.PI);

  const outerCornerStart = polarToCartesian(center, outerRadius, startAngle);
  const outerCornerEnd = polarToCartesian(center, outerRadius, endAngle);
  const innerCornerStart = polarToCartesian(center, innerRadius, startAngle);
  const innerCornerEnd = polarToCartesian(center, innerRadius, endAngle);

  const outerArcStart = polarToCartesian(center, outerRadius, startAngle + outerAngleInset);
  const outerArcEnd = polarToCartesian(center, outerRadius, endAngle - outerAngleInset);
  const innerArcStart = polarToCartesian(center, innerRadius, startAngle + innerAngleInset);
  const innerArcEnd = polarToCartesian(center, innerRadius, endAngle - innerAngleInset);

  const radialOuterStart = polarToCartesian(center, outerRadius - clampedCornerRadius, startAngle);
  const radialOuterEnd = polarToCartesian(center, outerRadius - clampedCornerRadius, endAngle);
  const radialInnerStart = polarToCartesian(center, innerRadius + clampedCornerRadius, startAngle);
  const radialInnerEnd = polarToCartesian(center, innerRadius + clampedCornerRadius, endAngle);

  const outerLargeArcFlag = sliceAngle - 2 * outerAngleInset <= 180 ? '0' : '1';
  const innerLargeArcFlag = sliceAngle - 2 * innerAngleInset <= 180 ? '0' : '1';

  return [
    `M ${outerArcStart.x} ${outerArcStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${outerLargeArcFlag} 1 ${outerArcEnd.x} ${outerArcEnd.y}`,
    `Q ${outerCornerEnd.x} ${outerCornerEnd.y} ${radialOuterEnd.x} ${radialOuterEnd.y}`,
    `L ${radialInnerEnd.x} ${radialInnerEnd.y}`,
    `Q ${innerCornerEnd.x} ${innerCornerEnd.y} ${innerArcEnd.x} ${innerArcEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${innerLargeArcFlag} 0 ${innerArcStart.x} ${innerArcStart.y}`,
    `Q ${innerCornerStart.x} ${innerCornerStart.y} ${radialInnerStart.x} ${radialInnerStart.y}`,
    `L ${radialOuterStart.x} ${radialOuterStart.y}`,
    `Q ${outerCornerStart.x} ${outerCornerStart.y} ${outerArcStart.x} ${outerArcStart.y}`,
    'Z',
  ].join(' ');
};

const PieChart: React.FC<PieChartProps> = ({
  data,
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  innerRadiusRatio = INNER_RADIUS / OUTER_RADIUS,
  sliceGapDegrees = 3,
}) => {
  useTheme<Theme>();

  const center = width / 2;
  const outerRadius = width / 2;
  const innerRadius = outerRadius * innerRadiusRatio;

  const slices = useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total <= 0) {
      return [];
    }

    let currentAngle = 0;

    return data.map((item) => {
      const sliceAngle = (item.value / total) * 360;
      const gap = data.length > 1 ? sliceGapDegrees : 0;
      const startAngle = currentAngle + gap / 2;
      const endAngle = currentAngle + sliceAngle - gap / 2;
      currentAngle += sliceAngle;

      return {
        ...item,
        path: describeDonutSlice(center, outerRadius, innerRadius, startAngle, endAngle),
      };
    });
  }, [center, data, innerRadius, outerRadius, sliceGapDegrees]);

  return (
    <Box testID="pie-chart-container" height={height} width={width}>
      <Svg width={width} height={height}>
        <G>
          {slices.map((slice) => (
            <Path key={slice.label} d={slice.path} fill={slice.color} />
          ))}
        </G>
      </Svg>
    </Box>
  );
};

export default PieChart;
