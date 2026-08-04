import { SafeAreaView } from 'react-native-safe-area-context';

import Box from 'src/components/Box';
import Text from 'src/components/Text/Text';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} backgroundColor="backgroundBase" padding="m">
        <Text variant="h1">Home</Text>
      </Box>
    </SafeAreaView>
  );
}
