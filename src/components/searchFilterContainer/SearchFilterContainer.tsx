import { FilterIcon } from '@/assets/icons'
import { sizes } from '@/src/constants/sizes'
import React from 'react'
import { TextInput, View } from 'react-native'
import Button from '../button/Button'
import { BUTTON_VARIANT } from '../button/button.types'
import FilterBSheet from '../modals/FilterBSheet'

const SearchFilterContainer = () => {
  const [filterModalVisible, setFilterModalVisible] = React.useState(false)

  const handleFilterPress = () => {
    setFilterModalVisible(!filterModalVisible)
  }

  return (
    <View
      style={{
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <TextInput
        placeholder="Search vehicles..."
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 5,
          flex: 1,
        }}
      />

      <Button
        style={{ marginLeft: 10 }}
        variant={BUTTON_VARIANT.text}
        onPress={handleFilterPress}
      >
        <FilterIcon
          width={sizes.ICON_SIZE_DEFAULT}
          height={sizes.ICON_SIZE_DEFAULT}
        />
      </Button>
      <FilterBSheet
        visible={filterModalVisible}
        setVisible={setFilterModalVisible}
      />
    </View>
  )
}

export default SearchFilterContainer
