import {
  Button,
  HeaderDetails,
  ImageCar,
  ViewContainer,
} from '@/src/components'
import { useTheme } from '@/src/hooks/useTheme'
import React from 'react'

import VehiclesDetailsDescriptions from './components/VehiclesDetailsDescriptions'
const VehiclesDetailsScreen = () => {
  const { colors, spacings, typography } = useTheme()
  return (
    <ViewContainer>
      <HeaderDetails />
      <ImageCar />
      <VehiclesDetailsDescriptions />
      <Button />
    </ViewContainer>
  )
}

export default VehiclesDetailsScreen
