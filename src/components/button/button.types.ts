import { TextProps, TouchableOpacityProps } from 'react-native'

export const BUTTON_VARIANT = {
  filled: 'filled',
  outline: 'outline',
  text: 'text',
} as const

export type ButtonVariant = keyof typeof BUTTON_VARIANT

export type ButtonProps = TouchableOpacityProps & {
  textProps?: TextProps
  variant?: ButtonVariant
  children: React.ReactNode
}
