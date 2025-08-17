import { useTheme } from '@/src/hooks/useTheme'
import React from 'react'
import { Text as RNText, TextProps, TextStyle } from 'react-native'

export type TextVariant =
  | 'titleLarge'
  | 'titleMedium'
  | 'bodyLarge'
  | 'bodySmall'

export type AppTextProps = TextProps & {
  variant?: TextVariant
}

const Text = ({ variant = 'bodyLarge', style, ...props }: AppTextProps) => {
  const { typography } = useTheme()

  return <RNText style={[typography[variant] as TextStyle, style]} {...props} />
}

export default Text
