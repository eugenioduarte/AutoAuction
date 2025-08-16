import { useTheme } from '@/src/hooks/useTheme'
import React from 'react'
import { Text as RNText, StyleSheet, TextProps } from 'react-native'

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

  return <RNText style={[styles.base, typography[variant], style]} {...props} />
}

const styles = StyleSheet.create({
  base: {},
})

export default Text
