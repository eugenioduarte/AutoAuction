import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme.type'
import { brands } from '@/src/types/vehicle.type'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useVehiclesStore } from '../../store/vehicles.store'
import CarBrandButton from './CarBrandButton'

const CarBrandContainer = () => {
  const theme = useTheme()
  const styles = getStyles(theme)
  const { items, filteredItems, setFilteredItems } = useVehiclesStore()
  const [selectedBrand, setSelectedBrand] = React.useState<string | null>(null)

  useEffect(() => {
    const brand = filteredItems.map((item) => item.make)
    const uniqueBrands = Array.from(new Set(brand))
    setSelectedBrand(uniqueBrands.length === 1 ? uniqueBrands[0] : null)
  }, [filteredItems])

  const handleBrandPress = (brand: string) => {
    const isSameBrand = selectedBrand === brand
    const newSelectedBrand = isSameBrand ? null : brand
    setSelectedBrand(newSelectedBrand)

    if (newSelectedBrand) {
      const filteredItems = items.filter(
        (item) => item.make === newSelectedBrand,
      )
      setFilteredItems(filteredItems)
    } else {
      setFilteredItems(items)
    }
  }

  return (
    <View style={styles.row}>
      {brands.map((brand) => (
        <CarBrandButton
          key={brand}
          brand={brand}
          isSelected={selectedBrand === brand}
          onPress={() => handleBrandPress(brand)}
        />
      ))}
    </View>
  )
}

const getStyles = ({ colors, spacings, border }: Theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  })

export default CarBrandContainer
