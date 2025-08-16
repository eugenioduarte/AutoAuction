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
  const styles = getStyles(theme)

  const handleGoBack = () => {
    navigatorManager.goBack()
  }

  const translations = {
    addToFavorites: t('HeaderDetails.addToFavorites'),
    removeFromFavorites: t('HeaderDetails.removeFromFavorites'),
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack}>
        <Chevron />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onToggleFavourite}
      >
        <Text
          variant="bodySmall"
          style={{
            marginRight: theme.spacings.small,
            color: isFavourite ? theme.colors.primary : theme.colors.grey,
          }}
        >
          {isFavourite
            ? translations.removeFromFavorites
            : translations.addToFavorites}
        </Text>
        <FavoriteIcon
          width={20}
          height={20}
          stroke={isFavourite ? theme.colors.primary : theme.colors.grey}
          strokeWidth={3}
        />
      </TouchableOpacity>
    </View>
  )
}

export default HeaderDetails

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingTop: theme.spacings.large,
      paddingBottom: theme.spacings.xLarge,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  })
