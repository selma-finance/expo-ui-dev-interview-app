import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';

import HomeScreen from 'src/screens/App/Home/HomeScreen';

import type { MainStackParamList } from './mainNavigatorTypes';

const Stack = createStackNavigator<MainStackParamList>();

const navigationOptions: StackNavigationOptions = {
  gestureEnabled: false,
  headerShown: false,
};

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
