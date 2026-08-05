import React from 'react';

import Box from 'src/components/Box';
import Link from 'src/components/Link';
import Tag from 'src/components/Tag';
import Text from 'src/components/Text/Text';
import { Testable } from 'src/utils/testable';

export interface CardHeaderProps extends Testable {
  title?: string;
  icon?: React.ReactNode;
  link?: string;
  tag?: string;
  isLinkDisabled?: boolean;
  onPressLink?: () => void;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  testID,
  title,
  icon,
  link,
  tag,
  isLinkDisabled,
  onPressLink,
}) => (
  <Box testID={testID} flexDirection="row">
    <Box flex={1} flexDirection="row" gap="xs" alignItems="center">
      <Text color="textPrimary" variant="h3">
        {title}
      </Text>
      {icon && tag && <Tag testID={`${testID}-tag`} label={tag} />}
    </Box>
    {link && (
      <Link testID={`${testID}-link`} label={link} onPress={onPressLink} disabled={isLinkDisabled} hitSlop={20} />
    )}
    {!icon && tag && <Tag testID={`${testID}-tag`} label={tag} />}
    {icon}
  </Box>
);

export default CardHeader;
