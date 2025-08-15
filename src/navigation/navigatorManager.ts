import {
  createNavigationContainerRef,
  DrawerActions,
} from '@react-navigation/native'
import { NavigationScreenName } from './Navigation'

export const navigationRef = createNavigationContainerRef()

export const navigatorManager = {
  goToVehiclesListScreen: () => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(NavigationScreenName.VehiclesList as never)
    }
  },
  goToVehiclesDetailsScreen: () => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(NavigationScreenName.VehiclesDetails as never)
    }
  },
  goBack: () => {
    if (navigationRef.isReady()) {
      navigationRef.goBack()
    }
  },
  openDrawer: () => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(DrawerActions.openDrawer())
    }
  },
}
