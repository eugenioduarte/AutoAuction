import { createNavigationContainerRef } from '@react-navigation/native'
import { NavigationScreenName } from './screens'

export const navigationRef = createNavigationContainerRef<{
  [NavigationScreenName.VehiclesList]: undefined
  [NavigationScreenName.VehiclesDetails]: undefined
}>()
