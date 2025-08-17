import { CloseIcon } from '@/assets/icons'
import { sizes } from '@/src/constants/sizes'
import { useTheme } from '@/src/hooks/useTheme'
import { t } from '@/src/locales'
import { Theme } from '@/src/types/theme.type'
import React, { useMemo, useReducer } from 'react'
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useVehiclesStore } from '../../store/vehicles.store'
import Button from '../button/Button'
import { BUTTON_VARIANT } from '../button/button.types'
import Text from '../text/Text'
import Chip from './components/FilterChip'
import RangeInput from './components/RangeInput'
import Section from './components/Section'
import { filterReducer, initialFilterState } from './filterReducer'

type FilterBSheetProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const { height } = Dimensions.get('window')

const FilterBSheet = ({ visible, setVisible }: FilterBSheetProps) => {
  const { items, setFilteredItems, setFilterActive } = useVehiclesStore()
  const [state, dispatch] = useReducer(filterReducer, initialFilterState)
  const theme = useTheme()
  const styles = getStyles(theme)

  const translations = {
    clearFilters: t('filterBSheet.clearFilters'),
    applyFilters: t('filterBSheet.applyFilters'),
    fuel: t('filterBSheet.fuel'),
    engineSize: t('filterBSheet.engineSize'),
    year: t('filterBSheet.year'),
    mileage: t('filterBSheet.mileage'),
    auctionDate: t('filterBSheet.auctionDate'),
    startingBid: t('filterBSheet.startingBid'),
    make: t('filterBSheet.make'),
    model: t('filterBSheet.model'),
    filter: t('filterBSheet.filter'),
    close: t('common.close'),
    favourites: t('filterBSheet.favourites'),
    onlyFavourites: t('filterBSheet.onlyFavourites'),
  }

  const brands = useMemo(
    () => Array.from(new Set(items.map((v) => v.make))).sort(),
    [items],
  )

  const models = useMemo(
    () =>
      state.selectedMake
        ? Array.from(
            new Set(
              items
                .filter((v) => v.make === state.selectedMake)
                .map((v) => v.model),
            ),
          ).sort()
        : [],
    [items, state.selectedMake],
  )

  const engineSizes = useMemo(
    () =>
      Array.from(new Set(items.map((v) => v.engineSize)))
        .filter(Boolean)
        .sort((a, b) => Number(a) - Number(b)),
    [items],
  )
  const fuelTypes = useMemo(
    () => Array.from(new Set(items.map((v) => v.fuel))).sort(),
    [items],
  )

  const handleClose = () => setVisible(false)

  const handleApplyFilters = () => {
    let filtered = items

    if (state.onlyFavourites) {
      filtered = filtered.filter((v) => v.favourite)
    }
    if (state.selectedMake)
      filtered = filtered.filter((v) => v.make === state.selectedMake)
    if (state.selectedModel)
      filtered = filtered.filter((v) => v.model === state.selectedModel)
    if (state.selectedFuel)
      filtered = filtered.filter((v) => v.fuel === state.selectedFuel)

    if (state.selectedEngineSize) {
      filtered = filtered.filter(
        (v) => v.engineSize.toString() === state.selectedEngineSize,
      )
    }

    if (state.yearRange[0] || state.yearRange[1]) {
      const min = parseInt(state.yearRange[0]) || 0
      const max = parseInt(state.yearRange[1]) || new Date().getFullYear()
      filtered = filtered.filter((v) => v.year >= min && v.year <= max)
    }

    if (state.mileageRange[0] || state.mileageRange[1]) {
      const min = parseInt(state.mileageRange[0]) || 0
      const max = parseInt(state.mileageRange[1]) || Infinity
      filtered = filtered.filter((v) => v.mileage >= min && v.mileage <= max)
    }

    if (state.startingBidRange[0] || state.startingBidRange[1]) {
      const min = state.startingBidRange[0]
        ? Number(state.startingBidRange[0].replace(/\D/g, ''))
        : 0
      const max = state.startingBidRange[1]
        ? Number(state.startingBidRange[1].replace(/\D/g, ''))
        : Infinity

      filtered = filtered.filter(
        (v) => v.startingBid >= min && v.startingBid <= max,
      )
    }
    if (state.startingBidRange[0] || state.startingBidRange[1]) {
      const min = parseFloat(state.startingBidRange[0]) || 0
      const max = parseFloat(state.startingBidRange[1]) || Infinity
      filtered = filtered.filter(
        (v) => v.startingBid >= min && v.startingBid <= max,
      )
    }

    setFilteredItems(filtered)
    setFilterActive(true)
    handleClose()
  }

  const handleClearFilters = () => {
    dispatch({ type: 'RESET' })
    setFilterActive(false)
    setFilteredItems(items)
  }

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={handleClose}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.sheetWrapper}>
        <View style={styles.sheet}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            extraScrollHeight={20}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.containerHeader}>
                <Text variant="titleLarge">{translations.filter}</Text>
                <Button
                  onPress={handleClose}
                  style={styles.buttonClose}
                  variant={BUTTON_VARIANT.text}
                >
                  <CloseIcon
                    width={sizes.ICON_SIZE_DEFAULT}
                    height={sizes.ICON_SIZE_DEFAULT}
                  />
                </Button>
              </View>

              <Section title={t('filterBSheet.favourites')}>
                <View style={styles.chipContainer}>
                  <Chip
                    key="favorites"
                    label={t('filterBSheet.onlyFavourites')}
                    selected={state.onlyFavourites}
                    onPress={() =>
                      dispatch({
                        type: 'SET_ONLY_FAVOURITES',
                        payload: !state.onlyFavourites,
                      })
                    }
                  />
                </View>
              </Section>
              <Section title={translations.make}>
                <View style={styles.chipContainer}>
                  {brands.map((brand) => (
                    <Chip
                      key={brand}
                      label={brand}
                      selected={state.selectedMake === brand}
                      onPress={() =>
                        dispatch({
                          type: 'SET_MAKE',
                          payload: state.selectedMake === brand ? null : brand,
                        })
                      }
                    />
                  ))}
                </View>
              </Section>

              {state.selectedMake && (
                <Section title={translations.model}>
                  <View style={styles.chipContainer}>
                    {models.map((model) => (
                      <Chip
                        key={model}
                        label={model}
                        selected={state.selectedModel === model}
                        onPress={() =>
                          dispatch({
                            type: 'SET_MODEL',
                            payload:
                              state.selectedModel === model ? null : model,
                          })
                        }
                      />
                    ))}
                  </View>
                </Section>
              )}

              {engineSizes.length > 0 && (
                <Section title={translations.engineSize}>
                  <View style={styles.chipContainer}>
                    {engineSizes.map((size) => (
                      <Chip
                        key={size}
                        label={size.toString()}
                        selected={state.selectedEngineSize === size.toString()}
                        onPress={() =>
                          dispatch({
                            type: 'SET_ENGINE_SIZE',
                            payload:
                              state.selectedEngineSize === size.toString()
                                ? null
                                : size.toString(),
                          })
                        }
                      />
                    ))}
                  </View>
                </Section>
              )}

              <RangeInput
                title={translations.year}
                value={state.yearRange}
                setValue={(val) => dispatch({ type: 'SET_YEAR', payload: val })}
              />

              <RangeInput
                title={translations.mileage}
                value={state.mileageRange}
                setValue={(val) =>
                  dispatch({ type: 'SET_MILEAGE', payload: val })
                }
              />
              <RangeInput
                title={translations.auctionDate}
                value={state.auctionDateRange}
                setValue={(val) =>
                  dispatch({ type: 'SET_AUCTION_DATE', payload: val })
                }
              />
              <RangeInput
                title={translations.startingBid}
                value={state.startingBidRange}
                setValue={(val) =>
                  dispatch({ type: 'SET_STARTING_BID', payload: val })
                }
              />

              <Section title={translations.fuel}>
                <View style={styles.chipContainer}>
                  {fuelTypes.map((fuel) => (
                    <Chip
                      key={fuel}
                      label={fuel}
                      selected={state.selectedFuel === fuel}
                      onPress={() =>
                        dispatch({
                          type: 'SET_FUEL',
                          payload: state.selectedFuel === fuel ? null : fuel,
                        })
                      }
                    />
                  ))}
                </View>
              </Section>
            </ScrollView>

            <View style={styles.footer}>
              <Button
                onPress={handleClearFilters}
                style={styles.button}
                variant={BUTTON_VARIANT.outline}
              >
                {translations.clearFilters}
              </Button>
              <Button onPress={handleApplyFilters} style={styles.button}>
                {translations.applyFilters}
              </Button>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Modal>
  )
}

export default FilterBSheet

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    backdrop: { flex: 1 },
    button: { flex: 1 },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacings.small,
    },

    sheetWrapper: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    sheet: {
      height: height * 0.8,
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: theme.spacings.medium,
      borderTopRightRadius: theme.spacings.medium,
      paddingHorizontal: theme.spacings.medium,
      paddingTop: theme.spacings.small,
      paddingBottom: theme.spacings.xLarge,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.spacings.large,
      gap: theme.spacings.small,
    },
    containerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacings.large,
    },
    buttonClose: { width: 0 },
  })
