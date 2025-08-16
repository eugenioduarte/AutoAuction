import { CalendarIcon, GaugeIcon } from '@/assets/icons'
import { Button, FavoriteButton, ImageCar, Text } from '@/src/components'
import Badge from '@/src/components/badge/Badge'
import { BUTTON_VARIANT } from '@/src/components/button/button.types'
import { useTheme } from '@/src/hooks/useTheme'
import { t } from '@/src/locales'
import { navigatorManager } from '@/src/navigation/navigatorManager'
import { Theme } from '@/src/types/theme.type'
import { Vehicle } from '@/src/types/vehicle.type'
import {
  getAuctionTimeLeft,
  isAuctionEndingSoon,
} from '@/src/utils/isAuctionEndingSoon'
import { startingBidFormatted } from '@/src/utils/startingBidFormatted'

import React from 'react'
import { StyleSheet, View } from 'react-native'

type VehiclesListCardProps = {
  vehicle: Vehicle
}

const VehiclesListCard = React.memo(
  ({ vehicle }: VehiclesListCardProps) => {
    const theme = useTheme()
    const styles = getStyles(theme)

    const handleVehicleDetails = () => {
      navigatorManager.goToVehiclesDetailsScreen({ id: vehicle.id })
    }

    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <ImageCar />
          <View style={styles.detailsContainer}>
            <View style={styles.rowBetween}>
              <Text variant="titleLarge">{vehicle.model}</Text>
              <FavoriteButton vehicleId={vehicle.id} />
            </View>

            <Text variant="bodySmall">{vehicle.make}</Text>
            <View style={styles.rowBetween}>
              <View style={styles.iconTextRow}>
                <CalendarIcon
                  width={15}
                  height={15}
                  color={theme.colors.text}
                />
                <Text variant="bodySmall" style={styles.text}>
                  {vehicle.year}
                </Text>
              </View>

              <View style={styles.iconTextRow}>
                <GaugeIcon width={25} height={25} color={theme.colors.text} />
                <Text variant="bodySmall" style={styles.text}>
                  {vehicle.mileage} km
                </Text>
              </View>
            </View>
            <View style={styles.rowBetween}>
              <Text variant="bodyLarge">
                {startingBidFormatted(vehicle.startingBid)}
              </Text>
              {isAuctionEndingSoon(vehicle.auctionDateTime) && (
                <Badge title={getAuctionTimeLeft(vehicle.auctionDateTime)} />
              )}
            </View>
          </View>
        </View>
        <Button
          testID="vehicle-details-btn"
          onPress={handleVehicleDetails}
          variant={BUTTON_VARIANT.filled}
          style={styles.button}
        >
          {t('vehiclesListCard.seeOffer')}
        </Button>
      </View>
    )
  },
  (prevProps, nextProps) => prevProps.vehicle.id === nextProps.vehicle.id,
)

VehiclesListCard.displayName = 'VehiclesListCard'

export default VehiclesListCard

const getStyles = ({ colors, spacings, border }: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: border.size,
      borderColor: colors.tertiary,
      borderRadius: border.radius,
    },
    infoContainer: {
      padding: spacings.small,
      backgroundColor: colors.surface,
      borderColor: colors.tertiary,
      flexDirection: 'row',
      alignItems: 'center',
      borderStartStartRadius: border.radius,
      borderStartEndRadius: border.radius,
    },
    detailsContainer: {
      flex: 1,
      gap: spacings.small / 2,
      marginLeft: spacings.xSmall,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      minHeight: spacings.large,
    },
    iconTextRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      borderBottomEndRadius: border.radius,
      borderBottomStartRadius: border.radius,
      borderStartStartRadius: 0,
      borderStartEndRadius: 0,
    },
    text: {
      marginLeft: spacings.xSmall,
    },
  })
