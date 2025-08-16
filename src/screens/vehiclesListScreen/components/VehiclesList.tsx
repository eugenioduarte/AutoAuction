import { useGetVehiclesAvailable } from '@/src/hooks/useGetVehiclesAvailable'
import { Vehicle } from '@/src/types/vehicle.type'
import React, { useCallback } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { useVehiclesStore } from '../../../store/vehicles.store'
import VehiclesListCard from './VehiclesListCard'

const VehiclesList = () => {
  const { items, status, loadMore } = useGetVehiclesAvailable()
  const { filteredItems } = useVehiclesStore()

  const vehicles = filteredItems.length > 0 ? filteredItems : items

  const renderItem = useCallback(
    ({ item }: { item: Vehicle }) => <VehiclesListCard vehicle={item} />,
    [],
  )

  return (
    <View>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 10, paddingBottom: 200 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          status === 'loading' ? <ActivityIndicator /> : null
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default VehiclesList
