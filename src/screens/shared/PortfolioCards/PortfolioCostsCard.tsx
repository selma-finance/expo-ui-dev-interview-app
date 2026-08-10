import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

import BaseCard from 'src/components/Cards/BaseCard/BaseCard';
import Text from 'src/components/Text/Text';

const COLLAPSED_LINES = 3;

interface PortfolioCostsCardProps {
  testID: string;
}

const PortfolioCostsCard: React.FC<PortfolioCostsCardProps> = ({ testID }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      testID={testID}
      onPress={() => setExpanded((value) => !value)}
      accessibilityRole="button"
      accessibilityState={{ expanded }}
    >
      <BaseCard>
        <Text
          testID={`${testID}.body`}
          variant="secondary"
          color="textSecondary"
          numberOfLines={expanded ? undefined : COLLAPSED_LINES}
        >
          {t('PortfolioCustomisation.PortfolioSummary.CostsCard.Description')}
        </Text>
      </BaseCard>
    </Pressable>
  );
};

export default PortfolioCostsCard;
