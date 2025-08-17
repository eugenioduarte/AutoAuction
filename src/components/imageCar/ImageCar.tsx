import { placeholders } from '@/src/constants/placeholders'
import { sizes } from '@/src/constants/sizes'
import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme.type'
import React from 'react'
import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native'

type ImageCarProps = {
  width?: number
  height?: number
  style?: StyleProp<ImageStyle>
}

const ImageCar = ({
  width = sizes.IMAGE_CAR_SIZE,
  height = sizes.IMAGE_CAR_SIZE,
  style,
}: ImageCarProps & { style?: object }) => {
  const theme = useTheme()
  const styles = getStyles(theme, width, height)

  return (
    <Image
      testID="car-image"
      source={{
        uri: placeholders.CAR_PLACEHOLDER_IMAGE,
      }}
      style={[styles.carImage, styles.dynamicSize, style]}
      resizeMode="cover"
    />
  )
}

export default ImageCar

const getStyles = (
  { spacings, border }: Theme,
  width: number,
  height: number,
) =>
  StyleSheet.create({
    carImage: {
      marginRight: spacings.small,
      borderRadius: border.radius,
    },
    dynamicSize: {
      width,
      height,
    },
  })
