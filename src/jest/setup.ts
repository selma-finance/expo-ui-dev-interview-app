import 'react-native-gesture-handler/jestSetup';

import { cleanup } from '@testing-library/react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import '../utils/translations/i18next';
import { mockNavigation } from './mocks/mockNavigation';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock('expo-font');
jest.mock('expo-asset');

jest.mock('@gorhom/bottom-sheet', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- jest factory
  const { View } = require('react-native');

  return {
    BottomSheetModalProvider: ({ children }: { children: unknown }) => children,
    BottomSheetModal: View,
    BottomSheetView: View,
    BottomSheetBackdrop: View,
  };
});

jest.mock('react-native/Libraries/Image/Image', () => {
  const RNImage = jest.requireActual('react-native/Libraries/Image/Image');

  RNImage.resolveAssetSource = jest.fn((source: { uri?: string } | undefined) => ({
    width: 600,
    height: 400,
    uri: source?.uri ?? 'mocked-uri',
  }));

  return RNImage;
});

jest.mock('react-native-worklets', () => ({
  RuntimeKind: { ReactNative: 'ReactNative' },
  createSerializable: jest.fn((value: unknown) => value),
  isWorkletFunction: jest.fn(() => false),
  runOnUI: jest.fn((worklet: () => void) => worklet),
  runOnJS: jest.fn((function_: (...arguments_: unknown[]) => void) => function_),
  scheduleOnRN: jest.fn((callback: () => void) => callback()),
  scheduleOnUI: jest.fn((callback: () => void) => callback()),
  serializableMappingCache: new Map(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports -- reanimated test bootstrap
require('react-native-reanimated').setUpTests();

jest.mock('react-native-reanimated', () => {
  const ReanimatedMock = jest.requireActual('react-native-reanimated/mock');

  return {
    ...ReanimatedMock,
    useReducedMotion: jest.fn(() => false),
  };
});

beforeEach(() => {
  jest.mocked(useNavigation).mockReturnValue(mockNavigation);
  jest.mocked(useRoute).mockReturnValue({
    name: '',
    key: '',
    params: undefined,
  });
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
  jest.useRealTimers();
  cleanup();
});

jest.setTimeout(20_000);
