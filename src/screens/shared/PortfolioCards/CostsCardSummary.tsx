import React from 'react';
import { useTranslation } from 'react-i18next';

import Box from 'src/components/Box';
import ListRowTitle from 'src/components/Menu/ListRowTitle';
import PortfolioCostsCard from 'src/screens/shared/PortfolioCards/PortfolioCostsCard';

const CostsCardSummary: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <ListRowTitle title={t('PortfolioCustomisation.PortfolioSummary.CostsCard.Title')} />
      <PortfolioCostsCard testID="portfolio-summary-costs-card" />
    </Box>
  );
};

export default CostsCardSummary;
