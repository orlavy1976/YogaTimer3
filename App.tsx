import { useKeepAwake } from 'expo-keep-awake';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GlobalProvider } from './context/GlobalProvider';
import StackNavigator from './navigation/StackNavigator';


export default function App() {
  useKeepAwake();
  return <GestureHandlerRootView style={{ flex: 1 }}>
    <GlobalProvider>
      <StackNavigator />
    </GlobalProvider></GestureHandlerRootView>;
}