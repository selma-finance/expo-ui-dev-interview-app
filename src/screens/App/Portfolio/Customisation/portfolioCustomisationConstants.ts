import { ImageSourcePropType } from 'react-native';

import type { BasePortfolioEnum } from 'src/types/schemaTypes';

import portfolioImage from 'assets/images/classic-portfolio.png';
import incomePortfolioImage from 'assets/images/income-portfolio.png';
import sustainablePortfolioImage from 'assets/images/sustainable-portfolio.png';

export interface PortfolioThemeDisplayConfig {
  type: BasePortfolioEnum;
  image: ImageSourcePropType;
  backgroundColor: 'illustrationBlueLight' | 'illustrationGreenLight' | 'illustrationPurpleLight';
}

export const PORTFOLIO_THEME_DISPLAY_CONFIG: readonly PortfolioThemeDisplayConfig[] = [
  {
    type: 'CLASSIC',
    image: portfolioImage,
    backgroundColor: 'illustrationBlueLight',
  },
  {
    type: 'SUSTAINABLE',
    image: sustainablePortfolioImage,
    backgroundColor: 'illustrationGreenLight',
  },
  {
    type: 'INCOME',
    image: incomePortfolioImage,
    backgroundColor: 'illustrationPurpleLight',
  },
] as const;

export const PORTFOLIO_TAB_ORDER: readonly BasePortfolioEnum[] = [
  'CLASSIC',
  'SUSTAINABLE',
  'INCOME',
];

export const DEFAULT_PORTFOLIO_THEME: BasePortfolioEnum = 'CLASSIC';

export const hasPortfolioCustomisationChanges = (
  theme: BasePortfolioEnum,
  hasSwissBias: boolean,
): boolean => theme !== DEFAULT_PORTFOLIO_THEME || hasSwissBias;

export const getPortfolioThemeDisplayConfig = (
  theme: BasePortfolioEnum,
): PortfolioThemeDisplayConfig => {
  const config = PORTFOLIO_THEME_DISPLAY_CONFIG[PORTFOLIO_TAB_ORDER.indexOf(theme)];
  const defaultConfig = PORTFOLIO_THEME_DISPLAY_CONFIG[0];
  if (config !== undefined) {
    return config;
  }
  if (defaultConfig !== undefined) {
    return defaultConfig;
  }
  return {
    type: 'CLASSIC',
    image: portfolioImage,
    backgroundColor: 'illustrationBlueLight',
  };
};
