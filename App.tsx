import { registerRootComponent } from 'expo'
import 'react-native-reanimated'
import Navigation from './src/navigation/Navigation'

export default function App() {
  return <Navigation />
}

registerRootComponent(App)
