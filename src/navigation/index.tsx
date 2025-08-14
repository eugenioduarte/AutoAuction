import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import VehiclesDetailsScreen from '../screens/vehiclesDetailsScreen/VehiclesDetailsScreen'
import VehiclesListScreen from '../screens/vehiclesListScreen/VehiclesListScreen'
const Stack = createNativeStackNavigator()

const stackOptions = {
  headerShown: false,
}

export const NavigationScreenName = {
  VehiclesList: 'VehiclesList',
  VehiclesDetails: 'VehiclesDetails',
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={NavigationScreenName.VehiclesList}
          component={VehiclesListScreen}
          options={stackOptions}
        />
        <Stack.Screen
          name={NavigationScreenName.VehiclesDetails}
          component={VehiclesDetailsScreen}
          options={stackOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
