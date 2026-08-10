import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import React from "react";

import PortfolioPreferencesScreen from "src/screens/App/Portfolio/Customisation/PortfolioPreferences/PortfolioPreferencesScreen";
import PortfolioSelectionScreen from "src/screens/App/Portfolio/Customisation/PortfolioSelection/PortfolioSelectionScreen";
import PortfolioSummaryScreen from "src/screens/App/Portfolio/Customisation/PortfolioSummary/PortfolioSummaryScreen";

import type { PortfolioCustomisationStackParamList } from "./portfolioCustomisationTypes";

const Stack = createStackNavigator<PortfolioCustomisationStackParamList>();

const navigationOptions: StackNavigationOptions = {
  gestureEnabled: false,
  headerShown: false,
};

export const PortfolioCustomisationNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen
        name="PortfolioSelection"
        component={PortfolioSelectionScreen}
      />
      <Stack.Screen
        name="PortfolioPreferences"
        component={PortfolioPreferencesScreen}
      />
      <Stack.Screen
        name="PortfolioSummary"
        component={PortfolioSummaryScreen}
      />
    </Stack.Navigator>
  );
};
