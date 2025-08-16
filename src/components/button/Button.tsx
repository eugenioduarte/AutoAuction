import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme.type'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Text from '../text/Text'
import { ButtonProps } from './button.types'

const Button = ({
  variant = 'filled',
  style,
  children,
  textProps,
  disabled,
  ...touchableProps
}: ButtonProps) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  const isTextChild =
    typeof children === 'string' || typeof children === 'number'

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.base,
        style,
        styles[variant],
        disabled && styles.buttonDisabled,
      ]}
      {...touchableProps}
    >
      {isTextChild ? (
        <Text
          variant="titleMedium"
          style={[
            styles[`text_${variant}`],
            textProps?.style,
            disabled && styles.textDisabled,
          ]}
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

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    base: {
      paddingVertical: theme.spacings.small,
      paddingHorizontal: theme.spacings.medium,
      borderRadius: theme.spacings.small,
      alignItems: 'center',
      justifyContent: 'center',
    },
    filled: {
      backgroundColor: theme.colors.primary,
    },
    outline: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: 'transparent',
    },
    text: {
      backgroundColor: 'transparent',
    },
    text_filled: {
      color: theme.colors.light_text,
    },
    text_outline: {
      color: theme.colors.primary,
    },
    text_text: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
    buttonDisabled: {
      backgroundColor: theme.colors.disabled,
    },
    textDisabled: {
      color: theme.colors.text,
    },
  })
