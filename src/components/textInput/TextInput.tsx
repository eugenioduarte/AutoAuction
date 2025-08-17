import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme.type'
import React, { useState } from 'react'
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps,
  TextInput as TextInputRN,
} from 'react-native'

const TextInput = (props: TextInputProps) => {
  const theme = useTheme()
  const styles = getStyles(theme)
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true)
    props.onFocus?.(e)
  }

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false)
    props.onBlur?.(e)
  }

  return (
    <TextInputRN
      {...props}
      style={[styles.input, props.style, isFocused && styles.inputFocused]}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  )
}

export default TextInput

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    input: {
      flex: 1,
      borderWidth: theme.border.size,
      borderColor: theme.colors.primary,
      borderRadius: theme.border.radius,
      paddingHorizontal: theme.spacings.small,
      paddingVertical: theme.spacings.small,
    },
    inputFocused: {
      borderWidth: theme.border.size + 2,
    },
  })
