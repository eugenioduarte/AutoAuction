import { HeaderDetails, ImageCar, Text, ViewContainer } from '@/src/components'

import {
  CarIcon,
  EngineIcon,
  FuelIcon,
  MileageIcon,
  ModelIcon,
  YearIcon,
} from '@/assets/icons'
import { sizes } from '@/src/constants/sizes'
import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme.type'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import VehiclesDetailsDescriptionsAuctionContainer from './components/VehiclesDetailsDescriptionsAuctionContainer'
import { useVehiclesDetailsScreen } from './useVehiclesDetailsScreen'

const SIZE_ICON = 30

const renderDescriptionItem = (
  {
    item: { label, value, icon: Icon },
  }: {
    item: {
      label: string
      value: string | number | undefined
      icon: React.FC<any>
    }
  },
  styles: ReturnType<typeof getStyles>,
) => (
  <View style={styles.item}>
    <Icon width={SIZE_ICON} height={SIZE_ICON} />
    <View style={styles.textContainer}>
      <Text variant="bodySmall" style={styles.textLabel}>
        {label}
      </Text>
      <Text variant="bodyLarge" style={styles.textValue}>
        {value?.toString() || ''}
      </Text>
    </View>
  </View>
)

const VehiclesDetailsScreen = ({
  route,
}: {
  route: { params: { id: string } }
}) => {
  const { id } = route.params
  const { vehicle, toggleFavourite, isFavourite } = useVehiclesDetailsScreen(id)
  const theme = useTheme()
  const styles = getStyles(theme)

  const descriptionStructure = [
    { label: 'Make', value: vehicle?.make, icon: CarIcon },
    { label: 'Model', value: vehicle?.model, icon: ModelIcon },
    { label: 'Engine Size', value: vehicle?.engineSize, icon: EngineIcon },
    { label: 'Fuel', value: vehicle?.fuel, icon: FuelIcon },
    { label: 'Year', value: vehicle?.year, icon: YearIcon },
    { label: 'Mileage', value: vehicle?.mileage, icon: MileageIcon },
  ]

  if (!vehicle) {
    return null
  }

  return (
    <ViewContainer>
      <HeaderDetails
        isFavourite={isFavourite}
        onToggleFavourite={toggleFavourite}
      />
      <FlatList
        data={descriptionStructure}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        columnWrapperStyle={styles.row}
        renderItem={(item) => renderDescriptionItem(item, styles)}
        ListHeaderComponent={
          <ImageCar
            width={sizes.WIDTH_SCREEN}
            height={undefined}
            style={styles.carImage}
          />
        }
        ListFooterComponent={
          <VehiclesDetailsDescriptionsAuctionContainer vehicle={vehicle} />
        }
      />
    </ViewContainer>
  )
}

export default VehiclesDetailsScreen

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    row: {
      justifyContent: 'space-between',
      marginVertical: theme.spacings.xSmall,
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
      height: 90,
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
    textLabel: { color: theme.colors.grey, textAlign: 'center' },
    textValue: { textAlign: 'center', color: theme.colors.primary },
  })
