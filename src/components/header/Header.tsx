import { FavoriteIcon } from '@/assets/icons'
import { logoImage } from '@/assets/images'
import { sizes } from '@/src/constants/sizes'
import { useTheme } from '@/src/hooks/useTheme'
import { navigatorManager } from '@/src/navigation/navigatorManager'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Button from '../button/Button'
import { BUTTON_VARIANT } from '../button/button.types'
import Text from '../text/Text'

const Header = () => {
  const { colors, border, spacings } = useTheme()
  const styles = getStyles({ colors, spacings, border })

  const handleNavigateToHome = () => {
    navigatorManager.goToVehiclesListScreen()
  }

  const handleNavigateToMenu = () => {
    navigatorManager.openDrawer()
  }

  return (
    <View style={styles.container}>
      <Button
        testID="header-logo-btn"
        onPress={handleNavigateToHome}
        variant={BUTTON_VARIANT.text}
        style={styles.logoButton}
      >
        <>
          <Image
            source={logoImage}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text
            variant="bodySmall"
            style={{ color: colors.primary, marginLeft: spacings.small }}
          >
            Challenge Eugênio Silva
          </Text>
        </>
      </Button>

      <Button
        testID="header-menu-btn"
        onPress={handleNavigateToMenu}
        variant={BUTTON_VARIANT.text}
        style={styles.logoButton}
      >
        <FavoriteIcon
          width={sizes.ICON_SIZE_DEFAULT}
          height={sizes.ICON_SIZE_DEFAULT}
        />
      </Button>
    </View>
  )
}

export default Header

const getStyles = ({ colors, spacings, border }: any) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomColor: colors.tertiary,
      borderBottomWidth: border.size,
      marginBottom: spacings.medium,
    },

    logoImage: { width: sizes.ICON_LOGO_SIZE, height: sizes.ICON_LOGO_SIZE },
    logoButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 0,
    },
  })
