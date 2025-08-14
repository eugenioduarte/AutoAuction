import { useTheme } from '@/src/hooks/useTheme'
import React from 'react'
import { Text, View } from 'react-native'

const VehiclesDetailsScreen = () => {
  const { colors, spacings, typography } = useTheme()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
      }}
    >
      <Text>VehiclesDetailsScreen</Text>
    </View>
  )
}

export default VehiclesDetailsScreen
