import { useTheme } from '@/src/hooks/useTheme'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ButtonProps } from './button.types'

const Button = ({
  variant = 'filled',
  style,
  children,
  textProps,
  ...touchableProps
}: ButtonProps) => {
  const { colors, spacings, typography } = useTheme()
  const styles = getStyles({ colors, spacings, typography })

  const isTextChild =
    typeof children === 'string' || typeof children === 'number'

  return (
    <TouchableOpacity
      style={[styles.base, style, styles[variant]]}
      {...touchableProps}
    >
      {isTextChild ? (
        <Text
          style={[styles.textBase, styles[`text_${variant}`], textProps?.style]}
          {...textProps}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

export default Button

const getStyles = ({ colors, spacings, typography }: any) =>
  StyleSheet.create({
    base: {
      paddingVertical: spacings.small,
      paddingHorizontal: spacings.medium,
      borderRadius: spacings.small,
      alignItems: 'center',
      justifyContent: 'center',
    },
    filled: {
      backgroundColor: colors.primary,
    },
    outline: {
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: 'transparent',
    },
    text: {
      backgroundColor: 'transparent',
    },
    textBase: {
      ...typography.bodyLarge,
    },
    text_filled: {
      color: colors.light_text,
    },
    text_outline: {
      color: colors.primary,
    },
    text_text: {
      color: colors.primary,
      textDecorationLine: 'underline',
    },
  })
