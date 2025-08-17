import { FilterIcon } from '@/assets/icons'
import { sizes } from '@/src/constants/sizes'
import { useTheme } from '@/src/hooks/useTheme'
import { t } from '@/src/locales'
import { Theme } from '@/src/types/theme.type'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useVehiclesStore } from '../../store/vehicles.store'
import Button from '../button/Button'
import { BUTTON_VARIANT } from '../button/button.types'
import FilterBSheet from '../modals/FilterBSheet'
import Text from '../text/Text'
import TextInput from '../textInput/TextInput'

const SearchFilterContainer = () => {
  const theme = useTheme()
  const styles = styleData(theme)
  const [filterModalVisible, setFilterModalVisible] = React.useState(false)
  const { items, setFilteredItems } = useVehiclesStore()
  const [hasResultWasNotFound, setHasResultWasNotFound] = React.useState(false)
  const [searchText, setSearchText] = React.useState('')

  const handleFilterPress = () => {
    setHasResultWasNotFound(false)
    setSearchText('')
    setFilterModalVisible(!filterModalVisible)
  }

  const handleSearchChange = React.useCallback(
    (text: string) => {
      if (text.length < 2) {
        setFilteredItems(items)
        setHasResultWasNotFound(false)
        return
      }
      const filtered = items.filter((item) =>
        item.model.toLowerCase().includes(text.toLowerCase()),
      )
      setHasResultWasNotFound(filtered.length === 0)
      setFilteredItems(filtered)
    },
    [items, setFilteredItems],
  )

  const handleSearchTextChange = (text: string) => {
    setSearchText(text)
    handleSearchChange(text)
  }

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={t('searchFilterContainer.searchVehicles')}
          onChangeText={handleSearchTextChange}
          value={searchText}
          style={styles.textInput}
        />
        <Text variant="bodySmall" style={styles.textResultNotFound}>
          {hasResultWasNotFound ? t('searchFilterContainer.modelNotFound') : ''}
        </Text>
      </View>

      <Button
        style={styles.button}
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

const styleData = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginTop: theme.spacings.small,
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingBottom: theme.spacings.small,
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: 1,
    },
    textInputContainer: {
      flex: 1,
      marginBottom: theme.spacings.medium,
    },
    textInput: { minHeight: 40 },
    textResultNotFound: {
      marginTop: theme.spacings.xSmall,
      color: theme.colors.warning_text,
    },
    button: { marginLeft: theme.spacings.xSmall },
  })
