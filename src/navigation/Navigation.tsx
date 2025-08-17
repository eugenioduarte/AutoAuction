import { NavigationContainer } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import React from 'react'
import VehiclesDetailsScreen from '../screens/vehiclesDetailsScreen/VehiclesDetailsScreen'
import VehiclesListScreen from '../screens/vehiclesListScreen/VehiclesListScreen'
import { navigationRef } from './navigationRef'
import { RootStackParamList } from './navigatorManager'
import { NavigationScreenName } from './screens'

const Stack = createNativeStackNavigator<RootStackParamList>()

const stackOptionHeaderOff = {
  headerShown: false,
}

const stackModalOptions: NativeStackNavigationOptions = {
  presentation: 'modal',
  animation: 'slide_from_bottom',
}

export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={stackOptionHeaderOff}>
        <Stack.Screen
          name={NavigationScreenName.VehiclesList}
          component={VehiclesListScreen}
        />
        <Stack.Screen
          name={NavigationScreenName.VehiclesDetails}
          component={VehiclesDetailsScreen}
          options={stackModalOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
