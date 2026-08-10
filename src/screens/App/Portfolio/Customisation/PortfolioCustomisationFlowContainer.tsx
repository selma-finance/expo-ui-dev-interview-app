import React from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import BottomActionContainer from "src/components/BottomContainers/BottomActionContainer/BottomActionContainer";
import Box from "src/components/Box";
import ScreenHeaderTitle from "src/components/ScreenHeaderTitle";
import Text from "src/components/Text/Text";

interface PortfolioCustomisationFlowContainerProps {
  title: string;
  disclaimer?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  CTA?: {
    label?: string;
    onPress: () => void;
    disabled?: boolean;
  };
}

export const PortfolioCustomisationFlowContainer: React.FC<
  React.PropsWithChildren<PortfolioCustomisationFlowContainerProps>
> = ({ title, disclaimer, showBackButton = true, onBackPress, CTA, children }) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1} backgroundColor="backgroundBase">
      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
          <ScreenHeaderTitle
            flex={0}
            isShownBackBtn={showBackButton}
            label={title}
            onBackPress={onBackPress}
          />

          <Box flex={1} style={{ minHeight: 0 }}>
            {children}
          </Box>
      </SafeAreaView>

      <Box
        flexShrink={0}
        backgroundColor="backgroundBase"
        style={{ paddingBottom: insets.top + insets.bottom }}
      >
        {disclaimer && (
          <Box paddingHorizontal="s" paddingBottom="xs">
            <Text variant="secondary" color="textSecondary" textAlign="center">
              {disclaimer}
            </Text>
          </Box>
        )}

        {CTA && (
          <BottomActionContainer
            cta={{
              label: CTA.label ?? t("Commons.Continue"),
              onPress: CTA.onPress,
              disabled: CTA.disabled,
            }}
          />
        )}
      </Box>
    </Box>
  );
};
