import React from 'react';

import Box from 'src/components/Box';
import PressableButton from 'src/components/Button/PressableButton';
import Text from 'src/components/Text/Text';

interface ListRowTitleProps {
  title: string;
  linkLabel?: string;
  onLinkPress?: () => void;
}

const ListRowTitle: React.FC<ListRowTitleProps> = ({
  title,
  linkLabel,
  onLinkPress,
}) => (
  <Box
    paddingHorizontal="s"
    paddingVertical="xs"
    flexDirection="row"
    alignItems="center"
    justifyContent="space-between"
  >
    <Text variant="tertiary" color="textSecondary" fontWeight="600">
      {title}
    </Text>
    {linkLabel && (
      <PressableButton onPress={onLinkPress} accessibilityRole="button">
        <Text variant="tertiary" color="linkActive" fontWeight="600">
          {linkLabel}
        </Text>
      </PressableButton>
    )}
  </Box>
);

export default ListRowTitle;
