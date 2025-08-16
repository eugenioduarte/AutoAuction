import { placeholders } from '@/src/constants/placeholders'
import { sizes } from '@/src/constants/sizes'
import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme.type'
import React from 'react'
import { Image, StyleSheet } from 'react-native'

type ImageCarProps = {
  width?: number
  height?: number
}

const ImageCar = ({
  width = sizes.IMAGE_CAR_SIZE,
  height = sizes.IMAGE_CAR_SIZE,
  style,
}: ImageCarProps & { style?: object }) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <Image
      source={{
        uri: placeholders.CAR_PLACEHOLDER_IMAGE,
      }}
      style={[styles.carImage, { width, height }, style]}
      resizeMode="cover"
    />
  )
}

export default ImageCar

const getStyles = ({ spacings, border }: Theme) =>
  StyleSheet.create({
    carImage: {
      marginRight: spacings.small,
      borderRadius: border.radius,
    },
  })
