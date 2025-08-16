import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme.type'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Text from '../../text/Text'

const Chip = ({
  label,
  selected,
  onPress,
}: {
  label: string
  selected: boolean
  onPress: () => void
}) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
    >
      <Text
        style={selected ? styles.chipTextSelected : styles.chipText}
        variant="bodySmall"
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default Chip

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacings.small,
    },
    chip: {
      paddingHorizontal: theme.spacings.small,
      paddingVertical: theme.spacings.small,
      borderRadius: theme.border.radius,
      borderWidth: theme.border.size,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.surface,
      marginBottom: theme.spacings.xSmall,
    },
    chipSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    chipText: { color: theme.colors.text },
    chipTextSelected: { color: theme.colors.background },
  })
