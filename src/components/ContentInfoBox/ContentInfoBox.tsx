import React from 'react';
import { Pressable } from 'react-native';

import Box from 'src/components/Box';
import Icon from 'src/components/Icon';
import Text from 'src/components/Text/Text';

type ContentInfoBoxBackgroundColor = 'grey' | 'white' | 'transparent';

export interface ContentInfoBoxProps {
  title: string;
  link?: string;
  border?: boolean;
  background?: ContentInfoBoxBackgroundColor;
  onLinkPress?: () => void;
}

const getBackgroundColor = (background: ContentInfoBoxBackgroundColor | undefined) => {
  switch (background) {
    case 'white':
      return { backgroundColor: 'backgroundSurface' } as const;
    case 'grey':
      return { backgroundColor: 'backgroundBase' } as const;
    default:
      return {} as const;
  }
};

const ContentInfoBox: React.FC<ContentInfoBoxProps> = ({
  title,
  link,
  onLinkPress,
  border,
  background,
}) => {
  const backgroundColor = getBackgroundColor(background);
  const isTextOnly = !border && !background;

  return (
    <Box
      {...backgroundColor}
      borderRadius="l"
      flexDirection={link ? 'row' : 'row-reverse'}
      gap="xs"
      paddingVertical="s"
      paddingHorizontal={isTextOnly ? 'none' : 's'}
    >
      <Box flex={isTextOnly ? 1 : undefined} justifyContent={link ? 'flex-start' : 'center'}>
        <Icon size="small" color="iconDefault" name="information-circle-outline" />
      </Box>
      <Box flex={isTextOnly ? undefined : 1} gap="xs" justifyContent="center">
        <Text variant="tertiary" fontWeight="600" color="textPrimary">
          {title}
        </Text>
        {link && (
          <Pressable onPress={onLinkPress}>
            <Text variant="tertiary" color="linkActive" fontWeight="700">
              {link}
            </Text>
          </Pressable>
        )}
      </Box>
    </Box>
  );
};

export default ContentInfoBox;
