import React from 'react';

import Box from 'src/components/Box';
import CardHeader, { CardHeaderProps } from 'src/components/Cards/CardHeader/CardHeader';
import PortfolioCardDetails, {
  PortfolioCardDetailsProps,
} from 'src/components/Cards/PortfolioCardDetails/PortfolioCardDetails';
import PieChart, { PieChartProps } from 'src/components/Chart/PieChart';
import ContentInfoBox, { ContentInfoBoxProps } from 'src/components/ContentInfoBox/ContentInfoBox';
import Link, { LinkProps } from 'src/components/Link';
import Text from 'src/components/Text/Text';

const PIE_CHART_SIZE = 162;

interface PortfolioCardProps {
  description: string;
  cardHeaderProps: CardHeaderProps;
  riskLevelCardProps: PortfolioCardDetailsProps;
  diversificationCardProps: PortfolioCardDetailsProps;
  pieChartProps?: PieChartProps;
  contentInfoBoxProps?: ContentInfoBoxProps;
  descriptionLinkProps?: LinkProps;
  showFullDescription?: boolean;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  description,
  cardHeaderProps,
  pieChartProps,
  riskLevelCardProps,
  diversificationCardProps,
  contentInfoBoxProps,
  descriptionLinkProps,
  showFullDescription,
}) => (
  <Box backgroundColor="backgroundSurface" borderRadius="l" paddingVertical="m" paddingHorizontal="s">
    <Box alignItems="center" gap="m">
      <Box alignSelf="stretch" gap="xs">
        <CardHeader testID="portfolio-card-header" {...cardHeaderProps} />
        <Box>
          <Text
            variant="secondary"
            color="textSecondary"
            numberOfLines={showFullDescription ? undefined : 3}
          >
            {description}
          </Text>
          {descriptionLinkProps && <Link {...descriptionLinkProps} />}
        </Box>
      </Box>
      {pieChartProps && (
        <Box padding="xs">
          <PieChart width={PIE_CHART_SIZE} {...pieChartProps} />
        </Box>
      )}
      <Box width="100%" gap="s">
        <Box flex={1} flexDirection="row" gap="s">
          <PortfolioCardDetails {...riskLevelCardProps} />
          <PortfolioCardDetails {...diversificationCardProps} />
        </Box>
        {contentInfoBoxProps && <ContentInfoBox {...contentInfoBoxProps} background="grey" />}
      </Box>
    </Box>
  </Box>
);

export default PortfolioCard;
