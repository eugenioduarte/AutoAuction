import { CarCrashIcon } from '@/assets/icons'
import { useTheme } from '@/src/hooks/useTheme'
import { t } from '@/src/locales'
import { Theme } from '@/src/types/theme.type'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Text from '../text/Text'

const EmptyStateContainer = () => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <CarCrashIcon width={70} height={70} />
      <Text variant="titleLarge" style={styles.text}>
        {t('EmptyStateContainer.noVehiclesFound')}
      </Text>
    </View>
  )
}

export default EmptyStateContainer

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacings.medium,
      paddingHorizontal: theme.spacings.large,
    },
    text: {
      color: theme.colors.primary,
      textAlign: 'center',
      maxWidth: 200,
    },
  })
