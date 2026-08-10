import type { AllocationDiversification, RiskScoreLevel } from "src/types/schemaTypes"

export type HelpTopic =
  | "nerdyStats"
  | "expectedReturn"
  | "avgDividendYield"
  | "diversification.GOOD"
  | "diversification.GREAT"
  | "riskLevel.OPTION_1_STABILITY"
  | "riskLevel.OPTION_2_CAUTIOUS_GROWTH"
  | "riskLevel.OPTION_3_WELL_BALANCED"
  | "riskLevel.OPTION_4_GROWTH"
  | "riskLevel.OPTION_5_STRONG_GROWTH"
  | "riskLevel.OPTION_6_FULL_GROWTH"
  | "productCosts"
  | "inviteFriends"
  | "inflation"
  | "investments"
  | "adviceProjection"
  | "renewal"
  | "renewalOverdue"
  | "monthlySavingsAdvice.benefits.benefit1"
  | "monthlySavingsAdvice.benefits.benefit2"
  | "monthlySavingsAdvice.benefits.benefit3"
  | "monthlySavingsAdviceProjection"
  | "totalInvestments"
  | "riskAssessment.investorProfile"
  | "riskAssessment.editRiskAssessment"
  | "riskAssessment.editRiskAssessment.monthly"
  | "riskAssessment.editRiskAssessment.riskRelationship.intro"
  | "riskAssessment.editRiskAssessment.intro"
  | "riskAssessment.riskAbility.LOW"
  | "riskAssessment.riskAbility.MEDIUM"
  | "riskAssessment.riskAbility.HIGH"
  | "riskAssessment.netWorth"
  | "riskAssessment.investmentPreference"

// Explicit maps preserve the literal HelpTopic type without widening to string.
export const DIVERSIFICATION_HELP_TOPICS: Record<AllocationDiversification, HelpTopic> = {
  GOOD: "diversification.GOOD",
  GREAT: "diversification.GREAT",
}

export const RISK_LEVEL_HELP_TOPICS: Record<RiskScoreLevel, HelpTopic> = {
  OPTION_1_STABILITY: "riskLevel.OPTION_1_STABILITY",
  OPTION_2_CAUTIOUS_GROWTH: "riskLevel.OPTION_2_CAUTIOUS_GROWTH",
  OPTION_3_WELL_BALANCED: "riskLevel.OPTION_3_WELL_BALANCED",
  OPTION_4_GROWTH: "riskLevel.OPTION_4_GROWTH",
  OPTION_5_STRONG_GROWTH: "riskLevel.OPTION_5_STRONG_GROWTH",
  OPTION_6_FULL_GROWTH: "riskLevel.OPTION_6_FULL_GROWTH",
}
