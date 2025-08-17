import { FavoriteIcon } from '@/assets/icons'
import { useTheme } from '@/src/hooks/useTheme'
import { useVehiclesStore } from '../../store/vehicles.store'

import { Theme } from '@/src/types/theme.type'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type FavoriteButtonProps = {
  vehicleId: string
}

const FavoriteButton = ({ vehicleId }: FavoriteButtonProps) => {
  const isFavorite = useVehiclesStore((state) =>
    state.vehicleIsFavouriteById(vehicleId),
  )
  const theme = useTheme()
  const styles = getStyles(theme, isFavorite)
  const { toggleFavourite } = useVehiclesStore()

  const handleAddToFavourites = () => {
    toggleFavourite(vehicleId)
  }

  const iconStrokeColor = isFavorite ? theme.colors.surface : theme.colors.text

  return (
    <View
      style={styles.container}
      onTouchEnd={handleAddToFavourites}
      testID="favorite-button-container"
    >
      <FavoriteIcon
        width={20}
        height={20}
        stroke={iconStrokeColor}
        strokeWidth={2}
      />
    </View>
  )
}

export default FavoriteButton

const getStyles = (theme: Theme, isFavorite: boolean) =>
  StyleSheet.create({
    container: {
      padding: theme.spacings.xSmall,
      backgroundColor: isFavorite
        ? theme.colors.primary
        : theme.colors.background,
      borderRadius: theme.border.radius,
    },
  })
