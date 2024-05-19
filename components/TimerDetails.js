import React, { useContext, useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { GlobalContext } from '../context/GlobalProvider';
import colors from '../styles/colors';
import Button from './Button';
import Header from './Header';
import Label from './Label';
import StepperInput from './StepperInput';

const TimerDetails = ({ route, navigation }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { exerciseId, timerId } = route.params || {};
  const exercise = state.exercises.find((ex) => ex.id === exerciseId);
  const timer = exercise ? exercise.timers.find((t) => t.id === timerId) : null;

  const [duration, setDuration] = useState(timer ? timer.duration : 30);
  const [loopCount, setLoopCount] = useState(timer ? timer.loop : 1);
  const [soundAtStart, setSoundAtStart] = useState(timer ? timer.soundAtStart : false);
  const [soundAtEnd, setSoundAtEnd] = useState(timer ? timer.soundAtEnd : false);

  const saveTimer = () => {
    const newTimer = { id: timerId || new Date().toISOString(), duration, loop: loopCount, soundAtStart, soundAtEnd };
    if (timerId) {
      dispatch({ type: 'EDIT_TIMER', payload: { exerciseId, timer: newTimer } });
    } else {
      dispatch({ type: 'ADD_TIMER', payload: { exerciseId, timer: newTimer } });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header text='Timer Details' />
      <StepperInput label='Duration (seconds)' value={duration} onChange={(text) => setDuration(Number(text))} />
      <StepperInput label='Loop Count' value={loopCount} onChange={(text) => setLoopCount(Number(text))} />
      <View style={styles.switchContainer}>
        <Label text='Sound at Start' />
        <Switch value={soundAtStart} onValueChange={setSoundAtStart} />
      </View>
      <View style={styles.switchContainer}>
        <Label text='Sound at End' />
        <Switch value={soundAtEnd} onValueChange={setSoundAtEnd} />
      </View>
      <View style={styles.buttonContainer}>
        <Button text='Save' onPress={saveTimer} iconName="checkmark-outline" backgroundColor={colors.primary} />
        <Button text='Cancel' onPress={() => navigation.goBack()} iconName="close-outline" backgroundColor={colors.secondary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TimerDetails;
