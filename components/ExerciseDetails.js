import { Audio } from 'expo-av';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalContext } from '../context/GlobalProvider';
import { styles } from './ExerciseDetailsStyles';

const ExerciseDetails = ({ route, navigation }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { exerciseId } = route.params || {};
  const exercise = state.exercises.find((ex) => ex.id === exerciseId) || { name: '', timers: [] };
  const [name, setName] = useState(exercise.name);
  const [timers, setTimers] = useState(exercise.timers);
  const [running, setRunning] = useState(false);
  const [stop, setStop] = useState(false);
  const [remainingTime, setRemainingTime] = useState(exercise.timers[0]?.duration || 0);
  const [currentLoop, setCurrentLoop] = useState(1);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const updatedExercise = state.exercises.find((ex) => ex.id === exerciseId);
    if (updatedExercise) {
      setTimers(updatedExercise.timers);
    }
  }, [state.exercises, exerciseId]);


  useEffect(() => {
    if (running) {
      console.log('Timer started');
      setCurrentLoop(1);
      setRemainingTime(exercise.timers[0]?.duration || 0);
      runExercise();
    } else {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    }
    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [running]);

  const saveExercise = () => {
    console.log('Saving exercise:', { name, timers });
    const newExercise = { id: exerciseId || new Date().toISOString(), name, timers };
    if (exerciseId) {
      dispatch({ type: 'EDIT_EXERCISE', payload: newExercise });
    } else {
      dispatch({ type: 'ADD_EXERCISE', payload: newExercise });
    }
    navigation.goBack();
  };

  const playSound = async (soundFile) => {
    console.log('Playing sound:', soundFile);
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  };

  const startExercise = () => {
    console.log('Starting exercise');
    if (running) return;
    setRunning(true);
  };

  const stopExercise = () => {
    console.log('Stopping exercise');
    setRunning(false);
  };

  const runExercise = async () => {
    for (let timer of timers) {
      timerRef.current = timer;
      for (let i = currentLoop; i <= timer.loop; i++) {
        if (!running) {
          console.log('Exercise stopped');
          return;
        }
        setRemainingTime(timer.duration);
        console.log(`Starting loop ${i + 1} for timer:`, timer);

        if (timer.soundAtStart) {
          //await playSound(require('../assets/start_sound.mp3'));
        }

        await new Promise((resolve) => {
          intervalRef.current = setInterval(() => {
            setRemainingTime((prev) => {
              console.log('Remaining time:', prev);
              if (prev <= 1) {
                clearInterval(intervalRef.current);
                resolve();
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          timeoutRef.current = setTimeout(async () => {
            console.log('Timer completed');
            clearInterval(intervalRef.current);
            if (timer.soundAtEnd) {
              //await playSound(require('../assets/end_sound.mp3'));
            }
            resolve();
          }, timer.duration * 1000);
        });

        if (!running) {
          console.log('Timer stopped');
          return;
        }

        setCurrentLoop((prev) => prev + 1);
      }
      setCurrentLoop(1);
    }
    setRunning(false);
    timerRef.current = null;
    console.log('Exercise fully completed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{exercise.name}</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Exercise Name"
        editable={!running}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => !running && navigation.navigate('TimerDetails', { exerciseId: exerciseId || new Date().toISOString() })}
        disabled={running}
      >
        <Icon name="add-circle-outline" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Timer</Text>
      </TouchableOpacity>
      <FlatList
        data={timers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.timerItem}>
            <Text style={styles.timerDetail}>Duration: {running && item.id == timerRef.current?.id ? `${remainingTime}/${item.duration}` : item.duration}s</Text>
            <Text style={styles.timerDetail}>Loop: {running && item.id == timerRef.current?.id ? `${currentLoop}/${item.loop}` : `${item.loop} times`}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate('TimerDetails', { exerciseId, timerId: item.id })}
                disabled={running}
              >
                <Icon name="pencil-outline" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  const newTimers = timers.filter((timer) => timer.id !== item.id);
                  setTimers(newTimers);
                  dispatch({ type: 'REMOVE_TIMER', payload: { exerciseId, timerId: item.id } });
                }}
                disabled={running}
              >
                <Icon name="trash-outline" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        {!running ? (
          <>
            <TouchableOpacity style={styles.saveButton} onPress={saveExercise}>
              <Icon name="checkmark-outline" size={24} color="#fff" />
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
              <Icon name="close-outline" size={24} color="#fff" />
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.runButton} onPress={startExercise}>
              <Icon name="play-outline" size={24} color="#fff" />
              <Text style={styles.buttonText}>Run</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.stopButton} onPress={stopExercise}>
              <Icon name="stop-outline" size={24} color="#fff" />
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default ExerciseDetails;
