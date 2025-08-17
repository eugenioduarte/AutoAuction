import { Chevron, FavoriteIcon } from '@/assets/icons'
import { useTheme } from '@/src/hooks/useTheme'
import { t } from '@/src/locales'
import { navigatorManager } from '@/src/navigation/navigatorManager'
import { Theme } from '@/src/types/theme.type'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from '../text/Text'

const HeaderDetails = ({
  isFavourite,
  onToggleFavourite,
}: {
  isFavourite: boolean
  onToggleFavourite: () => void
}) => {
  const theme = useTheme()
  const styles = getStyles(theme, isFavourite)

  const handleGoBack = () => {
    navigatorManager.goBack()
  }

  const translations = {
    addToFavorites: t('HeaderDetails.addToFavorites'),
    removeFromFavorites: t('HeaderDetails.removeFromFavorites'),
  }

  const favouriteLabel = isFavourite
    ? translations.removeFromFavorites
    : translations.addToFavorites

  const iconStrokeColor = isFavourite ? theme.colors.primary : theme.colors.grey

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="header-back-button" onPress={handleGoBack}>
        <Chevron />
      </TouchableOpacity>
      <TouchableOpacity
        testID="header-fav-button"
        style={styles.favButton}
        onPress={onToggleFavourite}
      >
        <Text variant="bodySmall" style={styles.favButtonText}>
          {favouriteLabel}
        </Text>
        <FavoriteIcon
          width={20}
          height={20}
          stroke={iconStrokeColor}
          strokeWidth={3}
        />
      </TouchableOpacity>
    </View>
  )
}

export default HeaderDetails

const getStyles = (theme: Theme, isFavourite: boolean) =>
  StyleSheet.create({
    container: {
      paddingTop: theme.spacings.large,
      paddingBottom: theme.spacings.xLarge,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    favButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    favButtonText: {
      marginRight: theme.spacings.small,
      color: isFavourite ? theme.colors.primary : theme.colors.grey,
    },
  })
