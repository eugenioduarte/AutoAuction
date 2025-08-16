import {
  AudiIcon,
  BMWIcon,
  BrandCarPlaceholderIcon,
  CitroenIcon,
  FordIcon,
  MercedesBenzIcon,
  ToyotaIcon,
  VolkswagenIcon,
  VolvoIcon,
} from '@/assets/icons'
import { sizes } from '@/src/constants/sizes'
import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme.type'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const brandIcons = {
  Audi: AudiIcon,
  BMW: BMWIcon,
  Citroen: CitroenIcon,
  Ford: FordIcon,
  'Mercedes-Benz': MercedesBenzIcon,
  Toyota: ToyotaIcon,
  Volkswagen: VolkswagenIcon,
  Volvo: VolvoIcon,
  Default: BrandCarPlaceholderIcon,
}

type BrandButtonProps = {
  brand: string
  isSelected?: boolean
  onPress?: () => void
}

const CarBrandButton = ({ brand, isSelected, onPress }: BrandButtonProps) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  const Icon =
    brandIcons[brand as keyof typeof brandIcons] || brandIcons.Default

  return (
    <TouchableOpacity
      style={[styles.base, isSelected && styles.selected]}
      onPress={onPress}
      activeOpacity={1}
    >
      <Icon width={sizes.ICON_SIZE_DEFAULT} height={sizes.ICON_SIZE_DEFAULT} />
    </TouchableOpacity>
  )
}

export default CarBrandButton

const getStyles = ({ colors, spacings, border }: Theme) =>
  StyleSheet.create({
    base: {
      padding: spacings.small,
      borderWidth: border.size,
      borderColor: colors.tertiary,
      borderRadius: border.radius,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      margin: spacings.xTiny,
    },
    selected: {
      backgroundColor: colors.primary,
    },
  })
