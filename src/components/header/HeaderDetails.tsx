import { useTheme } from '@/src/hooks/useTheme'
import { navigatorManager } from '@/src/navigation/navigatorManager'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
const HeaderDetails = () => {
  const { colors } = useTheme()
  return (
    <View>
      <TouchableOpacity onPress={() => navigatorManager.goBack()}>
        <Text style={{ color: colors.primary }}>back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HeaderDetails
