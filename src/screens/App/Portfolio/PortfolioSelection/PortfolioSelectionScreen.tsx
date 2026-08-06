import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

import PortfolioSelectionCard from "src/components/Cards/PortfolioSelectionCard/PortfolioSelectionCard";
import Carousel from "src/components/Carousel/Carousel";
import type { PortfolioCustomisationStackParamList } from "src/navigation/portfolioCustomisationTypes";
import { PortfolioCustomisationFlowContainer } from "src/screens/App/Portfolio/Customisation/PortfolioCustomisationFlowContainer";
import {
  getPortfolioThemeDisplayConfig,
  PORTFOLIO_TAB_ORDER,
} from "src/screens/App/Portfolio/Customisation/ThemeSelection/portfolioThemeSelectionConstants";
import type { BasePortfolioEnum } from "src/types/schemaTypes";

const CAROUSEL_HEIGHT = 368;

const PortfolioSelectionScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<StackNavigationProp<PortfolioCustomisationStackParamList>>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleContinue = useCallback(() => {
    const theme = PORTFOLIO_TAB_ORDER[selectedIndex] ?? "CLASSIC";
    navigation.navigate("PortfolioPreferences", { theme });
  }, [navigation, selectedIndex]);

  const showReadMore = useCallback(
    (theme: BasePortfolioEnum) => {
      Alert.alert(
        t(`PortfolioCard.${theme}.Title`),
        t(`PortfolioDescription.${theme}.Description`),
      );
    },
    [t],
  );

  return (
    <PortfolioCustomisationFlowContainer
      title={t("PortfolioCustomisation.PortfolioSelection.TopBar.Title")}
      disclaimer={t("PortfolioCustomisation.PortfolioSelection.Disclaimer")}
      CTA={{ onPress: handleContinue }}
    >
      <Carousel
        testID="portfolio-selection-carousel"
        data={[...PORTFOLIO_TAB_ORDER]}
        height={CAROUSEL_HEIGHT}
        activeIndex={selectedIndex}
        renderItem={(theme, index) => {
          const config = getPortfolioThemeDisplayConfig(theme);
          const isSelected = index === selectedIndex;

          return (
            <PortfolioSelectionCard
              testID={`portfolio-selection-card-${theme.toLowerCase()}`}
              title={t(`PortfolioCard.${theme}.Title`)}
              description={t(`PortfolioCard.${theme}.Description`)}
              image={{ src: config.image }}
              backgroundColor={config.backgroundColor}
              isSelected={isSelected}
              tag={isSelected ? t("Commons.Active") : undefined}
              readMore={{
                label: t("Commons.ReadMore"),
                onPress: () => showReadMore(theme),
              }}
              onPress={() => setSelectedIndex(index)}
            />
          );
        }}
      />
    </PortfolioCustomisationFlowContainer>
  );
};

export default PortfolioSelectionScreen;
