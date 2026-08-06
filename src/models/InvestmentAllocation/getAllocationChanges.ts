import type { AllocationChangeCategoryProps } from 'src/components/Cards/AllocationChangeCard/AllocationChangeCategory';
import type {
  AllocationDiversification,
  BasePortfolioEnum,
  PortfolioCategoryKey,
  RiskScoreLevel,
} from 'src/types/schemaTypes';

interface AllocationEntry {
  portfolioCategoryKey: PortfolioCategoryKey;
  percentage: number;
  max: number;
}

interface AllocationChangesParams {
  theme: BasePortfolioEnum;
  swissBias: boolean;
  t: (key: string) => string;
}

interface PortfolioSummaryStats {
  diversificationLevel: AllocationDiversification;
  scoreLevel: RiskScoreLevel;
}

const categoryLabelKey = (category: PortfolioCategoryKey) =>
  `Transactions.PortfolioCategory.${category}`;

/**
 * The user's current portfolio before customisation: Classic with no Swiss bias.
 * "Old" rows in the summary always use these percentages, regardless of selection.
 */
export const CLASSIC_BASELINE_ALLOCATIONS: readonly AllocationEntry[] = [
  { portfolioCategoryKey: 'equity', percentage: 30, max: 40 },
  { portfolioCategoryKey: 'swiss_equity', percentage: 12, max: 25 },
  { portfolioCategoryKey: 'corporate_bonds', percentage: 18, max: 25 },
  { portfolioCategoryKey: 'government_bonds', percentage: 15, max: 20 },
  { portfolioCategoryKey: 'real_estate', percentage: 10, max: 15 },
  { portfolioCategoryKey: 'precious_metals', percentage: 5, max: 10 },
  { portfolioCategoryKey: 'commodities', percentage: 5, max: 10 },
  { portfolioCategoryKey: 'cash', percentage: 5, max: 10 },
];

const BASELINE_PERCENTAGE_BY_CATEGORY = Object.fromEntries(
  CLASSIC_BASELINE_ALLOCATIONS.map((entry) => [
    entry.portfolioCategoryKey,
    entry.percentage,
  ]),
) as Record<PortfolioCategoryKey, number>;

const BASELINE_MAX_BY_CATEGORY = Object.fromEntries(
  CLASSIC_BASELINE_ALLOCATIONS.map((entry) => [
    entry.portfolioCategoryKey,
    entry.max,
  ]),
) as Record<PortfolioCategoryKey, number>;

const getBaselinePercentage = (category: PortfolioCategoryKey): number =>
  BASELINE_PERCENTAGE_BY_CATEGORY[category] ?? 0;

const buildChanges = (
  newAllocations: AllocationEntry[],
  t: (key: string) => string,
): AllocationChangeCategoryProps[] => {
  const newByCategory = new Map(
    newAllocations.map((entry) => [entry.portfolioCategoryKey, entry]),
  );

  const categories = new Set<PortfolioCategoryKey>([
    ...CLASSIC_BASELINE_ALLOCATIONS.map((entry) => entry.portfolioCategoryKey),
    ...newAllocations.map((entry) => entry.portfolioCategoryKey),
  ]);

  return [...categories]
    .map((portfolioCategoryKey) => {
      const newAllocation = newByCategory.get(portfolioCategoryKey);

      return {
        headerTitle: t(categoryLabelKey(portfolioCategoryKey)),
        headerDetail: {
          label: t('Commons.Allocations.Max'),
          percentage: newAllocation?.max ?? BASELINE_MAX_BY_CATEGORY[portfolioCategoryKey] ?? 0,
        },
        visualisations: [
          {
            label: t('Commons.Allocations.New'),
            percentage: newAllocation?.percentage ?? 0,
            portfolioCategory: portfolioCategoryKey,
          },
          {
            label: t('Commons.Allocations.Old'),
            percentage: getBaselinePercentage(portfolioCategoryKey),
            portfolioCategory: portfolioCategoryKey,
          },
        ],
      };
    })
    .sort(
      (a, b) =>
        (b.visualisations[0]?.percentage ?? 0) -
        (a.visualisations[0]?.percentage ?? 0),
    );
};

const classicAllocations = (hasSwissBias: boolean): AllocationEntry[] => {
  if (hasSwissBias) {
    return [
      { portfolioCategoryKey: 'swiss_equity', percentage: 35, max: 50 },
      { portfolioCategoryKey: 'equity', percentage: 15, max: 30 },
      { portfolioCategoryKey: 'corporate_bonds', percentage: 18, max: 25 },
      { portfolioCategoryKey: 'government_bonds', percentage: 12, max: 20 },
      { portfolioCategoryKey: 'real_estate', percentage: 8, max: 15 },
      { portfolioCategoryKey: 'precious_metals', percentage: 5, max: 10 },
      { portfolioCategoryKey: 'commodities', percentage: 4, max: 10 },
      { portfolioCategoryKey: 'cash', percentage: 3, max: 10 },
    ];
  }

  return [...CLASSIC_BASELINE_ALLOCATIONS];
};

const sustainableAllocations = (hasSwissBias: boolean): AllocationEntry[] => {
  if (hasSwissBias) {
    return [
      { portfolioCategoryKey: 'swiss_equity', percentage: 30, max: 50 },
      { portfolioCategoryKey: 'equity', percentage: 18, max: 35 },
      { portfolioCategoryKey: 'corporate_bonds', percentage: 20, max: 30 },
      { portfolioCategoryKey: 'government_bonds', percentage: 12, max: 20 },
      { portfolioCategoryKey: 'real_estate', percentage: 10, max: 15 },
      { portfolioCategoryKey: 'precious_metals', percentage: 5, max: 10 },
      { portfolioCategoryKey: 'commodities', percentage: 3, max: 8 },
      { portfolioCategoryKey: 'cash', percentage: 2, max: 8 },
    ];
  }

  return [
    { portfolioCategoryKey: 'equity', percentage: 28, max: 40 },
    { portfolioCategoryKey: 'corporate_bonds', percentage: 22, max: 30 },
    { portfolioCategoryKey: 'swiss_equity', percentage: 10, max: 20 },
    { portfolioCategoryKey: 'government_bonds', percentage: 14, max: 20 },
    { portfolioCategoryKey: 'real_estate', percentage: 12, max: 18 },
    { portfolioCategoryKey: 'precious_metals', percentage: 5, max: 10 },
    { portfolioCategoryKey: 'commodities', percentage: 5, max: 10 },
    { portfolioCategoryKey: 'cash', percentage: 4, max: 10 },
  ];
};

const incomeAllocations = (hasSwissBias: boolean): AllocationEntry[] => {
  if (hasSwissBias) {
    return [
      { portfolioCategoryKey: 'swiss_equity', percentage: 50, max: 50 },
      { portfolioCategoryKey: 'equity', percentage: 10, max: 20 },
      { portfolioCategoryKey: 'corporate_bonds', percentage: 50, max: 55 },
      { portfolioCategoryKey: 'real_estate', percentage: 10, max: 15 },
      { portfolioCategoryKey: 'government_bonds', percentage: 40, max: 45 },
      { portfolioCategoryKey: 'precious_metals', percentage: 5, max: 10 },
    ];
  }

  return [
    { portfolioCategoryKey: 'corporate_bonds', percentage: 35, max: 45 },
    { portfolioCategoryKey: 'government_bonds', percentage: 25, max: 35 },
    { portfolioCategoryKey: 'equity', percentage: 15, max: 25 },
    { portfolioCategoryKey: 'swiss_equity', percentage: 10, max: 20 },
    { portfolioCategoryKey: 'real_estate', percentage: 8, max: 15 },
    { portfolioCategoryKey: 'precious_metals', percentage: 5, max: 10 },
    { portfolioCategoryKey: 'cash', percentage: 2, max: 8 },
  ];
};

const getNewAllocations = (
  theme: BasePortfolioEnum,
  hasSwissBias: boolean,
): AllocationEntry[] => {
  switch (theme) {
    case 'INCOME':
      return incomeAllocations(hasSwissBias);
    case 'SUSTAINABLE':
      return sustainableAllocations(hasSwissBias);
    default:
      return classicAllocations(hasSwissBias);
  }
};

export const getAllocationChanges = ({
  theme,
  swissBias,
  t,
}: AllocationChangesParams): AllocationChangeCategoryProps[] =>
  buildChanges(getNewAllocations(theme, swissBias), t);

export const getPortfolioSummaryStats = (
  theme: BasePortfolioEnum,
  hasSwissBias: boolean,
): PortfolioSummaryStats => {
  if (theme === 'INCOME') {
    return {
      scoreLevel: 'OPTION_2_CAUTIOUS_GROWTH',
      diversificationLevel: hasSwissBias ? 'GOOD' : 'GREAT',
    };
  }

  if (theme === 'SUSTAINABLE') {
    return {
      scoreLevel: 'OPTION_3_WELL_BALANCED',
      diversificationLevel: hasSwissBias ? 'GOOD' : 'GREAT',
    };
  }

  return {
    scoreLevel: hasSwissBias ? 'OPTION_2_CAUTIOUS_GROWTH' : 'OPTION_3_WELL_BALANCED',
    diversificationLevel: hasSwissBias ? 'GOOD' : 'GREAT',
  };
};
