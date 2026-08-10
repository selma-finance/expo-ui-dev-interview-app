/* eslint-disable unicorn/consistent-boolean-name -- `value` matches React Native Switch API */
import React from "react"
import { Pressable } from "react-native"

import Box from "src/components/Box"
import Switch from "src/components/Controllers/Switch"
import Icon from "src/components/Icon"
import Tag from "src/components/Tag"
import Text from "src/components/Text/Text"

export interface PortfolioCustomisationListItemProps {
  title: string
  description: string
  value: boolean
  onValueChange: (value: boolean) => void
  disabled?: boolean
  activeTag?: string
  onInfoPress?: () => void
  toggleTestID: string
  infoTestID?: string
  tagTestID?: string
}

const PortfolioCustomisationListItem: React.FC<PortfolioCustomisationListItemProps> = ({
  title,
  description,
  value,
  onValueChange,
  disabled,
  activeTag,
  onInfoPress,
  toggleTestID,
  infoTestID,
  tagTestID,
}) => (
  <Box flexDirection="row" gap="s">
    <Box flex={1} gap="xxs">
      <Box flexDirection="row" alignItems="center" gap="xxs">
        <Text variant="secondary" fontWeight="600" color="textPrimary">
          {title}
        </Text>
        {onInfoPress && infoTestID && (
          <Pressable testID={infoTestID} onPress={onInfoPress} hitSlop={24} accessibilityRole="button">
            <Icon name="information-circle-outline" size="medium" color="iconSubtle" />
          </Pressable>
        )}
      </Box>
      <Text variant="tertiary" color="textSecondary">
        {description}
      </Text>
    </Box>
    <Box justifyContent="center">
      {activeTag === undefined ? (
        <Switch
          testID={toggleTestID}
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          accessibilityLabel={title}
          accessibilityHint={description}
        />
      ) : (
        <Tag testID={tagTestID} label={activeTag} />
      )}
    </Box>
  </Box>
)

export default PortfolioCustomisationListItem
