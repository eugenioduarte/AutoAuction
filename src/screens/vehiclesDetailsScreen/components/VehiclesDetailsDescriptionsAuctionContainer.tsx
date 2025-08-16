import { Button, Text } from '@/src/components'
import { useTheme } from '@/src/hooks/useTheme'
import { t } from '@/src/locales'
import { Theme } from '@/src/types/theme.type'
import { Vehicle } from '@/src/types/vehicle.type'
import {
  getAuctionStatusText,
  isAuctionEnded,
} from '@/src/utils/isAuctionEndingSoon'
import { startingBidFormatted } from '@/src/utils/startingBidFormatted'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type VehiclesDetailsScreenProps = {
  vehicle: Vehicle
}

const VehiclesDetailsDescriptionsAuctionContainer = ({
  vehicle,
}: VehiclesDetailsScreenProps) => {
  const auctionStatusText = getAuctionStatusText(vehicle?.auctionDateTime)
  const isAuctionEndedStatus = isAuctionEnded(vehicle?.auctionDateTime)
  const startingBidFormattedValue = startingBidFormatted(vehicle?.startingBid)
  const theme = useTheme()
  const styles = getStyles(theme, isAuctionEndedStatus)

  const translations = {
    auctionDate: t('VehiclesDetailsDescriptionsAuctionContainer.auctionStatus'),
    startingBid: t('VehiclesDetailsDescriptionsAuctionContainer.startingBid'),
    bidNow: t('VehiclesDetailsDescriptionsAuctionContainer.bidNow'),
    bidEnded: t('VehiclesDetailsDescriptionsAuctionContainer.bidEnded'),
  }

  return (
    <View style={styles.container}>
      <Text
        variant="bodySmall"
        style={{ color: theme.colors.grey, textAlign: 'center' }}
      >
        {translations.auctionDate}
      </Text>
      <Text variant="titleLarge" style={styles.title}>
        {auctionStatusText}
      </Text>
      <Text
        variant="bodySmall"
        style={{ color: theme.colors.grey, textAlign: 'center' }}
      >
        {translations.startingBid}
      </Text>
      <Text variant="titleLarge" style={styles.title}>
        {startingBidFormattedValue}
      </Text>
      <Button style={{ width: '90%' }} disabled={isAuctionEndedStatus}>
        {isAuctionEndedStatus ? translations.bidEnded : translations.bidNow}
      </Button>
    </View>
  )
}

export default VehiclesDetailsDescriptionsAuctionContainer

const getStyles = (theme: Theme, isAuctionEnded: boolean) =>
  StyleSheet.create({
    container: {
      paddingVertical: theme.spacings.large,
      alignItems: 'center',
      borderColor: isAuctionEnded
        ? theme.colors.warning_text
        : theme.colors.primary,
      borderWidth: 1,
      borderRadius: theme.border.radius,
      marginHorizontal: theme.spacings.xSmall,
    },
    item: {
      flex: 1,
      marginHorizontal: theme.spacings.xSmall,
      padding: theme.spacings.small,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: theme.border.radius,
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacings.xSmall,
      height: 120,
    },
    textContainer: {
      flexDirection: 'column',
    },
    carImage: {
      width: '100%',
      height: undefined,
      aspectRatio: 1.5,
      marginBottom: theme.spacings.small,
    },
    title: {
      color: isAuctionEnded ? theme.colors.warning_text : theme.colors.primary,
      textAlign: 'center',
      marginBottom: theme.spacings.large,
    },
  })
