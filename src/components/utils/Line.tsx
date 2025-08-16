import { useTheme } from '@/src/hooks/useTheme'
import React from 'react'
import { View } from 'react-native'

const Line = () => {
  const theme = useTheme()
  return (
    <View
      style={{
        height: 1,
        backgroundColor: theme.colors.primary,
        marginBottom: theme.spacings.medium,
        marginTop: theme.spacings.small,
      }}
    />
  )
}

export default Line
