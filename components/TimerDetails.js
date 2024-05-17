import React, { useContext, useState } from 'react';
import { Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalContext } from '../context/GlobalProvider';
import { styles } from './TimerDetailsStyles';

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
      <Text style={styles.header}>Timer Details</Text>
      <Text style={styles.label}>Duration (seconds)</Text>
      <TextInput
        style={styles.input}
        value={duration.toString()}
        onChangeText={(text) => setDuration(Number(text))}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Loop Count</Text>
      <TextInput
        style={styles.input}
        value={loopCount.toString()}
        onChangeText={(text) => setLoopCount(Number(text))}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Sound Options</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Sound at Start</Text>
        <Switch value={soundAtStart} onValueChange={setSoundAtStart} />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Sound at End</Text>
        <Switch value={soundAtEnd} onValueChange={setSoundAtEnd} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveTimer}>
          <Icon name="checkmark-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Icon name="close-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimerDetails;
