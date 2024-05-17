import { GlobalProvider } from './context/GlobalProvider';
import StackNavigator from './navigation/StackNavigator';

export default function App() {

  return <GlobalProvider>
    <StackNavigator />
  </GlobalProvider>;
}