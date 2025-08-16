import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme.type'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ViewContainer = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme()
  const styles = styleData(theme)
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {children}
    </SafeAreaView>
  )
}

export default ViewContainer

const styleData = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacings.medium,
      paddingBottom: theme.spacings.xLarge,
    },
  })
