import { useGetVehiclesAvailable } from '@/src/hooks/useGetVehiclesAvailable'
import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme.type'
import { Vehicle } from '@/src/types/vehicle.type'
import React, { useCallback } from 'react'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { useVehiclesStore } from '../../../store/vehicles.store'
import VehiclesListCard from './VehiclesListCard'

const VehiclesList = () => {
  const { items, status, loadMore } = useGetVehiclesAvailable()
  const { filteredItems } = useVehiclesStore()
  const theme = useTheme()
  const styles = getStyles(theme)
  const vehicles = filteredItems.length > 0 ? filteredItems : items

  const renderItem = useCallback(
    ({ item }: { item: Vehicle }) => <VehiclesListCard vehicle={item} />,
    [],
  )

  return (
    <FlatList
      data={vehicles}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        status === 'loading' ? <ActivityIndicator /> : null
      }
      showsVerticalScrollIndicator={false}
      style={styles.list}
    />
  )
}

export default VehiclesList

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    contentContainer: { gap: theme.spacings.small },
    list: { paddingTop: theme.spacings.medium },
  })
