import { useKeepAwake } from 'expo-keep-awake';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GlobalProvider } from './context/GlobalProvider';
import StackNavigator from './navigation/StackNavigator';

export default function App() {
  useEffect(() => {
    useKeepAwake();
  }, []);

  return <GestureHandlerRootView style={{ flex: 1 }}>
    <GlobalProvider>
      <StackNavigator />
    </GlobalProvider></GestureHandlerRootView>;
}