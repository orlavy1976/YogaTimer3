import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExerciseDetails from '../components/ExerciseDetails';
import ExerciseList from '../components/ExerciseList';
import TimerDetails from '../components/TimerDetails';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: '#6a4c93', // Set the title color here
          headerStyle: { backgroundColor: '#dddddd' }, // Optionally, set the background color of the header
        }}>
        <Stack.Screen name="ExerciseList" component={ExerciseList} options={{ title: 'Yoga Timer' }} />
        <Stack.Screen name="ExerciseDetails" component={ExerciseDetails} options={{ title: 'Exercise Details' }} />
        <Stack.Screen name="TimerDetails" component={TimerDetails} options={{ title: 'Timer Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
