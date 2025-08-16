import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme.type'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Text from '../../text/Text'
import Line from '../../utils/Line'

const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.section}>
      <Text variant="titleMedium">{title}</Text>
      <Line />
      {children}
    </View>
  )
}

export default Section

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    section: {
      marginBottom: theme.spacings.large,
    },
  })
