import { DrawerActions } from '@react-navigation/native'
import { navigationRef } from './navigationRef'
import { NavigationScreenName } from './screens'

export const navigatorManager = {
  goToVehiclesListScreen: () => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(NavigationScreenName.VehiclesList)
    }
  },
  goToVehiclesDetailsScreen: () => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(NavigationScreenName.VehiclesDetails)
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
