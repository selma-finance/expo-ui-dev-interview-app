import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageSourcePropType } from 'react-native';

import HelpSheet from './HelpSheet';
import type { HelpTopic } from './helpSheetTypes';

export interface StandardHelpSheetProps {
  helpTopic: HelpTopic;
  contentInterpolationVars?: Record<string, unknown>;
  bottomImage?: {
    source: ImageSourcePropType;
    height: number;
  };
  testID?: string;
}

export type { HelpTopic } from './helpSheetTypes';

// Help topics double as HELP_OPENED analytics names, so their values must stay
// stable; the PascalCase translation keys are looked up through this map instead.
const HELP_TOPIC_KEYS = {
  nerdyStats: 'NerdyStats',
  expectedReturn: 'ExpectedReturn',
  avgDividendYield: 'AvgDividendYield',
  'diversification.GOOD': 'Diversification.GOOD',
  'diversification.GREAT': 'Diversification.GREAT',
  'riskLevel.OPTION_1_STABILITY': 'RiskLevel.OPTION_1_STABILITY',
  'riskLevel.OPTION_2_CAUTIOUS_GROWTH': 'RiskLevel.OPTION_2_CAUTIOUS_GROWTH',
  'riskLevel.OPTION_3_WELL_BALANCED': 'RiskLevel.OPTION_3_WELL_BALANCED',
  'riskLevel.OPTION_4_GROWTH': 'RiskLevel.OPTION_4_GROWTH',
  'riskLevel.OPTION_5_STRONG_GROWTH': 'RiskLevel.OPTION_5_STRONG_GROWTH',
  'riskLevel.OPTION_6_FULL_GROWTH': 'RiskLevel.OPTION_6_FULL_GROWTH',
  productCosts: 'ProductCosts',
  inviteFriends: 'InviteFriends',
  inflation: 'Inflation',
  investments: 'Investments',
  adviceProjection: 'AdviceProjection',
  renewal: 'Renewal',
  renewalOverdue: 'RenewalOverdue',
  'monthlySavingsAdvice.benefits.benefit1': 'MonthlySavingsAdvice.Benefits.Benefit1',
  'monthlySavingsAdvice.benefits.benefit2': 'MonthlySavingsAdvice.Benefits.Benefit2',
  'monthlySavingsAdvice.benefits.benefit3': 'MonthlySavingsAdvice.Benefits.Benefit3',
  monthlySavingsAdviceProjection: 'MonthlySavingsAdviceProjection',
  totalInvestments: 'TotalInvestments',
  'riskAssessment.investorProfile': 'RiskAssessment.InvestorProfile',
  'riskAssessment.editRiskAssessment': 'RiskAssessment.EditRiskAssessment',
  'riskAssessment.editRiskAssessment.monthly': 'RiskAssessment.EditRiskAssessment.Monthly',
  'riskAssessment.editRiskAssessment.riskRelationship.intro':
    'RiskAssessment.EditRiskAssessment.RiskRelationship.Intro',
  'riskAssessment.editRiskAssessment.intro': 'RiskAssessment.EditRiskAssessment.Intro',
  'riskAssessment.riskAbility.LOW': 'RiskAssessment.RiskAbility.LOW',
  'riskAssessment.riskAbility.MEDIUM': 'RiskAssessment.RiskAbility.MEDIUM',
  'riskAssessment.riskAbility.HIGH': 'RiskAssessment.RiskAbility.HIGH',
  'riskAssessment.netWorth': 'RiskAssessment.NetWorth',
  'riskAssessment.investmentPreference': 'RiskAssessment.InvestmentPreference',
} as const satisfies Record<HelpTopic, string>;

const StandardHelpSheet: React.FC<PropsWithChildren<StandardHelpSheetProps>> = ({
  helpTopic,
  contentInterpolationVars,
  bottomImage,
  testID,
  children,
}) => {
  const { t } = useTranslation();

  const ctaLabel: string = t(`Help.${HELP_TOPIC_KEYS[helpTopic]}.CTA`, { defaultValue: '' });

  return (
    <HelpSheet testID={testID}>
      <HelpSheet.Title title={t(`Help.${HELP_TOPIC_KEYS[helpTopic]}.Title`)} />
      <HelpSheet.ContentMD
        content={t(`Help.${HELP_TOPIC_KEYS[helpTopic]}.Content`, contentInterpolationVars ?? {})}
      />
      {bottomImage && <HelpSheet.Image image={bottomImage} />}
      {ctaLabel && <HelpSheet.CTA label={ctaLabel} />}

      {children}
    </HelpSheet>
  );
};

export default StandardHelpSheet;
