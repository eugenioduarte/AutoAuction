import { registerRootComponent } from 'expo'
import Navigation from './src/navigation'

export default function App() {
  return <Navigation />
}

registerRootComponent(App)
