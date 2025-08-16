import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme.type'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Text from '../text/Text'

const Badge = ({ title }: { title: string }) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <Text variant={'bodySmall'} style={styles.text}>
        {title}
      </Text>
    </View>
  )
}

export default Badge

const getStyles = ({ colors, spacings, border }: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: spacings.small,
      paddingVertical: spacings.xSmall,
      backgroundColor: colors.tertiary,
      borderRadius: border.radius,
      height: spacings.large,
    },
    text: {
      color: colors.surface,
    },
  })
