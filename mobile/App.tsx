import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes'
import { AuthProvider } from './src/contexts/AuthContext'

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>

      <StatusBar backgroundColor='#1d1d2e'
        style='light' translucent={ false } />
    </NavigationContainer>
  )
}