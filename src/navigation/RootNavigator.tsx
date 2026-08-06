import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";
import {
    createStackNavigator,
    StackNavigationOptions,
} from "@react-navigation/stack";
import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";

import theme, { darkTheme } from "src/styling/restyle/defaultTheme";

import { MainNavigator } from "./MainNavigator";

type RootStackParamList = {
  Main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const navigationOptions: StackNavigationOptions = {
  gestureEnabled: true,
  headerShown: false,
};

export const RootNavigator: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ThemeProvider theme={isDark ? darkTheme : theme}>
      <StatusBar style="auto" />
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Stack.Navigator screenOptions={navigationOptions}>
          <Stack.Screen name="Main" component={MainNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};
