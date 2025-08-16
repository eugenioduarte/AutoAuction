import { DrawerActions } from '@react-navigation/native'
import { navigationRef } from './navigationRef'
import { NavigationScreenName } from './screens'

export type RootStackParamList = {
  VehiclesList: undefined
  VehiclesDetails: { id: string }
}

export const navigatorManager = {
  goToVehiclesListScreen: () => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(NavigationScreenName.VehiclesList)
    }
  },
  goToVehiclesDetailsScreen: ({ id }: { id: string }) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(NavigationScreenName.VehiclesDetails, {
        id,
      })
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
