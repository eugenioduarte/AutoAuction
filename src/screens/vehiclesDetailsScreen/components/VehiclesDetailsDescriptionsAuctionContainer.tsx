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
      <Text variant="bodySmall" style={styles.textLabel}>
        {translations.auctionDate}
      </Text>
      <Text variant="titleLarge" style={styles.title}>
        {auctionStatusText}
      </Text>
      <Text variant="bodySmall" style={styles.textLabel}>
        {translations.startingBid}
      </Text>
      <Text variant="titleLarge" style={styles.title}>
        {startingBidFormattedValue}
      </Text>
      <Button style={styles.button} disabled={isAuctionEndedStatus}>
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
    title: {
      color: isAuctionEnded ? theme.colors.warning_text : theme.colors.primary,
      textAlign: 'center',
      marginBottom: theme.spacings.large,
    },
    textLabel: {
      color: theme.colors.grey,
      textAlign: 'center',
    },
    button: {
      width: '90%',
    },
  })
