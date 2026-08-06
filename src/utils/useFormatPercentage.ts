export const formatPercentage = (value: number, options?: { digits?: number }): string => {
  const digits = options?.digits ?? 0;
  return `${value.toFixed(digits)}%`;
};

export const useFormatPercentage = () => formatPercentage;
