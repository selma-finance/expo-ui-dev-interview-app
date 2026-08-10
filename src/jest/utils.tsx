import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '@shopify/restyle';
import { render, screen } from '@testing-library/react-native';
import React, { ComponentType } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import theme from 'src/styling/restyle/defaultTheme';

const Stack = createStackNavigator();

const initialMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export const SharedTestWrappers: React.FC<React.PropsWithChildren> = ({ children }) => (
  <SafeAreaProvider initialMetrics={initialMetrics}>
    <ThemeProvider theme={theme}>
      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
    </ThemeProvider>
  </SafeAreaProvider>
);

interface CreateScreenRendererOptions {
  initialParams?: object;
}

const wrapScreen = (Screen: ComponentType) => {
  const WrappedScreen = (props: object) => (
    <View testID="test-wrapper">
      <Screen {...props} />
    </View>
  );

  return WrappedScreen;
};

export const createScreenRenderer = (
  Screen: ComponentType,
  options: CreateScreenRendererOptions = {},
) => {
  const screenName = Screen.displayName ?? Screen.name ?? 'Screen';
  const WrappedScreen = wrapScreen(Screen);

  return {
    renderScreenAsync: async (initialParams = options.initialParams) => {
      jest.mocked(useRoute).mockReturnValue({
        name: screenName,
        key: screenName,
        params: initialParams,
      });

      await render(
        <SharedTestWrappers>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name={screenName}
                component={WrappedScreen}
                initialParams={initialParams}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SharedTestWrappers>,
      );

      expect(await screen.findByTestId('test-wrapper')).toBeOnTheScreen();
    },
  };
};
